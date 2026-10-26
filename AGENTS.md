# HADP — Agent Manual

> Read this at the start of every session. It's the whole framework.

HADP splits work across three roles so an expensive model does the thinking and cheaper models do the doing. Roles never share a chat — they hand off through **`PLAN.md`**.

| Role | Model profile | Does | Never |
|---|---|---|---|
| **Planner** | High-reasoning (expensive) | Researches, decides, writes tasks into `PLAN.md`, writes ADRs for big decisions | Writes production code |
| **Coder** | Coding-focused | Implements one task, makes build/test/lint pass, fills in *Coder notes* | Changes scope, edits `.agents/`, tests its own work as the final word |
| **Tester** | Cheap, token-efficient | Independently verifies tasks in `REVIEW`, fills in *Verdict* | Writes or fixes code |

Role details: `.agents/roles/{planner,coder,tester}.md`

## Files

| File | What it is |
|---|---|
| `AGENTS.md` | This manual |
| `PLAN.md` | Checklist (progress at a glance) + task details — the only handoff channel between roles |
| `.agents/PROJECT.md` | Project identity, tech stack, commands, red lines — read before every task |
| `.agents/roles/*.md` | One file per role, including a copy-paste prompt for non-Claude models |
| `.agents/decisions/` | ADRs — optional, only for decisions that are hard to reverse |

## The loop

```
Human ──► Planner ──► PLAN.md (TODO)
                         │
                      Coder: implement, build + test + lint pass ──► REVIEW
                         │
                      Tester (separate session): verify
                         ├─ PASS ──► DONE ──► Human reviews & merges
                         ├─ FAIL ──► TODO (with reasons) ──► Coder again
                         └─ 3rd FAIL ──► BLOCKED ──► Planner rethinks the task
```

**Statuses:** `TODO` → `DOING` → `REVIEW` → `DONE`, or `BLOCKED`.

Tester runs whenever you call it and checks every task in `REVIEW` — one at a time or a whole batch, your choice.

## Rules for every role

- Read `.agents/PROJECT.md` (especially **Red Lines**) before touching anything.
- Only edit your own fields in `PLAN.md` (see the task format there).
- When you change a task's *Status*, update its line in the `PLAN.md` Checklist in the same edit — that's what the human reads.
- Coder and Tester must run in **separate sessions** — the Tester never sees the Coder's chat.
- If something is unclear or out of scope, set the task to `BLOCKED` with a one-line reason instead of guessing.
- Report honestly. A failed build or test is written down, not hidden.

## Claude Code

| Command | Role |
|---|---|
| `/hadp-init` | One-time setup in a freshly copied project |
| `/hadp-planner` | Planner |
| `/hadp-coder TASK-001` | Coder |
| `/hadp-tester` | Tester (runs isolated from the current chat) |

Other agents (Gemini, GPT, GLM, …): paste the prompt at the bottom of the role file.
