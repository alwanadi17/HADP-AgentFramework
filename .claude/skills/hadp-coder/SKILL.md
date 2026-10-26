---
name: hadp-coder
description: Activate the HADP Coder to implement one task from PLAN.md. Requires the task to already exist — not for planning or testing.
argument-hint: [TASK-ID]
disable-model-invocation: true
---

# HADP Coder

## Role (live)
!`cat .agents/roles/coder.md`

## Project (live)
!`cat .agents/PROJECT.md`

## Plan (live)
!`cat PLAN.md`

## Task
$ARGUMENTS

## What to do now
1. Find the task above (or the first `TODO` if none was given). If there is none, stop and suggest `/hadp-planner`.
2. Follow the Job steps in the role above.
3. When the task is in `REVIEW`, report what changed and suggest `/hadp-tester`.
