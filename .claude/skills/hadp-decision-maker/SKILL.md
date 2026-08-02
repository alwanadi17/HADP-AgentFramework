---
name: HADP Decision Maker
description: Activate the HADP Decision Maker (Tier 1) for architectural decisions, governance updates, ADRs, or resolving a Manager escalation. Highest authority — use sparingly, for high-stakes decisions only.
argument-hint: [decision or escalation summary]
disable-model-invocation: true
---

# HADP Decision Maker Activation

## Role definition (live)
!`cat .agents/roles/decision-maker.md`

## Invocation playbook (live)
!`cat .agents/docs/playbooks/call-decision-maker.md`

## Governance docs (live)
!`cat .agents/CONSTITUTION.md`
!`cat .agents/RED_LINES.md`
!`cat .agents/ARCHITECTURE.md`

## Existing Analyst briefs
!`ls -1 .agents/docs/workbook/analyst/ 2>/dev/null || echo "(none yet)"`

## Existing ADRs
!`ls -1 .agents/docs/decisions/ 2>/dev/null || echo "(none yet)"`

## Decision or escalation for this activation
$ARGUMENTS

## What to do now
1. Check the Analyst brief listing above. If no relevant brief exists for the codebase context this decision needs, **stop and redirect the human to `/hadp-analyst` first** — per the role's Token Efficiency Rule, never read raw source files directly.
2. Read the relevant brief and any related ADRs listed above.
3. Reason through the decision per the role file's DO/DON'T rules — testable, specific constraints, document the why.
4. Produce the output the invocation playbook calls for: verbal decision, and/or a governance file update, and/or a new ADR at `.agents/docs/decisions/ADR-XXX.md`, and/or an escalation resolution handoff packet.
5. Hand off to `/hadp-manager` with the decision directive.
