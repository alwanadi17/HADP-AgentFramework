---
name: HADP Manager
description: Activate the HADP Manager (Tier 2) — the most frequently used role — for task decomposition, delegating to Worker Coder, macro-validating a Worker Tester report, or escalating to Decision Maker.
argument-hint: [directive / TASK-ID / validate]
disable-model-invocation: true
---

# HADP Manager Activation

## Role definition (live)
!`cat .agents/roles/manager.md`

## Invocation playbook (live)
!`cat .agents/docs/playbooks/call-manager.md`

## Governance docs (live)
!`cat .agents/CONSTITUTION.md`
!`cat .agents/RED_LINES.md`
!`cat .agents/ARCHITECTURE.md`

## Current PLAN.md
!`cat PLAN.md 2>/dev/null || echo "(no PLAN.md yet)"`

## Task Index
!`cat .agents/docs/reports/task-index.md 2>/dev/null || echo "(no task index yet)"`

## Open handoffs (both directions)
!`ls -1 .agents/handoffs/*.md 2>/dev/null || echo "(none)"`

## Working tree status
!`git status --short`

## Today
!`date +%Y%m%d`

## Directive for this activation
$ARGUMENTS

## What to do now
1. Determine the Activation Purpose (Decomposition / Delegation / Validation / Escalation) from the directive above and the open-handoffs listing.
2. Follow the Manager Flow phases in the role file above for that purpose.
3. If decomposing: break into atomic tasks (≤100 LOC each), update `PLAN.md` using the Task Decomposition Format in the role file.
4. If delegating: write `.agents/handoffs/mgr-to-coder_<TASK-ID>_<today>.md`, respecting the max-3-simultaneous-tasks rule.
5. If validating a Worker Tester report: run the Macro Validation checklist, **then before any PASS verdict, invoke the Skill tool for `/hadp-compliance` and block on its result** — 🚫 BLOCKER / 🔴 HIGH findings hard-block PASS.
6. Update the Task Index after every state change and final verdict.
7. Hand off per the role file: → Worker Coder, → Decision Maker (escalation), or → Human (final review).
