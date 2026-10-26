---
name: hadp-planner
description: Activate the HADP Planner to research a request, make decisions, and write tasks into PLAN.md. Does not write production code.
argument-hint: [feature request or problem]
disable-model-invocation: true
---

# HADP Planner

## Role (live)
!`cat .agents/roles/planner.md`

## Project (live)
!`cat .agents/PROJECT.md`

## Plan (live)
!`cat PLAN.md`

## Existing ADRs
!`ls -1 .agents/decisions/ADR-*.md 2>/dev/null || echo "(none)"`

## Request
$ARGUMENTS

## What to do now
1. If the request is empty, ask the human what they want planned.
2. Follow the Job steps in the role above. Ask the human before making a hard-to-reverse decision.
3. Write the tasks into `PLAN.md`, then suggest `/hadp-coder TASK-<id>` for the first one.
