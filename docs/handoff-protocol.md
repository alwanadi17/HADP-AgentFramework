# Handoff Protocol — Semi-Automated via Shared Files

## Overview

Agents communicate through **structured handoff packets** in `.agents/handoffs/`.

```
Analyst → does research, writes briefs to docs/research/
Decision Maker → reads briefs, writes governance to .agents/
Manager → reads governance, writes PLAN.md + task handoffs
Worker Coder → reads task handoff, writes code + completion packet
Worker Tester → reads completion, cross-validates, writes test report
Manager → reviews test report, macro-validates
Human → reviews, merges, triggers next cycle
```

## Naming Convention

```
{direction}_{task-id}_{YYYYMMDD}.md
```

| Prefix | Direction |
|---|---|
| `analyst-to-dm` | Analyst → Decision Maker (research handoff) |
| `dm-to-mgr` | Decision Maker → Manager |
| `mgr-to-coder` | Manager → Worker Coder |
| `coder-to-tester` | Worker Coder → Worker Tester |
| `tester-to-mgr` | Worker Tester → Manager |
| `tester-to-coder` | Worker Tester → Worker Coder (FAIL) |
| `mgr-to-dm` | Manager → Decision Maker (escalation) |

## Workflow

0. **Human → Analyst** (Optional): Provide vague requirement for deep research
1. **Human → Decision Maker**: Provide feature request + governance docs
2. **Manager → PLAN.md + Handoff**: Task decomposition + assignment
3. **Human → Worker Coder**: Provide task handoff + RED_LINES + area AGENTS.md + code
4. **Worker Coder → Code + Packet**: Implementation + completion packet
5. **Human → Worker Tester** (different session): Provide Coder's packet + acceptance criteria + code
6. **Worker Tester → Test Report**: Verdict: PASS / FAIL / CONCERNS
7. **Human → Manager**: Provide Tester's report for final validation
8. **Manager → Final Verdict**: PASS / FAIL / ESCALATE
9. **Done**: Archive handoffs, mark PLAN.md, proceed
