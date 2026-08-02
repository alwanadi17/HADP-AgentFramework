# 🧠 Playbook: Calling the Decision Maker (Tier 1)

> **Claude Code**: also available as `/hadp-decision-maker` (`.claude/skills/hadp-decision-maker/SKILL.md`) — auto-loads this playbook, the role definition, and live repo context. This document remains canonical; the skill just wraps it.

## When to Call

Call the Decision Maker when you need **architectural decisions, governance updates, or escalation resolution**. The Decision Maker is the highest authority — use sparingly for high-stakes decisions only.

### Typical Triggers
- A new feature requires architectural decisions (new routes, new dependencies, new patterns)
- An escalation from Manager (Worker failed 3x, ambiguous requirements)
- Governance documents (CONSTITUTION, RED_LINES, ARCHITECTURE) need updating
- A new ADR (Architecture Decision Record) needs to be written
- Approval needed for changes that affect system-wide behavior
- Disagreement between roles that cannot be resolved at lower tiers

### When NOT to Call
- The task is straightforward and within existing governance — Manager handles it
- It's a simple code change with no architectural impact — Worker Coder handles it
- You need a compliance check, not a decision — call the Auditor instead

---

## Required Context to Provide

```
1. Analyst Brief (from `.agents/docs/workbook/analyst/`) — PRIMARY source of codebase context
2. The specific decision to be made / escalation to resolve
3. CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md (current)
4. Any relevant ADRs from `.agents/docs/decisions/`
5. The escalation handoff packet (if escalation)
6. Relevant area-specific AGENTS.md
```

---

## Invocation Prompt Template

```markdown
## Decision Maker Activation

### Context Type
- [ ] **Architectural Decision** — new feature, new pattern, new dependency
- [ ] **Escalation** — Manager escalation (Worker failed, ambiguous requirements)
- [ ] **Governance Update** — CONSTITUTION, RED_LINES, ARCHITECTURE changes
- [ ] **ADR Review** — new ADR needs to be written

### The Decision / Escalation
[Clear statement of what needs to be decided]

### Background
- **Task ID**: [TASK-XXX if applicable]
- **Analyst Brief**: [path to latest brief — provide this as the primary context]
- **Relevant ADRs**: [path list]

### Options Considered (if any)
1. [Option A] — pros/cons
2. [Option B] — pros/cons

### Constraints
- [RED_LINE constraints that apply]
- [Architectural constraints]

### Context Provided
- [ ] CONSTITUTION.md (current)
- [ ] RED_LINES.md (current)
- [ ] ARCHITECTURE.md (current)
- [ ] Analyst Brief (latest)
- [ ] Relevant ADRs

### Expected Output
1. Decision / response (verbal)
2. If governance change: updated CONSTITUTION, RED_LINES, or ARCHITECTURE
3. If architectural decision: ADR → `.agents/docs/decisions/ADR-XXX.md`
4. If escalation: resolution handoff packet → `.agents/handoffs/`

### Handoff Target
→ **Manager** (Tier 2) — with decision directive
```

---

## What the Decision Maker Will Produce

| Output | Format | Purpose |
|---|---|---|
| Decision / Response | Chat / Verbal | Immediate direction |
| ADR | Structured markdown | Permanent record of architectural decision |
| Governance Update | Updated CONSTITUTION / RED_LINES / ARCHITECTURE | Source of truth |
| Escalation Response | Handoff packet | Resolution for Manager |

## After the Decision Maker Finishes

1. Review the ADR or governance update
2. Optionally have the **Auditor** review the decision before proceeding
3. Forward the decision directive to **Manager** with updated context
4. Update the Task Index if this closes a task

---

## Example

```
## Decision Maker Activation

### Context Type
- [x] Architectural Decision

### The Decision
Should we use React Query or Redux for server state management in the new dashboard?

### Background
- **Task ID**: TASK-005
- **Analyst Brief**: .agents/docs/workbook/analyst/20260630_TASK-005_brief.md
- **Relevant ADRs**: ADR-001 (current state management pattern)

### Options Considered
1. React Query — lighter, auto-caching, less boilerplate
2. Redux Toolkit — more mature, team already familiar, middleware ecosystem

### Constraints
- RED_LINE: No new dependencies without documented rationale
- ARCHITECTURE.md: Current pattern is Redux

### Expected Output
1. Decision: which library to use
2. ADR → `.agents/docs/decisions/ADR-004.md`
3. If Redux: no change needed. If React Query: update ARCHITECTURE.md

### Handoff Target
→ Manager