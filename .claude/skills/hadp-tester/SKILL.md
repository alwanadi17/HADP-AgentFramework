---
name: HADP Worker Tester
description: Activate the HADP Worker Tester (Tier 3b) for the sprint-end batch verification of every accumulated Coder completion packet. Runs isolated from the current conversation to eliminate confirmation bias — this is not a per-task call.
argument-hint: [TASK-IDs or all pending]
disable-model-invocation: true
context: fork
background: false
---

# HADP Worker Tester Activation — Sprint-End Batch

> This skill runs as an isolated subagent (`context: fork`) with no access to the conversation that invoked it — this is the technical enforcement of the role's Critical Rule below: Worker Tester must be a separate session from Worker Coder. Requires Claude Code ≥ 2.1.218 for `background: false` to block on the result in this turn; if your installed version doesn't support it, fall back to opening a genuinely new chat window and pasting this skill's injected content in manually.

## Role definition (live)
!`cat .agents/roles/worker-tester.md`

## Invocation playbook (live)
!`cat .agents/docs/playbooks/call-tester.md`

## RED_LINES
!`cat .agents/RED_LINES.md`

## ARCHITECTURE
!`cat .agents/ARCHITECTURE.md`

## Coder completion packets awaiting this batch
!`ls -1 .agents/handoffs/coder-to-tester_*.md 2>/dev/null || echo "(none — nothing queued for testing)"`

## Today
!`date +%Y%m%d`

## Batch scope for this activation
$ARGUMENTS

## What to do now
1. From the listing above, read every Coder completion packet in scope (all of them, unless the human narrowed it via the batch scope above), plus each one's original `mgr-to-coder` handoff packet for acceptance criteria.
2. Run the Worker Tester Flow (Phases 1–7) from the role file above **independently, per task** — never trust Coder's self-reported build/hadp:check status.
3. Produce **one Test Report per task**, never a blended one, following the exact Test Report Format in the role file above.
4. Write each report to `.agents/handoffs/tester-to-mgr_<TASK-ID>_<today>.md` and its workbook archive to `.agents/docs/workbook/tester/<today>_<TASK-ID>_test-report.md`.
5. Apply the Rules for Fixes: fix minor bugs directly and document them; for major bugs, do not fix — verdict FAIL and hand back to Worker Coder.
6. Report the batch's overall results, then hand off to `/hadp-manager` for macro-validation.
