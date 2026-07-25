# Workflow Triggers

## Overview

Every transition between roles is triggered by a specific event. This document defines all triggers, their conditions, and required artifacts.

---

## Trigger Table

| # | From | To | Trigger | Condition | Artifact |
|---|---|---|---|---|---|
| T0 | Human | Analyst | Research request | Vague requirement needs analysis | Chat message |
| T0b | Human | Auditor | Audit request | Need compliance check or decision review | Chat message |
| T1 | Human | Decision Maker | Feature request / Escalation | Clear requirement or escalation packet | Chat message + handoff |
| T2 | Decision Maker | Manager | Governance update / Task directive | ADR written or governance changed | `.agents/docs/decisions/ADR-XXX.md` |
| T3 | Manager | Worker Coder | Task assignment | Task decomposed, criteria defined | `.agents/handoffs/mgr-to-coder_TASK-XXX_YYYYMMDD.md` |
| T4 | Worker Coder | Worker Tester | **Sprint end** (batch, not per-task) | Build + `hadp:check` self-check pass per task, sprint declared complete | `.agents/handoffs/coder-to-tester_TASK-XXX_YYYYMMDD.md` (one per task, accumulated) |
| T5 | Worker Tester | Manager | Test report ready | Verdict: PASS / FAIL / CONCERNS | `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md` |
| T5b | Manager | Auditor (subagent) → Manager | Automated Compliance Check | **Mandatory**, every task, before PASS verdict | `npm run hadp:check` exit code + findings |
| T6 | Manager | Human | Final validation | Verdict: PASS (requires T5b passed) | Chat message + summary |
| T7 | Manager | Worker Coder | Retry | Verdict: FAIL (retry < 3) | Updated handoff packet |
| T8 | Manager | Decision Maker | Escalation | Verdict: ESCALATE or 3x fail | `.agents/handoffs/mgr-to-dm_TASK-XXX_YYYYMMDD.md` |
| T9 | Worker Tester | Worker Coder | Direct fail | Critical issue found | `.agents/handoffs/tester-to-coder_TASK-XXX_YYYYMMDD.md` |

---

## Detailed Trigger Definitions

### T0b: Human → Auditor
**When**: Human needs an independent review of compliance, decisions, or process
**Input**: "Auditor, review this ADR" or "Auditor, check this handoff packet"
**Output**: Audit Report → `.agents/docs/workbook/auditor/YYYYMMDD_TASK-XXX_audit.md`
**Note**: Optional step. This is a **Full Audit** — advisory, does not block or approve. Not to be confused with T5b (Automated Compliance Check), which is mandatory and does block.
**For decision audits**: Use the Decision Quality Rubric (`.agents/docs/framework/decision-quality-rubric.md`) to score across 6 dimensions (reversibility, blast radius, coupling, operational cost, security, simplicity). Include the scoring table in the audit report.

### T0: Human → Analyst
**When**: Human needs deep research before decision making
**Input**: "Research X" or "Map the codebase for Y"
**Output**: Analyst Brief → `.agents/docs/workbook/analyst/YYYYMMDD_TASK-XXX_brief.md`
**Note**: Optional step. Skip if requirement is already clear.

### T1: Human → Decision Maker
**When**: New feature, bug report, or escalation from Manager
**Input**: Feature description / Escalation packet
**Context Needed**:
- Analyst Brief (if available)
- Current CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md
- Relevant ADRs

### T2: Decision Maker → Manager
**When**: Decision Maker has made a decision or updated governance
**Input**: ADR / Governance change / Directive
**Output**: Updated governance docs + task directive
**Note**: Decision Maker does NOT write task plans — only high-level direction.

### T3: Manager → Worker Coder
**When**: Task is decomposed and ready for implementation
**Input**: Governance docs + feature directive
**Output**: Handoff packet with:
- Task ID and description
- Acceptance criteria (testable)
- Files to modify
- Max LOC estimate
- RED_LINES reference

### T4: Worker Coder → Worker Tester
**When**: **Sprint end** — Human/Manager declares the sprint complete. This is a **batch** trigger, not per-task: Worker Coder keeps implementing task after task through the sprint without waiting on Tester for each one, and Worker Tester processes the whole accumulated batch in a single session at the end.
**Condition (per task, before it joins the batch)**: Build must pass (✅) AND `npm run hadp:check` must pass (no 🚫 BLOCKER/🔴 HIGH findings) as a Coder self-check — see `.agents/roles/worker-coder.md`. Treat a failing self-check the same as a failing build: fix before moving on, don't queue a non-compliant packet.
**Output**: One completion packet per task, accumulated across the sprint:
- Changes made (file paths + line numbers)
- Build result
- `hadp:check` self-check result
- Implementation notes
- RED_LINE self-check
**Note**: Worker Tester still MUST be a separate session from Worker Coder (unchanged rule) — only the cadence changed, not the cross-validation requirement. This mirrors the `hadp:check` single-gate pattern (Milestone 5) for the *expensive* judgment-based verification step, while the *cheap* compliance check (the self-check above) runs per-task precisely because testing no longer does — see `.agents/docs/framework/validation-rules.md`.

### T5: Worker Tester → Manager
**When**: Testing is complete
**Output**: Test report with:
- Acceptance criteria verification
- RED_LINE audit
- Edge cases checked
- Verdict: PASS / FAIL / CONCERNS

### T5b: Manager → Auditor (subagent) → Manager
**When**: Every task, before the Manager can issue a PASS verdict — **mandatory, not optional**
**Input**: Instruction to run `npm run hadp:check`
**Model**: Sonnet-tier subagent is sufficient (deterministic script run, no judgment required) — see `.agents/roles/auditor.md` → "Two Modes of Operation"
**Output**: Exit code + findings (🚫 BLOCKER / 🔴 HIGH / 🟡 MEDIUM / 🔵 LOW / ⚪ INFO), reported back verbatim to Manager
**Blocking rule**: 🚫 BLOCKER or 🔴 HIGH findings block PASS — Manager must route back via T7 (retry) or T8 (escalate if recurring). 🟡 MEDIUM/🔵 LOW/⚪ INFO don't block.
**Note**: This is distinct from T0b — T0b is an optional, human-triggered, advisory Full Audit; T5b is a mandatory, Manager-triggered, blocking Automated Compliance Check. See `.agents/docs/framework/validation-rules.md` for the rule spec.

### T6: Manager → Human
**When**: Macro validation passes AND T5b (Automated Compliance Check) passed
**Output**: Summary report with:
- What was done
- Test results
- Any concerns
- Request for merge approval

### T7: Manager → Worker Coder (Retry)
**When**: Tester found issues (FAIL) and retry count < 3
**Output**: Updated handoff packet with:
- What failed
- What to fix
- Updated acceptance criteria (if needed)

### T8: Manager → Decision Maker (Escalation)
**When**: Cannot resolve within Manager scope
**Reasons**:
- Coder failed 3x consecutively
- Architectural change needed
- Ambiguous requirements
- RED_LINE needs modification
**Output**: Escalation packet with full context

### T9: Worker Tester → Worker Coder (Direct Fail)
**When**: Critical issue found that Coder can fix immediately
**Note**: Only for simple, well-defined fixes. Complex issues go through Manager (T7).

---

## Trigger Validation Rules

1. **No skipping tiers**: Every transition must go through the proper chain
2. **Artifact required**: No transition without the corresponding handoff packet
3. **Build gate**: Coder → Tester requires build pass (per task, immediate — unaffected by batching)
4. **Per-task compliance gate**: Every Coder completion packet requires its own passing `npm run hadp:check` self-check before it joins the sprint's T4 batch queue
5. **Batch testing gate**: T4 fires once per sprint (Human/Manager-declared), not per task — Worker Tester still MUST run in a separate session from Worker Coder
6. **Final compliance gate**: Manager → Human (T6/PASS) requires `npm run hadp:check` to pass again (T5b) — this is a cumulative re-check (catches cross-task issues like task-index consistency), not a duplicate of the per-task self-check
7. **Retry limit**: Max 3 retries per Coder per task
8. **Escalation final**: Once escalated, Decision Maker's decision is binding

## Reference
- `.agents/docs/workflow/lifecycle.md` — high-level flow
- `.agents/docs/workflow/states.md` — task lifecycle states