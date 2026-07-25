# ⚡ Playbook: Calling the Worker Coder (Tier 3a)

## When to Call

Call the Worker Coder when a **task is decomposed and ready for implementation**. The Worker Coder is a "doing" role — pure implementation with no decision-making.

### Typical Triggers
- Manager has decomposed a task and created a handoff packet
- A task's acceptance criteria are clear and well-defined
- The code changes are within existing architectural bounds
- The build can be verified after implementation

### When NOT to Call
- The task needs architectural decisions — that's Decision Maker's job
- The task decomposition is incomplete or ambiguous — go back to Manager
- You need testing, not coding — that's Worker Tester's job
- The task would violate RED_LINES — escalate to Manager / Decision Maker first

---

## Required Context to Provide

```
1. The Manager's handoff packet (task assignment with acceptance criteria)
2. RED_LINES.md (must never violate)
3. Relevant area-specific AGENTS.md
4. ARCHITECTURE.md (for understanding data flow and patterns)
5. Current content of all files to be modified
6. Task ID (e.g., TASK-XXX)
```

---

## Invocation Prompt Template

```markdown
## Worker Coder Activation

### Task Assignment
- **Task ID**: [TASK-XXX]
- **Assigned by**: Manager [name/title]

### Acceptance Criteria
1. [Criterion 1 — specific, testable]
2. [Criterion 2]
3. [Build passes]

### Files to Modify
- `path/to/file.ext` — what changes
- `path/to/new-file.ext` — [NEW] what it does

### Constraints
- **Max LOC**: ~XX lines
- **Dependencies**: TASK-YYY (if any)
- **RED_LINES**: [relevant constraints]

### Context Provided
- [ ] Handoff packet (from Manager)
- [ ] RED_LINES.md (current)
- [ ] Relevant area AGENTS.md
- [ ] ARCHITECTURE.md (current)
- [ ] Existing file contents

### Expected Output
1. Code changes in specified files
2. Build verification result (PASS / FAIL)
3. `npm run hadp:check` self-check result (PASS / FAIL) — required before the task is considered ready to queue; see `.agents/roles/worker-coder.md` → Cadence Note
4. Completion handoff packet → `.agents/handoffs/coder-to-tester_TASK-XXX_YYYYMMDD.md`
5. Completion archive → `.agents/docs/workbook/coder/YYYYMMDD_TASK-XXX_completion.md`

Note: Worker Tester is not called per task anymore — completion packets accumulate in `.agents/handoffs/` and are picked up together at sprint end (see `.agents/docs/playbooks/call-tester.md`). Coder should proceed straight to the next task rather than waiting.

### Handoff Target
→ **Worker Tester** (Tier 3b)
```

---

## What the Worker Coder Will Produce

| Output | Format | Purpose |
|---|---|---|
| Code Changes | Modified/new files in repo | The actual implementation |
| Build Status | PASS / FAIL | Verification check |
| Completion Packet | Structured handoff | Handover to Tester |
| Completion Archive | Structured markdown | Permanent record in workbook |

## Worker Coder Flow

```
1. Receive handoff from Manager
2. Read RED_LINES.md
3. Read area-specific AGENTS.md
4. Read existing code in affected files
5. Implement changes
6. Run build
7. Create completion handoff packet
8. Run npm run hadp:check (self-check)
9. Queue for sprint-end batch → move on to the next task (don't wait for Tester)
```

---

## Example

```
## Worker Coder Activation

### Task Assignment
- **Task ID**: TASK-002
- **Assigned by**: Manager

### Acceptance Criteria
1. Login endpoint accepts email + password
2. Returns JWT token on success
3. Returns 401 on invalid credentials
4. Build passes

### Files to Modify
- `src/api/auth/login.ts` — [NEW] login handler
- `src/api/auth/__tests__/login.test.ts` — [NEW] tests (basic)
- `src/api/routes.ts` — add login route

### Constraints
- **Max LOC**: ~80 lines
- **Dependencies**: None
- **RED_LINES**: No secrets in client code, no hardcoded values

### Context Provided
- [x] Handoff packet (mgr-to-coder_TASK-002_20260630.md)
- [x] RED_LINES.md
- [x] src/api/AGENTS.md
- [x] ARCHITECTURE.md

### Expected Output
1. Code changes
2. Build: PASS
3. Completion packet → coder-to-tester_TASK-002_20260630.md

### Handoff Target
→ Worker Tester (Tier 3b)