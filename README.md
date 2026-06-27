# 🤖 Multi-Agent Project Management Template

A reusable template for multi-tier AI-assisted project development.

## Quick Start

1. Copy the contents of this directory to your new project root
2. Customize `.agents/CONSTITUTION.md` with your project's identity and philosophy
3. Customize `.agents/RED_LINES.md` with your project's hard constraints
4. Customize `.agents/ARCHITECTURE.md` with your tech stack and data flow
5. Update `AGENTS.md` with your project-specific quick reference
6. Add `.agents/` to your `.gitignore`

## What's Included

```
.reusable_template/
├── README.md                         ← You are here
├── .agents/
│   ├── CONSTITUTION.md               ← Project identity (customize)
│   ├── RED_LINES.md                  ← Hard constraints (customize)
│   ├── ARCHITECTURE.md               ← Tech stack & data flow (customize)
│   ├── roles/
│   │   ├── analyst.md               ← Tier 0 system prompt
│   │   ├── decision-maker.md         ← Tier 1 system prompt
│   │   ├── manager.md                ← Tier 2 system prompt
│   │   ├── worker-coder.md           ← Tier 3a system prompt
│   │   └── worker-tester.md          ← Tier 3b system prompt
│   └── handoffs/
│       └── README.md                 ← Handoff naming conventions
├── docs/
│   ├── handoff-protocol.md           ← How agents communicate
│   └── decisions/
│       └── _template.md              ← ADR template
├── AGENTS.md                         ← Root agent instructions (customize)
└── PLAN.md                           ← Task checklist template
```

## Agent Hierarchy

| Tier | Role | Suggested Model Profile | Purpose |
|---|---|---|---|
| 0 | Analyst | Long-context, high-volume (e.g., Gemini 3.5 Flash Extended) | Research, codebase mapping, structured briefs |
| 1 | Decision Maker | High-reasoning (e.g., Opus 4.8) | Rules, architecture, governance |
| 2 | Manager | Balanced intelligence (e.g., GPT 5.5) | Task decomposition, validation |
| 3a | Worker Coder | Coding-focused (e.g., GLM 5.2) | Code implementation |
| 3b | Worker Tester | Token-efficient (e.g., Gemini 3.5 Flash) | Testing, cross-validation |

## Workflow

See `docs/handoff-protocol.md` for the complete workflow.

**Short version**:
0. Analyst (Optional) → does deep research, produces structured briefs
1. Decision Maker → reads briefs, produces governance docs
2. Manager → decomposes into tasks, creates handoff packets
3. Worker Coder → implements code, submits completion packets
4. Worker Tester → independently verifies, submits test report
5. Manager → macro-validates, passes or fails
6. Human → reviews, merges

## Core Concept

The workflow separates **thinking** from **doing**:
- **Analyst** reads the codebase so the Decision Maker doesn't have to (saves expensive reasoning tokens)
- **Decision Maker** makes high-level decisions only — never writes code
- **Manager** translates decisions into atomic tasks — never writes code
- **Worker Coder** writes code only — never tests their own work
- **Worker Tester** tests code only — must be a separate session to eliminate confirmation bias

## Customization Points

| File | What to customize |
|---|---|
| `CONSTITUTION.md` | Project name, philosophy, non-negotiable principles |
| `RED_LINES.md` | Security, data, code quality, architecture constraints |
| `ARCHITECTURE.md` | Tech stack, directory structure, data flow, URL contract |
| `AGENTS.md` | Commands, critical files, design system, data sources |
| Role definitions | Model names, specific tool permissions, domain knowledge |
