---
name: hadp-coder
description: Run the HADP Coder on one task from PLAN.md, as a subagent using the model and effort the Planner chose. Requires the task to already exist — not for planning or testing.
argument-hint: [TASK-ID]
disable-model-invocation: true
---

# HADP Coder (dispatcher)

## Plan (live)
!`cat PLAN.md`

## Task
$ARGUMENTS

## What to do now
1. Find the task above (or the first `TODO` if none was given). If there is none, stop and suggest `/hadp-planner`.
2. Read its *Run* line: `coder <model>/<effort>`. If there's no *Run* line, omit `model` and `effort` so the subagent's defaults apply.
3. If the task's *Verdict* already shows `FAIL #2`, step up one level for this last attempt: model haiku → sonnet → opus, effort one step higher. Say that you did.
4. Launch the Agent tool with `subagent_type: hadp-coder`, the `model` and `effort` from steps 2–3, and the prompt `Implement TASK-<id> from PLAN.md.` Don't implement anything yourself.
5. Relay the subagent's report, then suggest `/hadp-tester` if the task is now in `REVIEW`.
