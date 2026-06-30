# Task Index Registry — HADP Framework

> Master registry for all tasks in the project. Every task must be registered here and kept up to date through its lifecycle.

## Active Tasks

| Task | Title | Status | Owner | Handoffs | Workbook | ADR | Final Verdict |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

## Completed Tasks

| Task | Title | Status | Sprint | Handoffs | Workbook | ADR | Final Verdict |
|---|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

## Blocked / Escalated Tasks

| Task | Title | Status | Blocker | Linked Handoff | ADR | Resolution |
|---|---|---|---|---|---|---|
| — | — | — | — | — | — | — | — |

## Column Descriptions

| Column | Meaning |
|---|---|
| **Task** | TASK-XXX identifier |
| **Title** | Short description |
| **Status** | TODO / CODING / TESTING / IN_REVIEW / DONE / BLOCKED |
| **Owner** | Current role responsible (Coder / Tester / Manager / DM) |
| **Sprint** | Sprint identifier (only for completed tasks) |
| **Handoffs** | Links to all handoff packets in `.agents/handoffs/` |
| **Workbook** | Links to workbook entries in `.agents/docs/workbook/` |
| **ADR** | Links to related ADRs in `.agents/docs/decisions/` |
| **Final Verdict** | PASS / FAIL / ESCALATE (only for completed tasks) |
| **Blocker** | Description of what's blocking (blocked tasks only) |
| **Linked Handoff** | Escalation packet reference (escalated tasks only) |
| **Resolution** | How the escalation was resolved (escalated tasks only) |

## Maintenance

| Action | Who | When |
|---|---|---|
| Register new task | Manager | After creating task in PLAN.md |
| Update status | Manager | After every state change |
| Add handoff links | Manager | After each handoff is created |
| Add workbook links | Manager / Coder / Tester | After workbook entry is created |
| Add ADR links | Decision Maker | After ADR is created |
| Mark final verdict | Manager | After macro validation |
| Archive to completed | Manager | After Human merges |

## References

- Defined in: `.agents/docs/reports/task-index.md`
- Used by: Manager, Auditor, Human
- Related: `PLAN.md`, `.agents/docs/framework/artifact-contracts.md`