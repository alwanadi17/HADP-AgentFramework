# 📋 Playbook: Calling the Manager (Tier 2)

## When to Call

Call the Manager when you need **task decomposition, delegation, validation, and quality control**. The Manager is the bridge between strategy (Decision Maker) and execution (Workers). This is the most frequently activated role.

### Typical Triggers
- A decision or directive from Decision Maker needs to be decomposed into tasks
- An active task needs to be assigned to Worker Coder
- A Worker Coder's completion packet needs to be reviewed and forwarded to Tester
- A Worker Tester's test report needs macro-validation and a final verdict
- A task needs escalation to Decision Maker
- PLAN.md or Task Index needs updating

### When NOT to Call
- A decision needs to be made — call the Decision Maker instead
- The task is pure implementation — that's Worker Coder's job
- The task is pure testing — that's Worker Tester's job

---

## Required Context to Provide

```
1. Decision Maker's directive or ADR (what needs to be done)
2. CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md (current)
3. Current PLAN.md
4. Relevant area-specific AGENTS.md for the task domain
5. Any handoff packets already in the chain (if continuing workflow)
6. Task Index (`.agents/docs/reports/task-index.md`) — for status tracking
```

---

## Invocation Prompt Template

```markdown
## Manager Activation

### Activation Purpose
- [ ] **Task Decomposition** — break a directive into atomic tasks
- [ ] **Delegation** — assign a specific task to Worker Coder
- [ ] **Validation** — review Worker Tester's report and give verdict
- [ ] **Escalation** — route issue to Decision Maker

### Directive / Task
[Clear statement of what needs to be accomplished]

### Source
- **From**: [Human | Decision Maker | escalation]
- **Task ID**: [TASK-XXX if continuing existing task]
- **Related ADR**: [ADR-XXX if applicable]

### Context Provided
- [ ] Decision Maker's directive / ADR
- [ ] CONSTITUTION.md (current)
- [ ] RED_LINES.md (current)
- [ ] ARCHITECTURE.md (current)
- [ ] Current PLAN.md
- [ ] Relevant area AGENTS.md
- [ ] Worker handoff packets (if continuing workflow)

### Expected Output
1. Task plan / task decomposition
2. If delegating: handoff packet → `.agents/handoffs/mgr-to-coder_TASK-XXX_YYYYMMDD.md`
3. If validating: verdict (PASS / FAIL / ESCALATE) + validation report
4. Updated PLAN.md and Task Index as needed

### Handoff Target (depending on purpose)
→ **Worker Coder** (Tier 3a) — for implementation
→ **Decision Maker** (Tier 1) — for escalation
→ **Human** — for final review
```

---

## What the Manager Will Produce

| Output | Format | Purpose |
|---|---|---|
| Task Decomposition | Checklist in PLAN.md | Atomic task list |
| Coder Handoff | Structured packet | Task assignment for Worker Coder |
| Validation Report | Structured markdown | Macro-validation record |
| Escalation Packet | Structured handoff | Issue for Decision Maker |
| Task Index Update | Entry in task-index.md | Status tracking |

## Manager Flow

```
Phase 1: Receive → Decision Maker directive / Human request
Phase 2: Decompose → Break into atomic tasks (each ≤100 LOC)
Phase 3: Delegate → Create handoff packet for Worker Coder
Phase 4: Wait → Coder implements, Tester tests
Phase 5: Validate → Review Tester's report + Coder's output
Phase 6: Verdict → PASS (→ Human) | FAIL (→ Coder fix) | ESCALATE (→ DM)
Phase 7: Record → Update Task Index, PLAN.md
```

---

## Example

```
## Manager Activation

### Activation Purpose
- [x] Task Decomposition
- [x] Delegation

### Directive
Implement user authentication with JWT tokens: login endpoint,
token refresh, and protected route middleware.

### Source
- **From**: Decision Maker (ADR-002)
- **Task ID**: TASK-002, TASK-003, TASK-004

### Context Provided
- [x] ADR-002 (JWT auth architecture)
- [x] CONSTITUTION.md
- [x] RED_LINES.md
- [x] ARCHITECTURE.md
- [x] src/auth/AGENTS.md

### Expected Output
1. Task decomposition (3 tasks)
2. Handoff packet for TASK-002 (login endpoint) → Worker Coder
3. Updated PLAN.md

### Handoff Target
→ Worker Coder (Tier 3a)