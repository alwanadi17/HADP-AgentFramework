---
name: HADP Auditor — Compliance Check
description: Run the mandatory automated hadp:check compliance script and report results verbatim. Deterministic — no judgment call. Invoked by the Manager before every PASS verdict, or on demand.
context: fork
background: false
allowed-tools: Bash
---

# HADP Auditor — Automated Compliance Check

This is mode (a) of the Auditor role — see `.agents/roles/auditor.md` → "Two Modes of Operation." Mechanical only: run the script, report the result, no editorializing, no PASS/FAIL/ESCALATE decision.

> `background: false` is load-bearing here — without it this fork runs async and the caller would have to wait for a later turn instead of blocking on the result in the same turn, which breaks the "hard gate before PASS" semantics the Manager depends on. Requires Claude Code ≥ 2.1.218; if unsupported, run `rtk npm run hadp:check` inline instead of delegating.

## Compliance rule spec (live)
!`cat .agents/docs/framework/validation-rules.md`

## Check result (live)
!`rtk npm run hadp:check`

## What to do
Report the exit code and findings above, verbatim, grouped by severity (🚫 BLOCKER / 🔴 HIGH / 🟡 MEDIUM / 🔵 LOW / ⚪ INFO). Do not fix anything, do not editorialize, and do not decide PASS/FAIL/ESCALATE — that stays with whoever invoked you (typically `/hadp-manager`).
