# Severity System — HADP Framework

> Single Source of Truth for all severity classifications across the framework.

## Standard Severity Levels

| Severity | Label | Meaning | Required Action | Response Time |
|---|---|---|---|---|
| 🚫 **BLOCKER** | Blocker | Cannot proceed. Process or code is broken. | Fix immediately before any next step | Immediate |
| 🔴 **HIGH** | High | Significant risk. Violates RED_LINES, breaks core functionality, or introduces security issue. | Must fix before merge | Before next gate |
| 🟡 **MEDIUM** | Medium | Moderate risk. Logic error, missing edge case, poor error handling, or convention violation. | Manager decides: fix now or defer | Before sprint end |
| 🔵 **LOW** | Low | Minor quality issue. Readability, naming, formatting, or nice-to-have improvement. | Can defer to next sprint | Anytime |
| ⚪ **INFO** | Info | Observation only. No action required. Not a problem, but worth noting. | No action needed | — |

## Where to Use

| Role | Context | Example |
|---|---|---|
| **Auditor** | Audit findings | `🔴 HIGH: ADR-003 lacks rollback plan` |
| **Tester** | Test report findings | `🟡 MEDIUM: Missing null check on API response` |
| **Manager** | Validation report | `🚫 BLOCKER: Build failed, cannot proceed` |
| **Coder** | Completion notes | `🔵 LOW: Variable name could be clearer` |
| **Decision Maker** | ADR impact assessment | `🟡 MEDIUM: New dependency increases bundle size` |

## Decision Matrix for Severity Assignment

### Is it a BLOCKER?
- [ ] Does it prevent the next step from starting? → **BLOCKER**
- [ ] Is a required artifact missing or invalid? → **BLOCKER**
- [ ] Does the build fail? → **BLOCKER**

### Is it HIGH?
- [ ] Does it violate a RED_LINE? → **HIGH**
- [ ] Does it expose a security vulnerability? → **HIGH**
- [ ] Does it break core functionality? → **HIGH**
- [ ] Is data integrity at risk? → **HIGH**

### Is it MEDIUM?
- [ ] Is it a logic error with a known workaround? → **MEDIUM**
- [ ] Is an edge case not handled? → **MEDIUM**
- [ ] Does it violate coding conventions? → **MEDIUM**
- [ ] Is error handling missing or weak? → **MEDIUM**

### Is it LOW?
- [ ] Is it a readability or naming issue? → **LOW**
- [ ] Is it a formatting or style inconsistency? → **LOW**
- [ ] Is it a nice-to-have improvement? → **LOW**

### Is it INFO?
- [ ] Is it an observation with no action needed? → **INFO**
- [ ] Is it a suggestion for future consideration? → **INFO**

## Standard Report Format

When reporting findings, use this format:

```
{severity_emoji} {SEVERITY_LABEL}: {finding description}
- File: {path:line}
- Category: {category}
- Recommendation: {suggested fix}
```

### Example

```
🔴 HIGH: API key exposed in client-side code
- File: src/services/api.ts:15
- Category: Security
- Recommendation: Move to server-side environment variable

🟡 MEDIUM: Missing loading state on user list
- File: src/components/UserList.tsx:42
- Category: UX
- Recommendation: Add skeleton loader while fetching
```

## References

- Defined in: `.agents/docs/framework/severity-system.md`
- Used by: Auditor, Tester, Manager, Coder, Decision Maker
- Related: `.agents/docs/framework/artifact-contracts.md`
