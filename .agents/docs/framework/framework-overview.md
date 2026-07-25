# Framework Overview — HADP

> The architecture explainer. `AGENTS.md` is the quick-reference entry point; this doc is where you come to understand *why* HADP is shaped the way it is and how all the pieces fit together. New to the framework? Read this once, then use `AGENTS.md` for day-to-day lookups.

## What HADP Is

HADP (Hierarchical Agentic Development Pipeline) is a multi-agent development model built around one idea: **separate thinking from doing, and never let a role grade its own work.** Instead of one AI agent doing research, deciding architecture, writing code, and testing it in a single session, HADP splits those responsibilities across distinct tiers, each with a narrow mandate, that hand off work to each other through structured, auditable artifacts.

It's agent-model-agnostic — any tier can run on any LLM (Claude, Gemini, GPT, GLM, etc.). `RTK.md` and this framework's rules apply regardless of which model is behind a given role.

## Core Philosophy

| Principle | What it means | Where it's enforced |
|---|---|---|
| **Separation of Concerns** | Each tier does ONE thing — a role that decides never codes, a role that codes never tests its own work | Role docs in `.agents/roles/` define strict DO/DON'T boundaries |
| **Gate System** | Every transition between tiers requires a handoff packet — no skipping, no verbal-only handoffs | `.agents/docs/workflow/triggers.md`, `states.md` |
| **Fail Fast** | A build failure or test failure is reported immediately and loops back, rather than being carried forward | Retry policy in `states.md`, escalation path in `triggers.md` |
| **Token Efficiency** | Expensive, high-reasoning tiers shouldn't have to re-read what a cheaper tier already digested | Analyst produces briefs so Decision Maker doesn't read raw source; Automated Compliance Check runs on a cheap model so Manager doesn't burn its own context on a deterministic script |
| **No Unverified Trust** | Nothing is "done" because one role says so — every claim gets independently checked by the next role in the chain | Tester re-runs the build independently rather than trusting Coder's report; Manager requires `hadp:check` to pass, not just Coder/Tester's self-reports |

## The Tier Model

HADP has 6 tiers: 4 that participate in every task, and 2 that are on-demand support roles.

| Tier | Role | Participates | Model Profile | Function |
|---|---|---|---|---|
| 0 | Analyst | On-demand | Long-context, high-volume | Research, codebase mapping |
| 0b | Auditor | **Split** — see below | High-reasoning (Full Audit) / Sonnet-tier (Automated Compliance Check) | Compliance, decision review |
| 1 | Decision Maker | Every task | High-reasoning | Governance, architecture |
| 2 | Manager | Every task | Balanced intelligence | Decomposition, delegation, final validation |
| 3a | Worker Coder | Every task | Coding-focused | Implementation |
| 3b | Worker Tester | Every task | Token-efficient | Independent verification |

**Note on the Auditor (Tier 0b)**: since Milestone 5, the Auditor tier covers two genuinely different jobs, not one. See `.agents/roles/auditor.md` → "Two Modes of Operation":
- **Full Audit** — on-demand, human-triggered, advisory only, high-reasoning model. Judgment calls: is this ADR sound, was the process followed.
- **Automated Compliance Check** — mandatory, blocking, Sonnet-tier model is sufficient because it's just running `npm run hadp:check` and reporting the result. Not a judgment call. Since Milestone 7, this runs twice: a per-task self-check by Worker Coder (fast feedback), and Manager's cumulative final gate before PASS.

## Office vs. Factory

```
.agents/     ← OFFICE — governance, roles, workflow docs, handoff packets, reports
[root]       ← FACTORY — production source code, PLAN.md, AGENTS.md, README.md
```

This split exists so that agent-governance churn (updated playbooks, new ADRs, workbook entries) never pollutes the actual codebase's history or file tree. `.agents/` is meant to be gitignored in downstream projects that copy this template (see `README.md` Quick Start) — the office is scaffolding, not product.

## How Tiers Communicate: The Handoff System

Tiers don't share a conversation or context window — they communicate exclusively through **handoff packets**, structured markdown files in `.agents/handoffs/` named `{direction}_{task-id}_{YYYYMMDD}.md`. Each packet type has a formal **artifact contract** (`.agents/docs/framework/artifact-contracts.md`) defining its required fields and valid statuses — a packet that doesn't satisfy its contract isn't a valid handoff.

This is deliberate: it's what makes the pipeline auditable (every decision has a paper trail), resumable (a new session can pick up exactly where the last one left off by reading the packet), and cross-model-safe (a Gemini Tester and a GLM Coder don't need shared memory, just a shared file format).

## The Gate System: States and Triggers

Every task moves through a fixed state machine (`.agents/docs/workflow/states.md`):

```
TODO → CODING → TESTING → IN_REVIEW → DONE
         ↓         ↓           ↓
        FAIL   CONCERNS    ESCALATED
```

Each arrow is a **trigger** (`.agents/docs/workflow/triggers.md`, T0–T9, T5b) with a defined condition and required artifact. The one gate every task must clear before `DONE` is `IN_REVIEW → DONE`, which since Milestone 5 requires **both** Manager's macro validation **and** a passing `npm run hadp:check` (trigger T5b) — see `.agents/docs/framework/validation-rules.md` for exactly what that script checks. Since Milestone 7, `CODING → TESTING` (T4) is also a defined batch gate: it fires once per sprint, not per task — see the Full Lifecycle section below.

Retries and escalation aren't unbounded: 3 failed Coder attempts or 2 failed Tester attempts force an escalation to the Manager, and Manager escalations go to the Decision Maker, whose ruling is final (`states.md` → Retry Policy).

## The Quality Framework

Four documents work together to keep quality assessment consistent across every role and every model:

| Document | Answers |
|---|---|
| `severity-system.md` | How bad is this finding? (🚫 BLOCKER → ⚪ INFO, single source of truth for every role) |
| `artifact-contracts.md` | Is this handoff packet even valid? (required fields, valid statuses) |
| `decision-quality-rubric.md` | Is this architectural decision sound? (6-dimension scoring, used by Auditor on ADRs) |
| `validation-rules.md` | What does the automated gate actually check? (the deterministic subset of the above three, enforced by `hadp-check.js`) |

The relationship: `validation-rules.md` automates the parts of `artifact-contracts.md` and the Auditor's checklist that are mechanical (naming, required fields, placeholders, checkbox completeness). `severity-system.md` decides what fails the build. `decision-quality-rubric.md` stays human/LLM-judgment-only — it's not automatable.

## Full Lifecycle

```
Human → [Analyst, optional] → Decision Maker → Manager
                                                   │
                                                   ▼
                                    Worker Coder (per task, repeats all sprint)
                                        implement → build → hadp:check self-check
                                                   │
                                          (queues, does not block next task)
                                                   │
                              ─ ─ ─ ─ ─ sprint end declared (T4) ─ ─ ─ ─ ─
                                                   │
                                                   ▼
                                    Worker Tester (once, batched — all queued tasks)
                                                   │
                                                   ▼
                                                Manager
                                                   │
                                    ┌──────────────┤
                                    ▼                    ▼
                          Automated Compliance      Macro Validation
                          Check (T5b, Sonnet,       (architecture fit,
                          cumulative re-check)      scope, judgment)
                                    │                    │
                                    └────────┬───────────┘
                                             ▼
                                  PASS → Human (merge)
                                  FAIL → Worker Coder (retry, max 3)
                                  ESCALATE → Decision Maker
```

Since Milestone 7, `hadp:check` runs twice: once per task (Worker Coder self-check, fast feedback during the sprint) and once cumulatively (Manager's T5b gate, the actual PASS blocker). Worker Tester runs once — at sprint end, as a batch — because it's the expensive, judgment-based step; `hadp:check` is cheap, so it doesn't share that cadence. See `.agents/docs/framework/validation-rules.md` → "Two Checkpoints."

Full diagram: `.agents/docs/workflow/lifecycle.md`.

## Map of Every Framework Doc

| Doc | Purpose |
|---|---|
| `AGENTS.md` | Quick-reference entry point |
| `RTK.md` | Token-optimized CLI commands (all roles, all models) |
| `.agents/CONSTITUTION.md` | Project identity, philosophy |
| `.agents/RED_LINES.md` | Hard constraints |
| `.agents/ARCHITECTURE.md` | Tech stack, data flow |
| `.agents/roles/*.md` | Per-tier role definitions |
| `.agents/docs/playbooks/call-*.md` | How to invoke each role |
| `.agents/docs/handoff-protocol.md` | Handoff packet naming & flow |
| `.agents/docs/workflow/lifecycle.md` | Full flow diagram |
| `.agents/docs/workflow/states.md` | Task state machine |
| `.agents/docs/workflow/triggers.md` | Per-transition trigger definitions |
| `.agents/docs/framework/severity-system.md` | Severity classification |
| `.agents/docs/framework/artifact-contracts.md` | Per-artifact validation contracts |
| `.agents/docs/framework/decision-quality-rubric.md` | ADR quality scoring |
| `.agents/docs/framework/validation-rules.md` | `hadp:check` rule spec |
| `.agents/docs/framework/glossary.md` | Term definitions |
| `.agents/docs/decisions/ADR-XXX.md` | Individual architecture decisions |
| `.agents/docs/reports/task-index.md` | Master task registry |
| `.agents/docs/reports/sprint-review.md` | Aggregate sprint reports |
| `.agents/docs/reports/audit-trail.md` | Significant-event log |

## References

- Defined in: `.agents/docs/framework/framework-overview.md`
- Entry point: `AGENTS.md`
- Related: `.agents/docs/framework/glossary.md`
