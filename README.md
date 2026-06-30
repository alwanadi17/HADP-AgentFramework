# 📘 HADP — Hierarchical Agentic Development Pipeline

A reusable template for **multi-tier AI-assisted project development** using the HADP model.

## Quick Start

1. Copy the contents of this directory to your new project root
2. Customize `.agents/CONSTITUTION.md` — project identity & philosophy
3. Customize `.agents/RED_LINES.md` — hard constraints
4. Customize `.agents/ARCHITECTURE.md` — tech stack & data flow
5. Update `AGENTS.md` with your project-specific quick reference
6. Add `.agents/` to your `.gitignore`

## What's Included

```
.reusable_template/
├── README.md                         ← You are here
├── AGENTS.md                         ← HADP Manual Book (entry point)
├── PLAN.md                           ← Task checklist template
│
├── .agents/                          ← 🏢 KANTOR (governance & workflow)
│   ├── CONSTITUTION.md               ← Project identity (customize)
│   ├── RED_LINES.md                  ← Hard constraints (customize)
│   ├── ARCHITECTURE.md               ← Tech stack & data flow (customize)
│   ├── roles/                        ← Agent system prompts
│   │   ├── analyst.md               ← Tier 0 — Research & mapping
│   │   ├── auditor.md               ← Tier 0b — Compliance & decision review
│   │   ├── decision-maker.md         ← Tier 1 — Architecture & governance
│   │   ├── manager.md                ← Tier 2 — Task decomposition & validation
│   │   ├── worker-coder.md           ← Tier 3a — Code implementation
│   │   └── worker-tester.md          ← Tier 3b — Testing & verification
│   ├── handoffs/                     ← Active handoff packets
│   │   └── README.md
│   └── docs/                         ← Dokumentasi workflow & laporan
│       ├── handoff-protocol.md       ← How agents communicate
│       ├── workflow/
│       │   ├── lifecycle.md          ← High-level flow diagram
│       │   ├── states.md             ← Task lifecycle state machine
│       │   └── triggers.md           ← Transition triggers
│       ├── workbook/                 ← Per-role report archives
│       │   ├── analyst/
│       │   ├── auditor/
│       │   ├── decision-maker/
│       │   ├── manager/
│       │   ├── coder/
│       │   └── tester/
│       ├── reports/                  ← Aggregate reports
│       │   ├── sprint-review.md
│       │   └── audit-trail.md
│       └── decisions/                ← ADR archive
│           └── _template.md
│
└── src/                              ← 🏭 PABRIK (production code)
```

## Agent Hierarchy

| Tier | Role | Suggested Model Profile | Purpose |
|---|---|---|---|
| 0 | **Analyst** | Long-context, high-volume (e.g., Gemini 3.5 Flash Extended) | Research, codebase mapping, structured briefs |
| 0b | **Auditor** | High-reasoning (e.g., Opus 4.8) | Compliance audit, decision review, process assurance |
| 1 | **Decision Maker** | High-reasoning (e.g., Opus 4.8) | Rules, architecture, governance |
| 2 | **Manager** | Balanced intelligence (e.g., GPT 5.5) | Task decomposition, validation |
| 3a | **Worker Coder** | Coding-focused (e.g., GLM 5.2) | Code implementation |
| 3b | **Worker Tester** | Token-efficient (e.g., Gemini 3.5 Flash) | Testing, cross-validation |

## Workflow

```
                    ┌─── [Auditor] (on-demand) ───┐
                    │         ↑    ↑       ↑       │
                    │         │    │       │       │
                    ▼         │    │       │       │
Human → [Analyst] → Decision Maker → Manager → Worker Coder → Worker Tester → Manager → Human
         (opsional)                                    ↓              ↓
                                                  build pass    test report
```

**Step by step**:
0. **Analyst** (Optional) — deep research, structured briefs → `workbook/analyst/`
0b. **Auditor** (On-demand) — compliance audit, decision review → `workbook/auditor/`
1. **Decision Maker** — reads briefs, produces governance docs, writes ADRs
2. **Manager** — decomposes into tasks, creates handoff packets → `.agents/handoffs/`
3. **Worker Coder** — implements code, runs build, submits completion packet
4. **Worker Tester** — independently verifies, runs build, submits test report
5. **Manager** — macro-validation, PASS / FAIL / ESCALATE
6. **Human** — reviews, merges, triggers next cycle

> Full protocol: `.agents/docs/handoff-protocol.md`

## Core Concept

HADP separates **thinking** from **doing** through 6 agent roles:

| Role | Thinking / Doing | Key Rule |
|---|---|---|
| **Analyst** | 🧠 Thinking | Reads the codebase so Decision Maker doesn't have to |
| **Auditor** | 🧠 Thinking | Reviews compliance & decisions independently |
| **Decision Maker** | 🧠 Thinking | Makes high-level decisions only — never writes code |
| **Manager** | 🧠 Thinking | Translates decisions into atomic tasks — never writes code |
| **Worker Coder** | ⚡ Doing | Writes code only — never tests own work |
| **Worker Tester** | ⚡ Doing | Tests code only — must be a separate session |

### Key Principles
- **Separation of Concerns** — each tier does ONE thing
- **Gate System** — every transition requires a handoff packet
- **Token Efficiency** — Analyst reads once, Decision Maker doesn't read raw source
- **Fail Fast** — Coder fails build → report immediately. Issues → loop back

## Customization Points

| File | What to customize |
|---|---|
| `CONSTITUTION.md` | Project name, philosophy, non-negotiable principles |
| `RED_LINES.md` | Security, data, code quality, architecture constraints |
| `ARCHITECTURE.md` | Tech stack, directory structure, data flow, URL contract |
| `AGENTS.md` | Commands, critical files, design system, data sources |
| Role definitions | Model names, specific tool permissions, domain knowledge |

## Related Docs

| Doc | Path |
|---|---|
| Manual Book | `AGENTS.md` |
| Hard Constraints | `.agents/RED_LINES.md` |
| Workflow Lifecycle | `.agents/docs/workflow/lifecycle.md` |
| Handoff Protocol | `.agents/docs/handoff-protocol.md` |
| Task States | `.agents/docs/workflow/states.md` |
| Triggers | `.agents/docs/workflow/triggers.md` |
| Audit Trail | `.agents/docs/reports/audit-trail.md` |