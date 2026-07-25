# 🧪 Playbook: Calling the Worker Tester (Tier 3b)

## When to Call

Call the Worker Tester at **sprint end**, once, as a batch — not after each individual task. The Worker Tester must be a **separate session/conversation** from the Worker Coder to eliminate confirmation bias. See `.agents/docs/workflow/triggers.md` → T4.

### Typical Triggers
- **Sprint end declared** by Human/Manager — the primary trigger. A batch of Coder completion packets (all with PASS build + passing `hadp:check` self-check) has accumulated in `.agents/handoffs/` since the last batch and is ready for independent verification
- Regression testing is needed after bug fixes, as part of the same batch

### When NOT to Call
- Mid-sprint, right after a single task finishes coding — that task just queues (CODING state) until sprint end, it does not trigger an individual Tester call
- The code hasn't been built yet — Coder must build first
- You need implementation, not testing — that's Worker Coder's job
- You're the same session as the Worker Coder — testing must be independent
- The task is still in decomposition phase — go back to Manager first

---

## Required Context to Provide

```
1. Worker Coder's completion handoff packet(s) — one per task in the sprint batch
2. The original Manager's task handoff packet(s) (with acceptance criteria) — one per task
3. RED_LINES.md
4. Relevant area-specific AGENTS.md
5. ARCHITECTURE.md (for data flow verification)
6. The actual changed files in the repo (post-Coder changes, across all tasks in the batch)
```

---

## Invocation Prompt Template

```markdown
## Worker Tester Activation — Sprint-End Batch

### Sprint
- **Sprint**: [Sprint number or date range]
- **Declared complete by**: [Human / Manager]
- **Session**: [MUST be different from Coder's session]

### Tasks in This Batch
| Task ID | Build (per Coder) | hadp:check self-check | Files Changed |
|---|---|---|---|
| TASK-XXX | PASS | PASS | `path/to/file.ext` — [MODIFIED\|NEW] |
| TASK-YYY | PASS | PASS | `path/to/file2.ext` — [MODIFIED\|NEW] |

### Context Provided (per task)
- [ ] Coder's completion handoff packet
- [ ] Manager's original task handoff packet
- [ ] RED_LINES.md (current)
- [ ] Relevant area AGENTS.md
- [ ] ARCHITECTURE.md (current)
- [ ] Actual file contents in repo

### Expected Output (per task in the batch)
1. Independent build and lint verification
2. Acceptance criteria verification (each criterion, with evidence)
3. Code quality review findings (with severity grading)
4. RED_LINE audit (each constraint, CLEAR or VIOLATION)
5. Adversarial test results
6. Verdict: ✅ PASS | ❌ FAIL | ⚠️ CONCERNS
7. Test handoff packet → `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md` (one per task)
8. Test archive → `.agents/docs/workbook/tester/YYYYMMDD_TASK-XXX_test-report.md` (one per task)

### Handoff Target
→ **Manager** (Tier 2) — for macro-validation, per task
→ **Worker Coder** (Tier 3a) — if FAIL, with specific fixes needed
```

---

## What the Worker Tester Will Produce

| Output | Format | Purpose |
|---|---|---|
| Build + Lint Result | PASS / FAIL | Independent verification |
| Acceptance Criteria Check | Table with evidence | Each criterion PASS/FAIL |
| Code Quality Findings | Severity-graded list | Bugs, issues, concerns |
| RED_LINE Audit | Constraint-by-constraint check | Compliance verification |
| Adversarial Test Results | Scenario-based | Edge case testing |
| Verdict | PASS / FAIL / CONCERNS | Final recommendation |
| Test Handoff Packet | Structured markdown | Handover to Manager |
| Test Archive | Structured markdown | Permanent record in workbook |

## Worker Tester Flow

```
Phase 1: Build Verification → Run build + lint independently
Phase 2: Acceptance Criteria → Check each criterion with evidence
Phase 3: Code Quality Review → Logic errors, edge cases, error handling
Phase 4: RED_LINE Audit → Each constraint, CLEAR or VIOLATION
Phase 5: Adversarial Testing → Break scenarios, edge cases
Phase 6: Verdict → PASS | FAIL | CONCERNS
Phase 7: Report → Create test handoff packet + archive
```

### Rules for Fixes
- **Minor bugs** (typos, null checks, variable names, off-by-one): Fix directly and document in "Fixes Applied" section
- **Major bugs** (logic errors, wrong architecture, missing features, RED_LINE violations): Do NOT fix. Report and send back to Coder

---

## Example

```
## Worker Tester Activation — Sprint-End Batch

### Sprint
- **Sprint**: 2026-06-30 sprint
- **Declared complete by**: Manager
- **Session**: [New session, separate from Coder]

### Tasks in This Batch
| Task ID | Build | hadp:check | Files Changed |
|---|---|---|---|
| TASK-002 | PASS | PASS | `src/api/auth/login.ts` — [NEW], `src/api/routes.ts` — [MODIFIED] |

### Context Provided (TASK-002)
- [x] Coder's completion packet (coder-to-tester_TASK-002_20260630.md)
- [x] Manager's handoff packet (mgr-to-coder_TASK-002_20260630.md)
- [x] RED_LINES.md
- [x] src/api/AGENTS.md
- [x] ARCHITECTURE.md

### Expected Output (TASK-002)
1. Build: PASS
2. Acceptance criteria: all verified
3. Code quality: no issues found
4. RED_LINE audit: all CLEAR
5. Verdict: PASS
6. Test handoff → tester-to-mgr_TASK-002_20260630.md

### Handoff Target
→ Manager (Tier 2)