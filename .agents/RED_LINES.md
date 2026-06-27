# 🚫 Red Lines — Hard Constraints

These are **absolute boundaries** that no agent may violate. Violations trigger immediate halt and escalation.

---

## Security
- **NEVER** expose API keys, secrets, or credentials in client-side code or commit history.
- **NEVER** disable security protections without Decision Maker approval.

## Data Integrity
- **NEVER** delete or overwrite production data without a backup or rollback path.
- **NEVER** modify database schemas without documenting the change.

## Code Quality
- **NEVER** commit code that fails the build command.
- **NEVER** introduce `console.log` in production code.
- **NEVER** bypass linter errors without documented reason.

## Architecture
- **NEVER** add new dependencies without documenting rationale in an ADR.
- **NEVER** modify deployment config without Decision Maker approval.
- **NEVER** break existing public URLs/APIs.

## Agent Behavior
- **NEVER** allow a Worker to modify governance files.
- **NEVER** allow unlimited retry loops. Max 3 retries, then escalate.
- **NEVER** pass raw conversation history between agents.
- **NEVER** let a Coder test their own work. Worker Tester must be a separate session.
