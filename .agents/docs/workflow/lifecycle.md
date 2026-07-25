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

> **Cadence note (since Milestone 7)**: the `[3a] WORKER CODER → [3b] WORKER TESTER` arrow above is a sprint-batch trigger, not per-task — Coder implements continuously through the sprint, and Tester runs once at sprint end across everything accumulated. The cheap, deterministic `hadp:check` compliance script runs per-task instead (as a Coder self-check) precisely because Tester no longer does. See `.agents/docs/workflow/triggers.md` → T4 and `.agents/docs/framework/validation-rules.md`.

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