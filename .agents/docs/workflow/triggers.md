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
| T4 | Worker Coder | Worker Tester | Implementation complete | Build passes (✅) | `.agents/handoffs/coder-to-tester_TASK-XXX_YYYYMMDD.md` |
| T5 | Worker Tester | Manager | Test report ready | Verdict: PASS / FAIL / CONCERNS | `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md` |
| T6 | Manager | Human | Final validation | Verdict: PASS | Chat message + summary |
| T7 | Manager | Worker Coder | Retry | Verdict: FAIL (retry < 3) | Updated handoff packet |
| T8 | Manager | Decision Maker | Escalation | Verdict: ESCALATE or 3x fail | `.agents/handoffs/mgr-to-dm_TASK-XXX_YYYYMMDD.md` |
| T9 | Worker Tester | Worker Coder | Direct fail | Critical issue found | `.agents/handoffs/tester-to-coder_TASK-XXX_YYYYMMDD.md` |

---

## Detailed Trigger Definitions

### T0b: Human → Auditor
**When**: Human needs an independent review of compliance, decisions, or process
**Input**: "Auditor, review this ADR" or "Auditor, check this handoff packet"
**Output**: Audit Report → `.agents/docs/workbook/auditor/YYYYMMDD_TASK-XXX_audit.md`
**Note**: Optional step. Auditor is advisory — does not block or approve.
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
**When**: Code implementation is complete
**Condition**: Build must pass (✅) before handoff
**Output**: Completion packet with:
- Changes made (file paths + line numbers)
- Build result
- Implementation notes
- RED_LINE self-check

### T5: Worker Tester → Manager
**When**: Testing is complete
**Output**: Test report with:
- Acceptance criteria verification
- RED_LINE audit
- Edge cases checked
- Verdict: PASS / FAIL / CONCERNS

### T6: Manager → Human
**When**: Macro validation passes
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
3. **Build gate**: Coder → Tester requires build pass
4. **Retry limit**: Max 3 retries per Coder per task
5. **Escalation final**: Once escalated, Decision Maker's decision is binding

## Reference
- `.agents/docs/workflow/lifecycle.md` — high-level flow
- `.agents/docs/workflow/states.md` — task lifecycle states