# Handoffs Directory

Active handoff packets between agent tiers.

- **Active packets**: Files in this directory
- **Completed packets**: Move to `archive/` after task cycle completes

## Naming Convention

```
{direction}_{task-id}_{YYYYMMDD}.md
```

Prefixes: `analyst-to-dm`, `dm-to-mgr`, `mgr-to-coder`, `coder-to-tester`, `tester-to-mgr`, `tester-to-coder`, `mgr-to-dm`

See `.agents/docs/handoff-protocol.md` for full protocol.
