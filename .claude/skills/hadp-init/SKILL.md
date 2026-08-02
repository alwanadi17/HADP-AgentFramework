---
name: HADP Init
description: One-time setup wizard for a freshly copied HADP template — customizes CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md, AGENTS.md, and .gitignore for the new project. Run this first, before any other hadp-* skill.
disable-model-invocation: true
---

# HADP Init — Project Bootstrap

## Quick Start steps (live)
!`cat README.md`

## Current governance docs (live — may still be template placeholders)
!`cat .agents/CONSTITUTION.md`
!`cat .agents/RED_LINES.md`
!`cat .agents/ARCHITECTURE.md`

## Current AGENTS.md
!`cat AGENTS.md`

## .gitignore status
!`cat .gitignore 2>/dev/null || echo "(no .gitignore yet)"`

## What to do now

1. Check whether this looks like the HADP template repo itself (e.g. the README above still has the "HADP v2.0 roadmap" milestone table, or milestones are marked with framework-internal task IDs) rather than a downstream copy. If so, **stop and warn the human** — this skill is for a freshly copied project, not for the template repo, since gitignoring `.agents/` here would break the framework's own tracked files.
2. Otherwise, check whether `CONSTITUTION.md` / `RED_LINES.md` / `ARCHITECTURE.md` above still contain template placeholders (e.g. `[Project Name]`, bracketed instructions). If they already look customized, confirm with the human before overwriting anything.
3. Ask the human, one question at a time (don't dump all four at once):
   - Project identity & philosophy → goes into `.agents/CONSTITUTION.md`
   - Non-negotiable hard constraints (security, data, code quality, architecture, agent behavior) → goes into `.agents/RED_LINES.md`
   - Tech stack, directory structure, data flow → goes into `.agents/ARCHITECTURE.md`
   - Project-specific commands and critical files → goes into `AGENTS.md`'s Quick Reference section
4. Write the answers into those four files, **preserving each doc's existing section structure and headings** — fill in placeholders, don't invent new sections or reorganize.
5. Ensure `.agents/` is present in `.gitignore`: create the file if it's missing, append the entry only if it isn't already present (check the listing above first).
6. Summarize exactly what was created/changed, then hand off: suggest `/hadp-decision-maker` if the human has an architectural decision to make next, or `/hadp-manager` if governance is already settled and they're ready to decompose the first task.
