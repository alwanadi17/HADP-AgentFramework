# Manager Report: TASK-XXX

## Metadata
- **Task**: TASK-XXX — [Title]
- **Date**: YYYY-MM-DD
- **Manager**: [Model Name]
- **Type**: Task Plan / Validation Report / Escalation

---

## SECTION A — Task Plan (use when decomposing)

### Decomposition
- [ ] Subtask 1 — description
- [ ] Subtask 2 — description
- [ ] Acceptance Criteria defined

### Dependencies
- TASK-YYY — prerequisite

### Files to Modify
- `path/to/file` — what changes
- `path/to/file` — [NEW] what it does

### Handoff Packet
- Created: `.agents/handoffs/mgr-to-coder_TASK-XXX_YYYYMMDD.md`

---

## SECTION B — Validation Report (use after Tester completes)

### Inputs Reviewed
- Coder completion: `.agents/handoffs/coder-to-tester_TASK-XXX_YYYYMMDD.md`
- Tester report: `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md`

### Macro Validation Checklist
- [ ] Tester verdict is PASS or CONCERNS?
- [ ] All acceptance criteria verified?
- [ ] RED_LINE audit — no violations?
- [ ] Architecture alignment — fits the bigger picture?
- [ ] No scope creep — only expected files modified?
- [ ] Both handoffs complete and structured?

### Final Verdict
**PASS** | **FAIL** | **ESCALATE**

### Notes for Human
[Summary of what was done, any concerns, next steps]

---

## SECTION C — Escalation (use when escalating to Decision Maker)

### Reason
- [ ] Coder failed 3x consecutively
- [ ] Coder/Tester disagreement
- [ ] Architectural change needed
- [ ] Ambiguous criteria

### Details
[What went wrong, what's needed]