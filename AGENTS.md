# AGENTS.md — [PROJECT NAME]

Root-level instructions for all AI agents working on this project. Read this first before any task.

## Project Overview

[Brief project description — tech stack, deployment, key integrations.]

## Agent Hierarchy

| Tier | Role | Model | Governance |
|---|---|---|---|
| 0 | Analyst (on-demand) | [e.g., Gemini 3.5 Flash Extended] | `.agents/roles/analyst.md` |
| 1 | Decision Maker | [e.g., Opus 4.8] | `.agents/roles/decision-maker.md` |
| 2 | Manager | [e.g., GPT 5.5] | `.agents/roles/manager.md` |
| 3a | Worker Coder | [e.g., GLM 5.2] | `.agents/roles/worker-coder.md` |
| 3b | Worker Tester | [e.g., Gemini 3.5 Flash] | `.agents/roles/worker-tester.md` |

## Quick Reference

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build (MUST pass before shipping)
npm run lint     # Lint check
npm run test     # Run tests
```

### Critical Files
- `PLAN.md` — Current task checklist
- `.agents/RED_LINES.md` — Hard constraints (read before every task)
- `.agents/CONSTITUTION.md` — Project philosophy
- `.agents/ARCHITECTURE.md` — Tech stack & data flow

### Data Sources
- **[Source 1]**: [e.g., `src/data/data.json` (SSOT)]
- **[Source 2]**: [e.g., API via `api/proxy.js` (live)]

### Design System
- **Aesthetic**: [e.g., Natural Classic, Modern Minimalist]
- **Palette**: [e.g., Stone/neutral earth tones]
- **Typography**: [e.g., Serif headings + clean sans-serif body]
- **Layout**: [e.g., Breathable, generous whitespace, smooth scroll]

## Area-Specific Rules

Each subdirectory may contain its own `AGENTS.md` with focused rules:
- `api/AGENTS.md` — Backend / API conventions
- `src/components/AGENTS.md` — Component patterns
- `src/pages/AGENTS.md` — Page-level conventions

## Before Any Task

1. Read `.agents/RED_LINES.md`
2. Read the area-specific `AGENTS.md` for the files you'll touch
3. Read the task handoff packet from `.agents/handoffs/`
4. Check current `PLAN.md` for context and dependencies
