# HADP — Hierarchical Agentic Development Pipeline

A small template for building software with several AI models, each doing what it's cheapest at:

- **Planner** — an expensive, high-reasoning model thinks and writes tasks.
- **Coder** — a coding-focused model implements them.
- **Tester** — a cheap model verifies each task in a separate session.

They never share a chat. Everything passes through one file: `PLAN.md`. Its Checklist at the top shows where every task stands.

## Quick start

1. Copy `AGENTS.md`, `PLAN.md`, `.agents/` and `.claude/` into your project root.
2. Fill in `.agents/PROJECT.md` (stack, commands, red lines) — or run `/hadp-init` in Claude Code.
3. Ask the Planner for something: `/hadp-planner add login with email`.
4. Implement a task: `/hadp-coder TASK-001`.
5. Verify: `/hadp-tester`.
6. Review `DONE` tasks and merge.

The Planner picks each task's model and effort (`Run: coder sonnet/medium · tester haiku/low`), and the Coder/Tester skills run with exactly that.

Using another agent (Gemini, GPT, GLM, …)? Each role file in `.agents/roles/` ends with a prompt you can paste in.

## What's included

```
AGENTS.md                 the whole manual — start here
PLAN.md                   task list + handoff channel
.agents/
  PROJECT.md              project facts and red lines
  roles/                  planner.md, coder.md, tester.md
  decisions/_template.md  ADR template, for hard-to-reverse decisions only
.claude/skills/           /hadp-init, /hadp-planner, /hadp-coder, /hadp-tester
.claude/agents/           Coder and Tester subagents
```

## How a task moves

```
TODO → DOING → REVIEW → DONE
                 │
                 └─ FAIL → TODO (3rd fail → BLOCKED → back to Planner)
```

## History

v1 had six roles, eleven workflow triggers, handoff packets, per-role report archives and a compliance script. It was too heavy to use, so v2 cut it down to this. The full v1 is still available at the git tag `v1-full`.

## License

MIT — see `LICENSE`.
