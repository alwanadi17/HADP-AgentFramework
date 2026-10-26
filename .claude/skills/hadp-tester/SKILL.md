---
name: hadp-tester
description: Run the HADP Tester on every PLAN.md task in REVIEW, one isolated subagent per task, using the model and effort the Planner chose.
argument-hint: [TASK-IDs, or empty for all in REVIEW]
disable-model-invocation: true
---

# HADP Tester (dispatcher)

## Plan (live)
!`cat PLAN.md`

## Scope
$ARGUMENTS

## What to do now
1. List the tasks in scope (all `REVIEW` tasks if scope is empty). If there are none, say so and stop.
2. For each task, read its *Run* line: `tester <model>/<effort>`. If there's no *Run* line, omit `model` and `effort` so the subagent's defaults apply.
3. For each task, launch the Agent tool with `subagent_type: hadp-tester`, that `model` and `effort`, and the prompt `Verify TASK-<id> from PLAN.md.` One subagent per task, one at a time, since they all edit `PLAN.md`. Don't verify anything yourself.
4. Report one line per task: `TASK-<id>: PASS` or `TASK-<id>: FAIL #n — <main reason>`.
