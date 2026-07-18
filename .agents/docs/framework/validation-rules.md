# Validation Rules — `hadp:check`

> Spec for `scripts/hadp-check.js`, the automated compliance check that gates the Manager's PASS verdict at `IN_REVIEW → DONE` (see `.agents/docs/workflow/states.md`). Every rule below maps to an existing manual checklist item — this script doesn't add new requirements, it enforces ones that already existed in `manager.md` and `auditor.md` but were previously self-reported.

## Why This Exists

Compliance checking used to be fully manual: the Manager's "Artifact Contract Validation" checklist (`.agents/roles/manager.md`) and the Auditor's "Handoff Packet Audit" checklist (`.agents/roles/auditor.md`) both relied on an LLM reading files and eyeballing them. `hadp:check` automates the deterministic subset of those checks so they can't be skipped or misjudged.

## Scope

Scans `.agents/handoffs/*.md` (recursively, excluding any `archive/` subdirectory and `README.md`) plus cross-checks `PLAN.md` against `.agents/docs/reports/task-index.md`.

## Rules

### 1. Naming Convention
**Contract**: `.agents/docs/handoff-protocol.md` naming convention — `{direction}_{task-id}_{YYYYMMDD}.md`
**Severity**: 🚫 BLOCKER
**Rule**: Every file in `.agents/handoffs/` (except `README.md`) must match `^[a-z]+-to-[a-z]+_TASK-\d+_\d{8}\.md$`.

### 2. Required Fields Present
**Contract**: `.agents/docs/framework/artifact-contracts.md` — `required_fields` per artifact type
**Severity**: 🚫 BLOCKER
**Rule**: Based on the filename's `{direction}` prefix, the artifact type is inferred (e.g. `mgr-to-coder` → `manager_handoff`) and each required field must appear in the document (matched via keyword/regex alias, since these are markdown documents, not YAML). See `CONTRACTS` / `FIELD_ALIASES` in `scripts/hadp-check.js` for the exact mapping.
**Known limitation**: alias matching is a heuristic (substring/keyword search), not a structured parse — it can produce false negatives if a field is described in unusual wording. Treat a BLOCKER here as "likely missing," and confirm manually if it looks wrong.

### 3. No Leftover Placeholders
**Contract**: `artifact-contracts.md` → `analyst_brief` validation_rules ("No placeholder text `[` or `TODO` allowed"), generalized to all artifact types per the Auditor's checklist ("No placeholder text remaining?")
**Severity**: 🔴 HIGH
**Rule**: Flags literal unfilled template tokens: `TASK-XXX`, `ADR-XXX`, `YYYY-MM-DD`, and generic `[Bracketed Placeholder]` text (excluding markdown links `[text](url)` and checkboxes `[ ]` / `[x]`).
**Known exception**: bare `TODO` is NOT flagged — it's a legitimate value for the `manager_handoff` `status` field (see `valid_statuses` in `artifact-contracts.md`). `[TODO]`-style bracketed placeholders are still caught by the generic bracket rule.

### 4. RED_LINE Self-Check Completeness
**Contract**: `artifact-contracts.md` → `coder_completion` validation_rules ("red_line_self_check MUST be completed (no empty checkboxes)")
**Severity**: 🚫 BLOCKER
**Rule**: Within a `RED_LINE`-titled section, any unchecked `- [ ]` box fails the check.

### 5. Task Index Consistency
**Contract**: `AGENTS.md` Task Index maintenance table — "Register new task: Manager, After creating task in PLAN.md"
**Severity**: 🟡 MEDIUM (warn-only, does not fail the check)
**Rule**: Every `### TASK-XXX:` heading in `PLAN.md` must have a corresponding `TASK-XXX` reference somewhere in `task-index.md`. This is checked one-directional (PLAN.md → task-index.md) to avoid false positives on archived/completed tasks that may no longer appear in `PLAN.md`.

## Severity → Exit Code

Per `.agents/docs/framework/severity-system.md`:

| Severity | Fails `hadp:check`? | Rationale |
|---|---|---|
| 🚫 BLOCKER | Yes | "Cannot proceed" |
| 🔴 HIGH | Yes | "Must fix before merge" |
| 🟡 MEDIUM | No (warn only) | "Manager decides: fix now or defer" |
| 🔵 LOW | No (warn only) | "Can defer to next sprint" |
| ⚪ INFO | No | Observation only |

## Not Covered (Out of Scope for v1)

- Judgment-based review (does the ADR's rationale actually make sense, does the code match the acceptance criteria) — stays with the Auditor's full on-demand review (`.agents/roles/auditor.md`), not automatable.
- Only runs as a single gate at `IN_REVIEW → DONE` (see `.agents/docs/workflow/states.md`). Earlier fail-fast gates (after Coder, after Tester) are a possible future extension, deliberately deferred per CONSTITUTION.md's "no premature optimization."

## References

- Script: `scripts/hadp-check.js`
- Command: `npm run hadp:check`
- Contracts enforced: `.agents/docs/framework/artifact-contracts.md`
- Severity levels: `.agents/docs/framework/severity-system.md`
- Gate definition: `.agents/docs/workflow/states.md`, `.agents/docs/workflow/triggers.md`
