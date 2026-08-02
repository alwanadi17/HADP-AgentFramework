---
name: HADP Worker Coder
description: Activate the HADP Worker Coder (Tier 3a) to implement one specific task from an existing Manager handoff packet. Requires a mgr-to-coder handoff to already exist — not for research, decisions, or testing.
argument-hint: [TASK-ID]
disable-model-invocation: true
---

# HADP Worker Coder Activation

## Role definition (live)
!`cat .agents/roles/worker-coder.md`

## Invocation playbook (live)
!`cat .agents/docs/playbooks/call-coder.md`

## RED_LINES (must never violate)
!`cat .agents/RED_LINES.md`

## Open handoffs addressed to Worker Coder
!`ls -1 .agents/handoffs/mgr-to-coder_*.md 2>/dev/null || echo "(none found)"`

## Today
!`date +%Y%m%d`

## Task ID for this activation
$ARGUMENTS

## What to do now
1. Find the handoff file matching this Task ID from the listing above and read it. If none matches, stop and tell the human to run `/hadp-manager` first.
2. Read the area-specific `AGENTS.md` for every directory under "Files to Modify," and `.agents/ARCHITECTURE.md`.
3. Follow the Task Execution Flow exactly as defined in the role file above.
4. Run the build command, then `rtk npm run hadp:check` as the compliance self-check — do not skip either; treat 🚫 BLOCKER/🔴 HIGH findings the same as a build failure.
5. Write the completion handoff packet to `.agents/handoffs/coder-to-tester_<TASK-ID>_<today>.md` and the workbook archive to `.agents/docs/workbook/coder/<today>_<TASK-ID>_completion.md`, in the exact Completion Handoff Packet Format given in the role file above (including the Compliance Self-Check section).
6. Do not wait for Worker Tester — it now runs as a sprint-end batch, not per task. Report completion and move on.
