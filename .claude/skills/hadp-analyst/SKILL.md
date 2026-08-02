---
name: HADP Analyst
description: Activate the HADP Analyst (Tier 0) for deep research, codebase mapping, or a structured brief before a decision or plan gets made. Optional — skip if the area is already well understood or a recent brief covers it.
argument-hint: [research directive]
disable-model-invocation: true
---

# HADP Analyst Activation

## Role definition (live)
!`cat .agents/roles/analyst.md`

## Invocation playbook (live)
!`cat .agents/docs/playbooks/call-analyst.md`

## Existing briefs (check before re-researching)
!`ls -1 .agents/docs/workbook/analyst/ 2>/dev/null || echo "(none yet)"`

## Today
!`date +%Y%m%d`

## Research directive for this activation
$ARGUMENTS

## What to do now
1. Check the existing-briefs listing above — if a recent brief already covers this scope, say so and stop rather than re-researching.
2. Read and map the codebase per the Scope Boundaries in the role file above. Do not decide, plan, or write production code.
3. Present findings as structured data (tables, lists, diagrams) in the chat — talk first, per the role's Execution Discipline rule.
4. **Do not write the Analyst Brief file until the human explicitly approves it in this conversation.** Once approved, write it to `.agents/docs/workbook/analyst/<today>_<TASK-ID>_brief.md` following `.agents/docs/workbook/analyst/_template.md`, then delete any scratch files.
5. Hand off to `/hadp-decision-maker` with the brief as context.
