---
name: hadp-init
description: One-time setup for a freshly copied HADP template — fills in .agents/PROJECT.md and the PLAN.md title. Run this before any other hadp-* skill.
disable-model-invocation: true
---

# HADP Init

## Current project file (live — may still be placeholders)
!`cat .agents/PROJECT.md`

## Repo at a glance
!`ls -a`
!`cat package.json 2>/dev/null || cat pyproject.toml 2>/dev/null || cat go.mod 2>/dev/null || cat Cargo.toml 2>/dev/null || echo "(no manifest found)"`

## What to do now
1. If this is the HADP template repo itself (README describes HADP and there's no project code), stop and tell the human this skill is for a copied project.
2. If `PROJECT.md` is already filled in, confirm with the human before overwriting.
3. Fill in what you can infer from the repo (stack, commands, structure), then ask the human — one question at a time — for the rest: what the project is, and any project-specific red lines.
4. Write the answers into `.agents/PROJECT.md` (keep its headings) and replace `[PROJECT NAME]` in `PLAN.md`.
5. Summarize what changed and suggest `/hadp-planner` next.
