#!/usr/bin/env node
/**
 * hadp-check.js — Automated HADP compliance check.
 *
 * Deterministic checks only (no LLM required to run this). See
 * .agents/docs/framework/validation-rules.md for the full rule spec, and
 * .agents/docs/framework/artifact-contracts.md for the contracts this
 * script implements against.
 *
 * Usage: node scripts/hadp-check.js
 * Exit code: 0 if no BLOCKER/HIGH findings, 1 otherwise (see severity-system.md).
 */

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const HANDOFFS_DIR = path.join(ROOT, '.agents', 'handoffs');
const PLAN_PATH = path.join(ROOT, 'PLAN.md');
const TASK_INDEX_PATH = path.join(ROOT, '.agents', 'docs', 'reports', 'task-index.md');

const SEVERITY = {
  BLOCKER: { emoji: '🚫', label: 'BLOCKER', fails: true },
  HIGH: { emoji: '🔴', label: 'HIGH', fails: true },
  MEDIUM: { emoji: '🟡', label: 'MEDIUM', fails: false },
  LOW: { emoji: '🔵', label: 'LOW', fails: false },
  INFO: { emoji: '⚪', label: 'INFO', fails: false },
};

const HANDOFF_NAME_RE = /^([a-z]+-to-[a-z]+)_(TASK-\d+)_(\d{8})\.md$/;

// Required fields per artifact type, mapped from .agents/docs/framework/artifact-contracts.md.
// Field presence is checked via alias regexes since artifacts are free-form markdown, not YAML.
const CONTRACTS = {
  'mgr-to-coder': {
    type: 'manager_handoff',
    requiredFields: ['task_id', 'title', 'assigned_to', 'status', 'description', 'acceptance_criteria', 'files_to_modify'],
  },
  'coder-to-tester': {
    type: 'coder_completion',
    requiredFields: ['task_id', 'status', 'changes_made', 'build_result', 'implementation_notes', 'red_line_self_check'],
  },
  'tester-to-mgr': {
    type: 'tester_report',
    requiredFields: ['task_id', 'verdict', 'build_verification', 'acceptance_criteria_verification', 'red_line_audit'],
  },
  'tester-to-coder': {
    type: 'tester_direct_fail',
    requiredFields: ['task_id'],
  },
  'mgr-to-dm': {
    type: 'escalation',
    requiredFields: ['task_id'],
  },
  'dm-to-mgr': {
    type: 'decision_record',
    requiredFields: ['adr_number', 'title', 'status', 'date', 'context', 'decision', 'rationale'],
  },
  'analyst-to-dm': {
    type: 'analyst_brief',
    requiredFields: ['task_id', 'date', 'scope', 'key_findings', 'recommendations'],
  },
  'auditor-to-dm': {
    type: 'audit_report',
    requiredFields: ['request', 'date', 'scope', 'summary', 'findings'],
  },
  'auditor-to-mgr': {
    type: 'audit_report',
    requiredFields: ['request', 'date', 'scope', 'summary', 'findings'],
  },
};

const FIELD_ALIASES = {
  task_id: [/task[-_ ]?id/i, /TASK-\d+/],
  title: [/title/i],
  assigned_to: [/assigned[- ]?to/i],
  status: [/status/i],
  description: [/description/i],
  acceptance_criteria: [/acceptance[- ]?criteria/i],
  files_to_modify: [/files?\s*(to\s*modify|for\s*tester)/i],
  changes_made: [/changes\s*made/i],
  build_result: [/build\s*result/i],
  implementation_notes: [/implementation\s*notes/i],
  red_line_self_check: [/red[_ -]?line\s*self[- ]?check/i],
  verdict: [/verdict/i],
  build_verification: [/build\s*(verification|result)/i],
  acceptance_criteria_verification: [/acceptance\s*criteria/i],
  red_line_audit: [/red[_ -]?line\s*audit/i],
  adr_number: [/ADR-\d+/i],
  context: [/^##?\s*context/im],
  decision: [/^##?\s*decision\b/im],
  rationale: [/rationale/i],
  date: [/\bdate\b/i, /\d{4}-\d{2}-\d{2}/],
  scope: [/scope/i],
  key_findings: [/key\s*findings/i],
  recommendations: [/recommendations/i],
  request: [/request/i],
  summary: [/summary/i],
  findings: [/findings/i],
};

const LEFTOVER_PLACEHOLDER_PATTERNS = [
  { re: /TASK-XXX/g, label: 'Literal "TASK-XXX" placeholder left unfilled' },
  { re: /ADR-XXX/g, label: 'Literal "ADR-XXX" placeholder left unfilled' },
  { re: /YYYY-MM-DD/g, label: 'Literal "YYYY-MM-DD" date placeholder left unfilled' },
  // Note: bare "TODO" is intentionally NOT flagged — it's a legitimate value
  // for the manager_handoff `status` field (see artifact-contracts.md valid_statuses).
  // `[TODO]`-style placeholders are still caught by the generic bracket rule below.
  // Generic [Bracketed Placeholder] text — excludes markdown links `[..](url)` and checkboxes `[ ]`/`[x]`.
  { re: /\[[A-Z][^\]\n]{0,80}\](?!\()/g, label: 'Leftover [placeholder] text' },
];

const findings = [];

function addFinding(severity, summary, file, detail) {
  findings.push({ severity, summary, file, detail });
}

function walkMarkdownFiles(dir) {
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name.toLowerCase() === 'archive') continue; // completed packets, not gated
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkMarkdownFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name.toLowerCase() !== 'readme.md') {
      out.push(full);
    }
  }
  return out;
}

function checkHandoffPacket(filePath) {
  const rel = path.relative(ROOT, filePath);
  const name = path.basename(filePath);
  const content = fs.readFileSync(filePath, 'utf8');

  const match = name.match(HANDOFF_NAME_RE);
  if (!match) {
    addFinding('BLOCKER', 'Handoff filename violates naming convention', rel,
      'Expected {direction}_{task-id}_{YYYYMMDD}.md, e.g. mgr-to-coder_TASK-001_20260718.md');
    // Still run generic content checks even if the name is malformed.
    checkPlaceholders(content, rel);
    checkUncheckedRedLineBoxes(content, rel);
    return;
  }

  const [, prefix] = match;
  const contract = CONTRACTS[prefix];

  if (contract) {
    for (const field of contract.requiredFields) {
      const aliases = FIELD_ALIASES[field] || [];
      const present = aliases.some((re) => re.test(content));
      if (!present) {
        addFinding('BLOCKER', `Missing required field "${field}" for ${contract.type}`, rel,
          `Contract: .agents/docs/framework/artifact-contracts.md → ${contract.type}`);
      }
    }
  } else {
    addFinding('INFO', `Unknown handoff prefix "${prefix}" — no contract to validate against`, rel, '');
  }

  checkPlaceholders(content, rel);
  checkUncheckedRedLineBoxes(content, rel);
}

function checkPlaceholders(content, rel) {
  for (const { re, label } of LEFTOVER_PLACEHOLDER_PATTERNS) {
    const matches = content.match(re);
    if (matches && matches.length > 0) {
      addFinding('HIGH', label, rel, `Found ${matches.length}x: ${[...new Set(matches)].slice(0, 5).join(', ')}`);
    }
  }
}

function checkUncheckedRedLineBoxes(content, rel) {
  // Only count unchecked boxes within a RED_LINE-related section, to avoid
  // false positives on ordinary in-progress acceptance-criteria checklists.
  const sectionMatch = content.match(/#{2,4}\s*RED_LINE[^\n]*\n([\s\S]*?)(?=\n#{2,4}\s|\n---|$)/i);
  if (!sectionMatch) return;
  const section = sectionMatch[1];
  const unchecked = section.match(/^-\s*\[\s\]/gm);
  if (unchecked && unchecked.length > 0) {
    addFinding('BLOCKER', 'RED_LINE self-check has unchecked boxes', rel,
      `${unchecked.length} unchecked item(s) — contract requires red_line_self_check to be fully completed`);
  }
}

function checkTaskIndexConsistency() {
  if (!fs.existsSync(PLAN_PATH) || !fs.existsSync(TASK_INDEX_PATH)) return;
  const planContent = fs.readFileSync(PLAN_PATH, 'utf8');
  const indexContent = fs.readFileSync(TASK_INDEX_PATH, 'utf8');

  const planTasks = new Set([...planContent.matchAll(/^###\s+(TASK-\d+):/gm)].map((m) => m[1]));
  const indexTasks = new Set([...indexContent.matchAll(/TASK-\d+/g)].map((m) => m[0]));

  for (const task of planTasks) {
    if (!indexTasks.has(task)) {
      addFinding('MEDIUM', `${task} exists in PLAN.md but is not registered in task-index.md`,
        path.relative(ROOT, TASK_INDEX_PATH), 'Manager must register every new task in the Task Index (see AGENTS.md).');
    }
  }
}

function printReport() {
  if (findings.length === 0) {
    console.log('hadp:check — no findings. All clear.\n');
    return;
  }

  const order = ['BLOCKER', 'HIGH', 'MEDIUM', 'LOW', 'INFO'];
  findings.sort((a, b) => order.indexOf(a.severity) - order.indexOf(b.severity));

  console.log(`hadp:check — ${findings.length} finding(s)\n`);
  for (const f of findings) {
    const sev = SEVERITY[f.severity];
    console.log(`${sev.emoji} ${sev.label}: ${f.summary}`);
    console.log(`  File: ${f.file}`);
    if (f.detail) console.log(`  Detail: ${f.detail}`);
    console.log('');
  }

  const counts = order.reduce((acc, s) => {
    acc[s] = findings.filter((f) => f.severity === s).length;
    return acc;
  }, {});
  console.log('Summary: ' + order.map((s) => `${SEVERITY[s].emoji} ${counts[s]}`).join('  '));
}

function main() {
  const files = walkMarkdownFiles(HANDOFFS_DIR);
  for (const file of files) {
    checkHandoffPacket(file);
  }
  checkTaskIndexConsistency();
  printReport();

  const blocking = findings.some((f) => SEVERITY[f.severity].fails);
  if (blocking) {
    console.log('\nResult: FAIL (BLOCKER/HIGH findings present)');
    process.exit(1);
  }
  console.log('\nResult: PASS');
  process.exit(0);
}

main();
