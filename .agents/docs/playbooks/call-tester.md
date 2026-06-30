# 🧪 Playbook: Calling the Worker Tester (Tier 3b)

## When to Call

Call the Worker Tester when **code is implemented and ready for independent verification**. The Worker Tester must be a **separate session/conversation** from the Worker Coder to eliminate confirmation bias.

### Typical Triggers
- Worker Coder has submitted a completion packet with PASS build status
- Code needs independent verification against acceptance criteria
- A task is ready for RED_LINE audit before Manager validation
- Regression testing is needed after bug fixes

### When NOT to Call
- The code hasn't been built yet — Coder must build first
- You need implementation, not testing — that's Worker Coder's job
- You're the same session as the Worker Coder — testing must be independent
- The task is still in decomposition phase — go back to Manager first

---

## Required Context to Provide

```
1. Worker Coder's completion handoff packet
2. The original Manager's task handoff packet (with acceptance criteria)
3. RED_LINES.md
4. Relevant area-specific AGENTS.md
5. ARCHITECTURE.md (for data flow verification)
6. The actual changed files in the repo (post-Coder changes)
```

---

## Invocation Prompt Template

```markdown
## Worker Tester Activation

### Test Assignment
- **Task ID**: [TASK-XXX]
- **Assigned by**: Manager
- **Session**: [MUST be different from Coder's session]

### Coder's Status
- **Build**: [PASS / FAIL per Coder]
- **Files Changed**:
  - `path/to/file.ext` — [MODIFIED | NEW]
  - `path/to/file2.ext` — [MODIFIED | NEW]

### Context Provided
- [ ] Coder's completion handoff packet
- [ ] Manager's original task handoff packet
- [ ] RED_LINES.md (current)
- [ ] Relevant area AGENTS.md
- [ ] ARCHITECTURE.md (current)
- [ ] Actual file contents in repo

### Expected Output
1. Independent build and lint verification
2. Acceptance criteria verification (each criterion, with evidence)
3. Code quality review findings (with severity grading)
4. RED_LINE audit (each constraint, CLEAR or VIOLATION)
5. Adversarial test results
6. Verdict: ✅ PASS | ❌ FAIL | ⚠️ CONCERNS
7. Test handoff packet → `.agents/handoffs/tester-to-mgr_TASK-XXX_YYYYMMDD.md`
8. Test archive → `.agents/docs/workbook/tester/YYYYMMDD_TASK-XXX_test-report.md`

### Handoff Target
→ **Manager** (Tier 2) — for macro-validation
→ **Worker Coder** (Tier 3a) — if FAIL, with specific fixes needed
```

---

## What the Worker Tester Will Produce

| Output | Format | Purpose |
|---|---|---|
| Build + Lint Result | PASS / FAIL | Independent verification |
| Acceptance Criteria Check | Table with evidence | Each criterion PASS/FAIL |
| Code Quality Findings | Severity-graded list | Bugs, issues, concerns |
| RED_LINE Audit | Constraint-by-constraint check | Compliance verification |
| Adversarial Test Results | Scenario-based | Edge case testing |
| Verdict | PASS / FAIL / CONCERNS | Final recommendation |
| Test Handoff Packet | Structured markdown | Handover to Manager |
| Test Archive | Structured markdown | Permanent record in workbook |

## Worker Tester Flow

```
Phase 1: Build Verification → Run build + lint independently
Phase 2: Acceptance Criteria → Check each criterion with evidence
Phase 3: Code Quality Review → Logic errors, edge cases, error handling
Phase 4: RED_LINE Audit → Each constraint, CLEAR or VIOLATION
Phase 5: Adversarial Testing → Break scenarios, edge cases
Phase 6: Verdict → PASS | FAIL | CONCERNS
Phase 7: Report → Create test handoff packet + archive
```

### Rules for Fixes
- **Minor bugs** (typos, null checks, variable names, off-by-one): Fix directly and document in "Fixes Applied" section
- **Major bugs** (logic errors, wrong architecture, missing features, RED_LINE violations): Do NOT fix. Report and send back to Coder

---

## Example

```
## Worker Tester Activation

### Test Assignment
- **Task ID**: TASK-002
- **Assigned by**: Manager
- **Session**: [New session, separate from Coder]

### Coder's Status
- **Build**: PASS (verified)
- **Files Changed**:
  - `src/api/auth/login.ts` — [NEW]
  - `src/api/routes.ts` — [MODIFIED]

### Context Provided
- [x] Coder's completion packet (coder-to-tester_TASK-002_20260630.md)
- [x] Manager's handoff packet (mgr-to-coder_TASK-002_20260630.md)
- [x] RED_LINES.md
- [x] src/api/AGENTS.md
- [x] ARCHITECTURE.md

### Expected Output
1. Build: PASS
2. Acceptance criteria: all verified
3. Code quality: no issues found
4. RED_LINE audit: all CLEAR
5. Verdict: PASS
6. Test handoff → tester-to-mgr_TASK-002_20260630.md

### Handoff Target
→ Manager (Tier 2)