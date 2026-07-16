# 📘 HADP Manual Book — Hierarchical Agentic Development Pipeline

> **Office (`.agents/`) vs Factory (root project)**
> All governance, workflow, and reports go in `.agents/`. Production source code lives in the root project.

---

## 🏛️ Model: Hierarchical Agentic Development Pipeline (HADP)

HADP is an AI agent-based software development model with **5 hierarchical tiers** that separates **thinking** from **doing**:

| Tier | Role | Model | Function |
|---|---|---|---|
| 0 | **Analyst** (on-demand) | Long-context, high-volume | Research, codebase mapping, structured briefs |
| 0b | **Auditor** (on-demand) | High-reasoning | Compliance audit, decision review, process assurance |
| 1 | **Decision Maker** | High-reasoning | Governance, architecture, decisions |
| 2 | **Manager** | Balanced intelligence | Task decomposition, delegation, validation |
| 3a | **Worker Coder** | Coding-focused | Code implementation |
| 3b | **Worker Tester** | Token-efficient | Testing & verification |

### Key Principles
- **Separation of Concerns** — Each tier does ONE thing. No overlap.
- **Gate System** — Every transition requires a handoff packet. No skipping.
- **Token Efficiency** — Analyst reads once, Decision Maker doesn't need to read source code.
- **Fail Fast** — Coder build fails → report immediately. Tester finds issue → loop back.

---

## 🏢 Office Structure (`.agents/`)

```
.agents/                           ← OFFICE — all agent affairs
├── CONSTITUTION.md                ← Project identity & philosophy
├── RED_LINES.md                   ← Hard constraints (read BEFORE every task)
├── ARCHITECTURE.md                ← Tech stack & data flow
├── roles/                         ← Role definitions for each agent
│   ├── analyst.md
│   ├── auditor.md
│   ├── decision-maker.md
│   ├── manager.md
│   ├── worker-coder.md
│   └── worker-tester.md
├── handoffs/                      ← Handoff packets between agents (active)
│   └── README.md
├── docs/                          ← Workflow documentation & reports
│   ├── handoff-protocol.md        ← Communication protocol between agents
│   ├── workflow/
│   │   ├── lifecycle.md           ← High-level flow diagram
│   │   ├── states.md              ← Task lifecycle states
│   │   └── triggers.md            ← Triggers for each transition
│   ├── workbook/                  ← REPORTS per role (archive)
│   │   ├── analyst/
│   │   ├── auditor/
│   │   ├── decision-maker/
│   │   ├── manager/
│   │   ├── coder/
│   │   └── tester/
│   ├── reports/                   ← Aggregate reports
│   │   ├── sprint-review.md
│   │   └── audit-trail.md
│   └── decisions/                 ← Architecture Decision Records (ADR)
│       └── _template.md

[ROOT PROJECT]                     ← FACTORY — production source code
├── AGENTS.md                      ← Manual Book (entry point — YOU ARE HERE)
├── PLAN.md                        ← Task checklist
├── README.md
└── src/                           ← Production code
```

---

## 🔄 Quick Workflow

```
                    ┌─── [Auditor] (on-demand) ───┐
                    │         ↑    ↑       ↑       │
                    │         │    │       │       │
                    ▼         │    │       │       │
Human → [Analyst] → Decision Maker → Manager → Worker Coder → Worker Tester → Manager → Human
         (optional)                                    ↓              ↓
                                                  build pass    test report
```

### Step by Step:
1. **Human** → submits feature request / task
2. **Analyst** (optional) → research, codebase mapping, output to `workbook/analyst/`
3. **Decision Maker** → read brief, make decisions, update governance, write ADR
4. **Manager** → decompose tasks, create handoff packet → `handoffs/mgr-to-coder_*.md`
5. **Worker Coder** → implement, build check, create completion packet
6. **Worker Tester** → verify, test, create test report
7. **Manager** → macro validation, PASS / FAIL / ESCALATE
8. **Human** → final review, merge

> Full details: `.agents/docs/workflow/lifecycle.md`

---

## 📋 Quick Reference

### Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build (MUST pass before shipping)
npm run lint     # Lint check
npm run test     # Run tests
```

### Critical Files (must read before task)
| File | Path | When to Read |
|---|---|---|
| Manual Book | `AGENTS.md` | Every chat start |
| RTK Command Guide | `RTK.md` | Every chat start |
| Hard Constraints | `.agents/RED_LINES.md` | Before every task |
| Project Identity | `.agents/CONSTITUTION.md` | Before first task |
| Tech Stack | `.agents/ARCHITECTURE.md` | Before first task |
| Role Definition | `.agents/roles/{role}.md` | When assigned to that role |
| Area Rules | `{area}/AGENTS.md` | Before touching that area |
| Task Plan | `PLAN.md` | Check task dependencies |

### Naming Convention Handoff Packets
```
{direction}_{task-id}_{YYYYMMDD}.md
```
Prefix: `analyst-to-dm`, `auditor-to-dm`, `auditor-to-mgr`, `dm-to-mgr`, `mgr-to-coder`, `coder-to-tester`, `tester-to-mgr`, `tester-to-coder`, `mgr-to-dm`

### Naming Convention Workbook
```
docs/workbook/{role}/YYYYMMDD_TASK-XXX_{type}.md
```
Example: `docs/workbook/coder/20260630_TASK-001_completion.md`

---

## 📚 Related Documents

| Document | Path | Description |
|---|---|---|
| Workflow Lifecycle | `.agents/docs/workflow/lifecycle.md` | Full flow diagram |
| Task States | `.agents/docs/workflow/states.md` | Task state machine |
| Triggers | `.agents/docs/workflow/triggers.md` | Triggers for each transition |
| Handoff Protocol | `.agents/docs/handoff-protocol.md` | Communication format between agents |
| Severity System | `.agents/docs/framework/severity-system.md` | Severity standards for all roles |
| Artifact Contracts | `.agents/docs/framework/artifact-contracts.md` | Validation contracts for each artifact |
| Auditor Role | `.agents/roles/auditor.md` | Auditor role definition |
| Workbook Templates | `.agents/docs/workbook/{role}/_template.md` | Report templates per role |
| ADR Template | `.agents/docs/decisions/_template.md` | Architecture decision template |

---

## ⚙️ Rules for All Agents

### DO
- Prefix shell/CLI commands with `rtk` per `RTK.md` — applies to every role/model, not just Claude Code
- Read `RED_LINES.md` before starting any task
- Read area-specific `AGENTS.md` before touching files in that area
- Follow acceptance criteria from Manager
- Report honestly — if there is a problem, say so
- Use established naming conventions

### DON'T
- Do not modify governance files without Decision Maker approval
- Do not skip handoff packets — every transition MUST have an artifact
- Do not skip tiers — order must follow hierarchy
- Do not test own work (Coder) nor code (Tester)
- Do not create files outside task scope without approval

---

> **Last Updated**: 2026-06-30
> **Model**: Hierarchical Agentic Development Pipeline (HADP)