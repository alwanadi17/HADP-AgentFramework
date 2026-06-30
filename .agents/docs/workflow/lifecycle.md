# Workflow Lifecycle — Hierarchical Agentic Development Pipeline (HADP)

## High-Level Flow

```
                    ┌─── [AUDITOR] (on-demand) ───┐
                    │         ↑    ↑       ↑       │
                    │         │    │       │       │
                    ▼         │    │       │       │
┌─────────────────────────────────────────────────────────────────────┐
│                        HUMAN TRIGGER                                │
│  Feature Request / Bug Report / Task Assignment                     │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  [0]  ANALYST (Optional)                                           │
│       Research, codebase mapping, structured brief                  │
│       Output → docs/workbook/analyst/                              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  [1]  DECISION MAKER                                               │
│       Governance, ADRs, architecture decisions                     │
│       Input: Analyst Brief / Human Request                         │
│       Output → docs/workbook/decision-maker/                       │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│  [2]  MANAGER                                                      │
│       Task decomposition, handoff packets, validation              │
│       Input: Governance docs + feature request                     │
│       Output → docs/workbook/manager/ + .agents/handoffs/          │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┴───────────────┐
                    ▼                               ▼
┌───────────────────────────────┐   ┌───────────────────────────────┐
│  [3a] WORKER CODER            │   │  [3b] WORKER TESTER          │
│       Implementation only      │   │       Verification only       │
│       Input: Manager handoff   │   │       Input: Coder packet     │
│       Output → code + packet   │   │       Output → test report    │
└───────────────┬───────────────┘   └───────────────┬───────────────┘
                │                                   │
                └───────────────┬───────────────────┘
                                │ (via handoff packets)
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  MANAGER (Macro Validation)                                       │
│  Reviews Tester report + Coder output                             │
│  Verdict: PASS / FAIL (loop back) / ESCALATE (to Decision Maker)  │
└─────────────────────────────────────────────────────────────────────┘
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────────┐
│  HUMAN REVIEW & MERGE                                              │
│  Final approval, merge to main, archive handoffs                  │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Principles

| Principle | Description |
|---|---|
| **Separation of Concerns** | Each tier does ONE thing. No overlap. |
| **Gate System** | Every transition requires a handoff packet. No skipping. |
| **Fail Fast** | If Coder fails build → report immediately. If Tester finds issues → loop back. |
| **Escalation Path** | Coder (3x fail) → Manager → Decision Maker. No dead ends. |
| **Token Efficiency** | Analyst reads once so Decision Maker doesn't have to. |

## Role Boundaries

| Tier | Role | Does | Does NOT |
|---|---|---|---|
| 0 | Analyst | Read, map, summarize | Decide, code, plan |
| 0b | Auditor | Audit compliance, review decisions | Code, decide, enforce |
| 1 | Decision Maker | Govern, architect, decide | Code, decompose tasks |
| 2 | Manager | Plan, delegate, validate | Code, modify governance |
| 3a | Worker Coder | Implement code | Test own work, govern |
| 3b | Worker Tester | Verify, test, report | Code, decide |

## Reference
- `.agents/docs/workflow/states.md` — task lifecycle states
- `.agents/docs/workflow/triggers.md` — what triggers each transition
- `.agents/docs/handoff-protocol.md` — handoff packet format