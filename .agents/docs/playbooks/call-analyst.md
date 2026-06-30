# 🔍 Playbook: Calling the Analyst (Tier 0)

## When to Call

Call the Analyst when you need **deep research, codebase mapping, or structured summaries** before making decisions. The Analyst is optional — skip if the task is well-understood.

### Typical Triggers
- New feature request where the existing codebase is unfamiliar
- Need to understand data flow, dependencies, or architecture before planning
- Investigate a bug's root cause across multiple files
- Research third-party libraries or APIs for compatibility
- Audit a section of the codebase for patterns and conventions

### When NOT to Call
- Task is simple and well-understood — skip to Decision Maker directly
- Only a small, isolated change is needed
- The relevant code area was already analyzed in a recent Analyst Brief

---

## Required Context to Provide

```
1. Research question / directive (specific — e.g., "Map the data flow from API to UI")
2. Scope boundaries (which files/directories to investigate)
3. Any existing briefs or docs that are relevant
4. CONSTITUTION.md, RED_LINES.md, ARCHITECTURE.md (current)
```

---

## Invocation Prompt Template

```markdown
## Analyst Activation

### Directive
[What specific question or research task]

### Scope
- **Files/Directories to investigate**: [path list]
- **Depth**: [High-level overview | Detailed line-by-line]

### Context
- Project: [project name]
- Existing docs: [list relevant docs]
- Relevant area AGENTS.md: [path if applicable]

### Expected Output
1. Structured Analyst Brief → `.agents/docs/workbook/analyst/YYYYMMDD_TASK-XXX_brief.md`
2. Verbal summary of findings
3. Risks, blind spots, and constraints identified

### Handoff Target
→ **Decision Maker** (Tier 1)
```

---

## What the Analyst Will Produce

| Output | Format | Purpose |
|---|---|---|
| Analyst Brief | Structured markdown (per workbook template) | Source of truth for Decision Maker |
| Verbal Summary | Chat response | Quick understanding for Human |

## After the Analyst Finishes

1. Review the Analyst Brief
2. If satisfied → forward to **Decision Maker** with the brief as context
3. If the brief missed something → ask follow-up questions, then forward

---

## Example

```
## Analyst Activation

### Directive
Map the authentication flow from login page to session management.
Identify all files involved, data flow paths, and potential security gaps.

### Scope
- **Files/Directories**: src/auth/, src/pages/Login.tsx, src/api/session.ts
- **Depth**: Detailed line-by-line

### Context
- Project: MyApp
- Existing docs: ARCHITECTURE.md, src/auth/AGENTS.md

### Expected Output
1. Analyst Brief → `.agents/docs/workbook/analyst/20260630_TASK-001_brief.md`
2. Auth flow diagram (ASCII)
3. Security risk assessment

### Handoff Target
→ Decision Maker