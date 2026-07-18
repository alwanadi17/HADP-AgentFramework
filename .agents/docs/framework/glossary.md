# Glossary — HADP Framework

> Term definitions used across HADP docs. Alphabetical. Each entry links to where the term is formally defined.

---

**ADR (Architecture Decision Record)**
A structured record of a single architectural decision — context, decision, rationale, consequences. Written by the Decision Maker. Contract: `artifact-contracts.md` → `decision_record`. Template: `.agents/docs/decisions/_template.md`.

**Artifact Contract**
The formal schema every handoff/workbook artifact must satisfy — required fields, valid statuses, validation rules. Defined per artifact type in `.agents/docs/framework/artifact-contracts.md`.

**Audit Trail**
Log of significant events (decisions, state changes, escalations, failures, completions, merges). `.agents/docs/reports/audit-trail.md`.

**Auditor**
Tier 0b. Independent review authority with two distinct modes — see **Full Audit** and **Automated Compliance Check** below. `.agents/roles/auditor.md`.

**Automated Compliance Check**
The mandatory, Manager-triggered, Sonnet-tier subagent run of `npm run hadp:check` that gates every task's `IN_REVIEW → DONE` transition (trigger T5b). Blocking — distinct from the optional, advisory **Full Audit**. `.agents/docs/framework/validation-rules.md`.

**BLOCKER**
Highest severity level — "cannot proceed." Fails `hadp:check` and blocks any handoff. `.agents/docs/framework/severity-system.md`.

**Coder Completion Packet**
The handoff artifact Worker Coder produces for Worker Tester after implementation. Contract: `coder_completion`. Naming: `coder-to-tester_TASK-XXX_YYYYMMDD.md`.

**CONCERNS**
A Tester or Manager verdict meaning "passes technically but has issues worth flagging" — distinct from FAIL (blocking) and PASS (clean). The Manager decides whether to accept or reject.

**CONSTITUTION.md**
Governance doc defining project identity, philosophy, and non-negotiable principles. Customized once per project, read before every first task. `.agents/CONSTITUTION.md`.

**Decision Maker**
Tier 1. Makes architecture and governance decisions, writes ADRs. Never writes code, never decomposes tasks. `.agents/roles/decision-maker.md`.

**ESCALATE / ESCALATED**
A verdict/state meaning the issue is beyond the current tier's authority to resolve and is routed up the hierarchy (Manager → Decision Maker). The Decision Maker's ruling on an escalation is final.

**Factory**
The root project directory — production source code, `PLAN.md`, `AGENTS.md`, `README.md`. Contrasted with **Office**. See `.agents/docs/framework/framework-overview.md`.

**FAIL**
A verdict meaning acceptance criteria were not met or a RED_LINE was violated. Triggers a retry (up to the retry limit) or escalation.

**Full Audit**
The on-demand, human-triggered, advisory (non-blocking) mode of the Auditor tier — ADR review, process audits, decision quality review. Uses a high-reasoning model. Contrasted with **Automated Compliance Check**. `.agents/docs/playbooks/call-auditor.md`.

**Gate**
A transition point between tiers or states that requires a specific artifact and condition to pass before proceeding — e.g. the build must pass before Coder → Tester, `hadp:check` must pass before Manager can issue PASS. See `.agents/docs/workflow/triggers.md`.

**Governance Docs**
Shorthand for `CONSTITUTION.md`, `RED_LINES.md`, and `ARCHITECTURE.md` collectively — the project's foundational rules, owned by the Decision Maker.

**HADP**
Hierarchical Agentic Development Pipeline — the model this whole framework implements. See `README.md` and `.agents/docs/framework/framework-overview.md`.

**Handoff Packet**
A structured markdown file in `.agents/handoffs/` that carries work from one tier to the next. Named `{direction}_{task-id}_{YYYYMMDD}.md`. Naming convention: `.agents/docs/handoff-protocol.md`.

**hadp:check**
The `npm run hadp:check` command (`scripts/hadp-check.js`) — the deterministic script behind the Automated Compliance Check. `.agents/docs/framework/validation-rules.md`.

**HIGH**
Second-highest severity — "must fix before merge," violates a RED_LINE or breaks core functionality. Fails `hadp:check`. `.agents/docs/framework/severity-system.md`.

**IN_REVIEW**
Task state: Manager is performing macro validation (including the Automated Compliance Check). Next states: DONE, FAIL, or ESCALATED. `.agents/docs/workflow/states.md`.

**LOW**
Minor-severity finding — readability, naming, formatting. Does not block any gate. Can defer.

**Macro Validation**
The Manager's final review pass before issuing a verdict — architecture fit, scope creep check, plus the mandatory Automated Compliance Check. `.agents/roles/manager.md`.

**Manager**
Tier 2. Decomposes directives into tasks, delegates to Worker Coder, performs final validation. The project's quality gate. `.agents/roles/manager.md`.

**MEDIUM**
Mid-severity finding — logic error with workaround, missing edge case, convention violation. Manager decides whether to fix now or defer. Does not block `hadp:check`.

**Office**
The `.agents/` directory — governance, roles, workflow docs, handoffs, reports. Contrasted with **Factory**. Meant to be gitignored in downstream projects.

**PASS**
A verdict meaning all acceptance criteria are met, no RED_LINE violations, and (for Manager's final verdict) `hadp:check` exited clean. Terminal-positive outcome for a task.

**RED_LINES**
Hard, non-negotiable constraints no agent may violate (security, data integrity, code quality, architecture, agent behavior). Violating one is always at least HIGH severity. `.agents/RED_LINES.md`.

**Retry**
A loop-back to the same tier to fix an issue, bounded by a max count (3 for Coder, 2 for Tester) before forced escalation. `.agents/docs/workflow/states.md` → Retry Policy.

**Severity Level**
One of 🚫 BLOCKER / 🔴 HIGH / 🟡 MEDIUM / 🔵 LOW / ⚪ INFO — the single classification system used by every role for every finding. `.agents/docs/framework/severity-system.md`.

**Task Index**
Master registry of every task's status, owner, and linked artifacts across its full lifecycle. `.agents/docs/reports/task-index.md`.

**Tester Report**
The handoff artifact Worker Tester produces for Manager after independent verification. Contract: `tester_report`. Naming: `tester-to-mgr_TASK-XXX_YYYYMMDD.md`.

**Tier**
One of the 6 hierarchical levels in HADP (0, 0b, 1, 2, 3a, 3b), each with a distinct, non-overlapping mandate. `.agents/docs/framework/framework-overview.md` → Tier Model.

**Trigger**
A named, defined event (T0–T9, T5b) that causes a transition between tiers or states, with a required condition and artifact. `.agents/docs/workflow/triggers.md`.

**Workbook**
Per-role archive of completed reports (`.agents/docs/workbook/{role}/`), kept for audit history after a handoff packet's active cycle ends.

**Worker Coder**
Tier 3a. Implements code from a Manager handoff. Never tests its own work. `.agents/roles/worker-coder.md`.

**Worker Tester**
Tier 3b. Independently verifies Worker Coder's implementation — must be a separate session. `.agents/roles/worker-tester.md`.

---

## References

- Defined in: `.agents/docs/framework/glossary.md`
- Related: `.agents/docs/framework/framework-overview.md`
