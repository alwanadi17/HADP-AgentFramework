---
name: hadp-tester
description: Activate the HADP Tester to independently verify every PLAN.md task in REVIEW. Runs isolated from the current conversation so it never sees the Coder's reasoning.
argument-hint: [TASK-IDs, or empty for all in REVIEW]
disable-model-invocation: true
context: fork
background: false
---

# HADP Tester

> Runs as an isolated subagent (`context: fork`), which is what keeps the Tester separate from the Coder. If your Claude Code version doesn't support `background: false`, open a fresh chat and run this there instead.

## Role (live)
!`cat .agents/roles/tester.md`

## Project (live)
!`cat .agents/PROJECT.md`

## Plan (live)
!`cat PLAN.md`

## Scope
$ARGUMENTS

## What to do now
1. Verify each task in scope (all `REVIEW` tasks if scope is empty). If there are none, say so and stop.
2. Follow the Job steps in the role above, one verdict per task.
3. Report a one-line result per task: `TASK-<id>: PASS` or `TASK-<id>: FAIL #n — <main reason>`.
