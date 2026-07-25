# Task Lifecycle States

## State Diagram

```
TODO ──→ CODING ──→ TESTING ──→ IN_REVIEW ──→ DONE
  │         │          │            │
  └─── BLOCKED ←─── FAIL ──── CONCERNS ──┐
                    │                     │
                    └──→ BLOCKED ───→ ESCALATED
```

## State Definitions

| State | Description | Owner | Next States |
|---|---|---|---|
| **TODO** | Task created, not yet started | Manager | CODING, BLOCKED |
| **CODING** | Worker Coder is implementing — a task can sit here (build + `hadp:check` self-check passed) awaiting the sprint-end test batch while Coder moves on to the next task | Worker Coder | TESTING, FAIL (build or self-check fail) |
| **TESTING** | Worker Tester is verifying — runs once per sprint as a batch, not per task | Worker Tester | IN_REVIEW, FAIL, CONCERNS |
| **IN_REVIEW** | Manager is doing macro validation | Manager | DONE, FAIL, ESCALATED |
| **DONE** | Task completed, awaiting human merge | Human | — (terminal) |
| **FAIL** | Task failed at some gate | Manager | CODING (retry), BLOCKED (max retries) |
| **CONCERNS** | Tester found issues but not critical | Manager | IN_REVIEW (accepted), FAIL (rejected) |
| **BLOCKED** | Task cannot proceed due to dependency | Manager | TODO (unblocked), ESCALATED |
| **ESCALATED** | Sent to Decision Maker for resolution | Decision Maker | TODO (resolved), DONE (archived) |

## State Transition Rules

### TODO → CODING
- Trigger: Manager creates handoff packet
- Condition: All dependencies are DONE
- Artifact: `.agents/handoffs/mgr-to-coder_TASK-XXX_YYYYMMDD.md`

### CODING → TESTING
- Trigger: **Sprint end declared** (Human/Manager) — batch, not per-task. Multiple tasks may sit in CODING (build passed, `hadp:check` self-check passed) simultaneously, all awaiting the same batch.
- Condition: Build passes (✅) AND `npm run hadp:check` self-check passes (✅) per task, sprint declared complete
- Artifact: `.agents/handoffs/coder-to-tester_TASK-XXX_YYYYMMDD.md` (one per task in the batch)
- **Exception**: if a downstream task genuinely depends on an upstream task being *tested and passing* (not just implemented), Manager must flag this explicitly in the handoff — that dependency isn't satisfied until the upstream task clears TESTING.

### CODING → FAIL
- Trigger: Build fails (❌) OR `hadp:check` self-check fails (🚫 BLOCKER/🔴 HIGH)
- Condition: Coder reports build failure or non-compliant completion packet
- Max retries: 3

### TESTING → IN_REVIEW
- Trigger: Tester completes verification
- Condition: Verdict is PASS or CONCERNS
- Artifact: `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md`

### TESTING → FAIL
- Trigger: Tester verdict is FAIL
- Condition: Acceptance criteria not met or RED_LINE violation

### IN_REVIEW → DONE
- Trigger: Manager approves
- Condition: All checks pass, **including a mandatory `npm run hadp:check` run (T5b, see `.agents/docs/workflow/triggers.md`)** — 🚫 BLOCKER/🔴 HIGH findings block this transition

### IN_REVIEW → FAIL
- Trigger: Manager rejects
- Condition: Macro validation fails

### IN_REVIEW → ESCALATED
- Trigger: Manager escalates
- Condition: Architectural change needed or ambiguity

### Any → BLOCKED
- Trigger: Dependency unmet or external blocker
- Condition: Cannot proceed

### BLOCKED → ESCALATED
- Trigger: Cannot resolve within Manager scope
- Condition: Requires Decision Maker intervention

## Retry Policy

| Role | Max Retries | After Max |
|---|---|---|
| Worker Coder | 3 consecutive failures | Escalate to Manager → Decision Maker |
| Worker Tester | 2 consecutive failures | Escalate to Manager |
| Manager | 1 escalation per task | Decision Maker resolves |

## Reference
- `.agents/docs/workflow/lifecycle.md` — high-level flow
- `.agents/docs/workflow/triggers.md` — detailed trigger definitions