# Audit Trail

> Running log of all significant events, decisions, and state changes across the project lifecycle.

## Log Format

```
YYYY-MM-DD HH:MM | TYPE | AGENT | TASK-ID | Description
```

## Types
- **DECISION** — Architectural or governance decision
- **STATE_CHANGE** — Task state transition (TODO → CODING → etc.)
- **ESCALATION** — Task escalated to Decision Maker
- **FAILURE** — Task failure with reason
- **COMPLETION** — Task completed successfully
- **MERGE** — Code merged to main branch

---

## Log

| Timestamp | Type | Agent | Task | Description |
|---|---|---|---|---|
| — | — | — | — | _No entries yet_ |

---

## Maintenance

- **Appended by**: Manager (after each task cycle)
- **Reviewed by**: Human (during sprint review)
- **Archive**: Old entries moved to archive after project milestone