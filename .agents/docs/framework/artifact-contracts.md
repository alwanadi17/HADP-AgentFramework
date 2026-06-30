# Artifact Contracts — HADP Framework

> Formal validation contracts for every artifact type in the HADP pipeline. Every artifact MUST satisfy its contract to be considered valid.

## Contract Format

Each artifact contract defines:

```yaml
artifact_type: <type_name>
description: <what this artifact is for>
produced_by: <role>
consumed_by: <role>
required_fields:
  - <field_name> — <why it's required>
optional_fields:
  - <field_name>
valid_statuses:
  - <status_value>
validation_rules:
  - <rule_description>
```

---

## Contract: Analyst Brief

```yaml
artifact_type: analyst_brief
description: Research findings and codebase mapping for Decision Maker
produced_by: Analyst
consumed_by: Decision Maker
required_fields:
  - task_id — must reference a valid TASK-XXX
  - date — when the brief was created
  - scope — what was analyzed
  - key_findings — what was discovered
  - recommendations — fact-based suggestions
valid_statuses:
  - DRAFT
  - FINAL
validation_rules:
  - No placeholder text `[` or `TODO` allowed in FINAL status
  - Must reference specific file paths where applicable
```

---

## Contract: Audit Report

```yaml
artifact_type: audit_report
description: Compliance and decision review findings
produced_by: Auditor
consumed_by: Human, Decision Maker, Manager
required_fields:
  - request — what was audited
  - date — when the audit was performed
  - scope — what was reviewed
  - summary — high-level verdict
  - findings — list with severity classification
valid_statuses:
  - DRAFT
  - FINAL
validation_rules:
  - Every finding MUST have a severity level (see severity-system.md)
  - No BLOCKER findings allowed in FINAL without resolution plan
```

---

## Contract: Decision Record (ADR)

```yaml
artifact_type: decision_record
description: Architecture Decision Record for significant choices
produced_by: Decision Maker
consumed_by: Manager, Human
required_fields:
  - adr_number — format ADR-XXX
  - title — descriptive title
  - status — Proposed / Accepted / Deprecated / Superseded
  - date — when the decision was made
  - context — what motivated the decision
  - decision — what was decided
  - rationale — why this was chosen
valid_statuses:
  - Proposed
  - Accepted
  - Deprecated
  - Superseded
validation_rules:
  - Accepted decisions MUST have consequences documented (positive + negative)
  - Superseded decisions MUST reference the superseding ADR
```

---

## Contract: Manager Task Handoff

```yaml
artifact_type: manager_handoff
description: Task assignment packet from Manager to Worker Coder
produced_by: Manager
consumed_by: Worker Coder
required_fields:
  - task_id — TASK-XXX
  - title — short description
  - assigned_to — Worker Coder → Worker Tester
  - status — TODO / CODING / TESTING / IN_REVIEW / DONE / BLOCKED
  - description — what needs to happen and why
  - acceptance_criteria — list of specific, testable criteria
  - files_to_modify — list of files with descriptions
valid_statuses:
  - TODO
  - CODING
  - TESTING
  - IN_REVIEW
  - DONE
  - BLOCKED
validation_rules:
  - acceptance_criteria MUST have at least 2 criteria
  - files_to_modify MUST include file paths
  - Build passes and No RED_LINE violations MUST be in acceptance criteria
```

---

## Contract: Coder Completion

```yaml
artifact_type: coder_completion
description: Implementation handoff from Worker Coder to Worker Tester
produced_by: Worker Coder
consumed_by: Worker Tester
required_fields:
  - task_id — TASK-XXX
  - status — IMPLEMENTED / PARTIAL / BUILD_FAILED
  - changes_made — list of files modified or created
  - build_result — PASS or FAIL with error output if failed
  - implementation_notes — key decisions and edge cases
  - red_line_self_check — checklist of RED_LINE compliance
valid_statuses:
  - IMPLEMENTED
  - PARTIAL
  - BUILD_FAILED
validation_rules:
  - changes_made MUST include file paths and line numbers
  - BUILD_FAILED status MUST include error output
  - red_line_self_check MUST be completed (no empty checkboxes)
```

---

## Contract: Tester Report

```yaml
artifact_type: tester_report
description: Verification results from Worker Tester to Manager
produced_by: Worker Tester
consumed_by: Manager
required_fields:
  - task_id — TASK-XXX
  - verdict — PASS / FAIL / CONCERNS
  - build_verification — build + lint results
  - acceptance_criteria_verification — per-criterion status with evidence
  - red_line_audit — systematic check of all RED_LINE constraints
valid_statuses:
  - PASS
  - FAIL
  - CONCERNS
validation_rules:
  - FAIL verdict MUST include specific findings with severity levels
  - CONCERNS verdict MUST explain what the concerns are
  - Build MUST be run independently (not copied from Coder report)
```

---

## Contract: Manager Validation Report

```yaml
artifact_type: manager_validation
description: Final macro-validation before Human review
produced_by: Manager
consumed_by: Human
required_fields:
  - task_id — TASK-XXX
  - coder_completion_ref — link to coder handoff
  - tester_report_ref — link to tester handoff
  - validation_checklist — completed checklist
  - final_verdict — PASS / FAIL / ESCALATE
valid_statuses:
  - PASS
  - FAIL
  - ESCALATE
validation_rules:
  - PASS requires all validation checklist items checked
  - ESCALATE requires escalation reason documented
  - Must reference both Coder and Tester handoff packets
```

---

## Contract: Sprint Review

```yaml
artifact_type: sprint_review
description: Aggregate report of sprint accomplishments
produced_by: Manager
consumed_by: Human
required_fields:
  - sprint — sprint identifier
  - date — when the review was created
  - summary — high-level overview
  - tasks_completed — list of completed tasks with verdicts
valid_statuses:
  - DRAFT
  - FINAL
validation_rules:
  - All tasks in the sprint MUST be accounted for (completed, in progress, or blocked)
  - Blockers MUST have reasons documented
```

---

## Contract: Audit Trail Entry

```yaml
artifact_type: audit_trail_entry
description: Log entry for significant events
produced_by: Manager, Auditor
consumed_by: Human, Auditor
required_fields:
  - timestamp — YYYY-MM-DD HH:MM
  - type — DECISION / STATE_CHANGE / ESCALATION / FAILURE / COMPLETION / MERGE
  - agent — who performed the action
  - description — what happened
valid_types:
  - DECISION
  - STATE_CHANGE
  - ESCALATION
  - FAILURE
  - COMPLETION
  - MERGE
validation_rules:
  - Every COMPLETION must reference the task ID
  - Every ESCALATION must reference the escalation handoff packet
```

---

## Validation Flow

```
Artifact created → Self-check against contract → Handoff to next role
                           │
                    ┌──────┴──────┐
                    ▼             ▼
              All required    Missing fields
              fields present  or invalid status
                    │             │
                    ▼             ▼
              Proceed to     Return for fixes
              next role      (or Auditor review)
```

## References

- Defined in: `.agents/docs/framework/artifact-contracts.md`
- Used by: All roles producing artifacts
- Validation: Self-check by producer, spot-check by Auditor
- Related: `.agents/docs/framework/severity-system.md`