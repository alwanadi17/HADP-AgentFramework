# 🔍 Playbook: Calling the Auditor (Tier 0b)

## When to Call

Call the Auditor when you need **independent compliance checks, decision reviews, or process assurance**. The Auditor is on-demand — only call when specific review is needed.

### Typical Triggers
- An ADR or governance change needs peer review before finalization
- A handoff packet looks incomplete or non-compliant
- Process violation suspected (tiers skipped, artifacts missing)
- Spot-check before a major release or milestone
- Disagreement between Manager and Worker that needs an objective third party
- Periodic compliance audit of workflow artifacts

### When NOT to Call
- The issue is a simple bug — that's Worker Tester's job
- The task is still in progress — wait for a natural break point
- You already know exactly what's wrong and how to fix it — just fix it

---

## Required Context to Provide

```
1. The specific artifact(s) to audit (handoff packet, ADR, governance doc, etc.)
2. Audit scope — what exactly should be checked
3. CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md (current)
4. Relevant workflow docs from `.agents/docs/workflow/`
5. Decision Quality Rubric (`.agents/docs/framework/decision-quality-rubric.md`) — if auditing decisions
6. Artifact Contracts (`.agents/docs/framework/artifact-contracts.md`) — if auditing handoffs
```

---

## Invocation Prompt Template

```markdown
## Auditor Activation

### Audit Request
[What artifact needs auditing — e.g., "Review ADR-003 for soundness"]

### Audit Type
- [ ] Handoff Packet Audit — format compliance, completeness, accuracy
- [ ] Decision Audit — ADR or governance change review
- [ ] Process Audit — workflow compliance, skipped tiers
- [ ] RED_LINE Compliance — check code or plan against RED_LINES

### Artifact to Audit
- **File(s)**: [path list]
- **Task ID**: [TASK-XXX if applicable]

### Context Provided
- [ ] CONSTITUTION.md (current)
- [ ] RED_LINES.md (current)
- [ ] ARCHITECTURE.md (current)
- [ ] Related handoff chain: [path list if applicable]

### Expected Output
1. Audit Report → `.agents/docs/workbook/auditor/YYYYMMDD_TASK-XXX_audit.md`
2. Verbal summary of findings
3. Severity-graded issue list (🚫 BLOCKER / 🔴 HIGH / 🟡 MEDIUM / 🔵 LOW / ⚪ INFO)
4. For decision audits: rubric scores (1-5 per dimension)

### Handoff Target
→ **Human** or **Manager** (depending on context)
```

---

## What the Auditor Will Produce

| Output | Format | Purpose |
|---|---|---|
| Audit Report | Structured markdown (per workbook template) | Permanent record of findings |
| Verbal Summary | Chat response | Immediate understanding for Human |

## Special: Auditor for Manager Validation

When the Manager wants a second opinion on a task verdict (PASS/FAIL/CONCERNS), the Auditor can:

1. Verify the Tester's test report is complete and consistent
2. Check the Coder's completion packet for format compliance
3. Validate that all acceptance criteria were addressed
4. Confirm the task index was updated appropriately
5. Provide an independent recommendation

---

## Example

```
## Auditor Activation

### Audit Request
Review handoff packet mgr-to-coder_TASK-004_20260630.md for completeness.

### Audit Type
- [x] Handoff Packet Audit

### Artifact to Audit
- **File(s)**: .agents/handoffs/mgr-to-coder_TASK-004_20260630.md
- **Task ID**: TASK-004

### Context Provided
- [x] CONSTITUTION.md (current)
- [x] RED_LINES.md (current)
- [x] ARCHITECTURE.md (current)

### Expected Output
1. Audit Report → `.agents/docs/workbook/auditor/20260630_TASK-004_audit.md`
2. Severity-graded findings

### Handoff Target
→ Manager