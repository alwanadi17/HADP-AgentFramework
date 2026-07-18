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
├── RTK.md                            ← Token-optimized CLI command guide (read by all roles)
├── PLAN.md                           ← Task checklist template
│
├── .agents/                          ← 🏢 OFFICE (governance & workflow)
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
│   └── docs/                         ← Workflow documentation & reports
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
└── src/                              ← 🏭 FACTORY (production code)
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

## 📋 Next Development Project — HADP v2.0

Planned milestones to evolve the HADP framework. Each milestone is a standalone project with its own tasks.

---

### Milestone 1: Decision Quality Rubric ✅
**Goal**: Give the Auditor objective parameters to evaluate architectural decisions.

| Task | Deliverable | Status |
|---|---|---|
| Create `.agents/docs/framework/` folder | Folder structure | ✅ |
| Create `decision-quality-rubric.md` | Rubric with 6 dimensions (reversibility, blast radius, coupling, operational cost, security, simplicity) | ✅ |
| Update `auditor.md` — add rubric reference | Role definition update | ✅ |
| Update `triggers.md` — T0b output rubric | Trigger update | ✅ |

---

### Milestone 2: Artifact Contracts ✅
**Goal**: Every handoff/workbook file must have a validation contract — no empty placeholders allowed.

| Task | Deliverable | Status |
|---|---|---|
| Create `artifact-contracts.md` in `.agents/docs/framework/` | Contract definitions per artifact type | ✅ |
| Update all `_template.md` files — add required field markers | Template update | ✅ |
| Add validation checklist to `manager.md` | Manager role update | ✅ |

---

### Milestone 3: Task Index Registry ✅
**Goal**: Every task is traceable from request to final verdict in one place.

| Task | Deliverable | Status |
|---|---|---|
| Create `task-index.md` in `.agents/docs/reports/` | Registry template | ✅ |
| Update `PLAN.md` — add task index reference | Plan update | ✅ |
| Update `manager.md` — must update task index after final verdict | Manager role update | ✅ |

---

### Milestone 4: Role Activation Playbooks
**Goal**: Every role has a playbook with consistent invocation prompts and templates.

| Task | Deliverable | Status |
|---|---|---|
| Create `.agents/docs/playbooks/` folder | Folder structure | ✅ |
| Create `call-analyst.md` | Analyst playbook | ✅ |
| Create `call-auditor.md` | Auditor playbook | ✅ |
| Create `call-decision-maker.md` | Decision Maker playbook | ✅ |
| Create `call-manager.md` | Manager playbook | ✅ |
| Create `call-coder.md` | Coder playbook | ✅ |
| Create `call-tester.md` | Tester playbook | ✅ |

---

### Milestone 5: Automation Tooling ✅
**Goal**: CLI script to validate framework structure and compliance.

| Task | Deliverable | Status |
|---|---|---|
| Create `scripts/hadp-check.js` | Validation script | ✅ |
| Add `npm run hadp:check` to `AGENTS.md` | Command update | ✅ |
| Create `.agents/docs/framework/validation-rules.md` | Rules documentation | ✅ |
| Wire `hadp:check` as mandatory gate at Manager's PASS verdict (T5b) | `manager.md`, `auditor.md`, `call-auditor.md`, `triggers.md`, `states.md`, `artifact-contracts.md` updates | ✅ |

---

### Milestone 6: Framework Documentation Overhaul ✅
**Goal**: Complete, structured framework documentation.

| Task | Deliverable | Status |
|---|---|---|
| Create `framework-overview.md` in `.agents/docs/framework/` | HADP architecture overview | ✅ |
| Create `glossary.md` | Term definitions (HADP, handoff, workbook, etc.) | ✅ |
| Update `AGENTS.md` — add links to framework docs | Manual Book update | ✅ |

---

### Priority Order

```
Milestone 1 (Rubric) → Milestone 2 (Contracts) → Milestone 3 (Registry)
       ↓
Milestone 4 (Playbooks) → Milestone 5 (Tooling) → Milestone 6 (Docs)
```

**All 6 milestones complete.** The v2.0 roadmap is done — Auditor has both a scoring rubric and blocking automated tooling, every artifact has a validation contract, tasks are traceable end-to-end, every role has an activation playbook, compliance is enforced automatically at the Manager's PASS gate, and the framework is documented top-to-bottom (`.agents/docs/framework/framework-overview.md` is the new entry point for architecture questions).
