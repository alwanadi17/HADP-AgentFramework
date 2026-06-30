# Decision Quality Rubric — HADP Framework

> Objective evaluation parameters for the Auditor to assess architectural and governance decisions made by the Decision Maker.

## Overview

Every decision in HADP should be evaluated across **6 dimensions**. Each dimension is scored from **1 (poor)** to **5 (excellent)**. A quality decision scores **≥ 3 in all dimensions** or has documented trade-offs for low scores.

---

## The 6 Dimensions

### 1. Reversibility
How easy is it to undo this decision if it turns out to be wrong?

| Score | Criteria |
|---|---|
| 5 | Fully reversible — simple config change or feature flag toggle |
| 4 | Reversible with minor effort — rollback within one sprint |
| 3 | Reversible but costly — requires data migration or refactor |
| 2 | Difficult to reverse — affects multiple systems or data integrity |
| 1 | Irreversible — changes core data model, public API contract, or security boundary |

**Auditor question**: *"If we change our mind next week, what does it cost to undo this?"*

---

### 2. Blast Radius
What is the impact scope if this decision fails?

| Score | Criteria |
|---|---|
| 5 | Isolated to a single module or component |
| 4 | Affects a single feature or page |
| 3 | Affects multiple features within the same domain |
| 2 | Affects cross-domain interactions or multiple teams |
| 1 | Affects the entire system, all users, or external integrations |

**Auditor question**: *"If this goes wrong, which parts of the system break?"*

---

### 3. Coupling
Does this decision increase or decrease dependency between modules?

| Score | Criteria |
|---|---|
| 5 | Reduces existing coupling — improves separation of concerns |
| 4 | No change to coupling — neutral impact |
| 3 | Adds minor coupling — one new import or interface dependency |
| 2 | Adds significant coupling — new shared state or cross-module dependency |
| 1 | Creates tight coupling — modules cannot be developed or tested independently |

**Auditor question**: *"Does this make the system harder or easier to change in the future?"*

---

### 4. Operational Cost
What is the ongoing maintenance and infrastructure cost?

| Score | Criteria |
|---|---|
| 5 | Reduces operational cost — removes dependencies, simplifies deployment |
| 4 | No change to operational cost |
| 3 | Adds minor cost — one new dependency, small increase in build time |
| 2 | Adds significant cost — new service, new infrastructure, new team coordination |
| 1 | Adds unsustainable cost — requires dedicated ops, new platform, or ongoing manual process |

**Auditor question**: *"What does this decision cost us every month in time, money, or attention?"*

---

### 5. Security
Does this decision introduce new attack surfaces or risks?

| Score | Criteria |
|---|---|
| 5 | Improves security posture — removes attack surface, adds validation |
| 4 | No change to security — neutral |
| 3 | Minor risk — new input surface but properly validated |
| 2 | Significant risk — new API endpoint, data exposure, or auth bypass potential |
| 1 | Critical risk — violates RED_LINES, exposes credentials, or allows unauthorized access |

**Auditor question**: *"Does this make the system more or less secure than before?"*

---

### 6. Simplicity
Is this the simplest solution that adequately solves the problem?

| Score | Criteria |
|---|---|
| 5 | Simplest possible solution — minimal code, no over-engineering |
| 4 | Simple with minor complexity — one abstraction layer |
| 3 | Moderate complexity — multiple abstractions but justified |
| 2 | Over-engineered — more layers or patterns than the problem requires |
| 1 | Unnecessarily complex — introduces patterns, frameworks, or abstractions without clear benefit |

**Auditor question**: *"Is there a simpler way to achieve the same outcome?"*

---

## Scoring Template

```markdown
## Decision Quality Assessment

| Dimension | Score (1-5) | Notes |
|---|---|---|
| Reversibility | | |
| Blast Radius | | |
| Coupling | | |
| Operational Cost | | |
| Security | | |
| Simplicity | | |
| **Average** | | |

### Verdict
- ✅ **PASS** — All dimensions ≥ 3, or low scores have documented trade-offs
- ⚠️ **CONCERNS** — One dimension ≤ 2 without adequate mitigation
- ❌ **FAIL** — Multiple dimensions ≤ 2, or Security = 1

### Recommendations
[Specific actions to improve low-scoring dimensions]
```

---

## Usage

### When to Use
- **Before** an ADR is finalized (proactive review)
- **After** a Decision Maker produces a governance change
- **During** escalation review (Manager → Decision Maker)
- **Periodic** audit of past decisions

### Who Uses It
| Role | How |
|---|---|
| **Auditor** | Primary user — evaluates decisions using this rubric |
| **Decision Maker** | Self-assessment before publishing ADRs |
| **Manager** | Quick check before escalating concerns |

### Integration
- Rubric output goes to: `.agents/docs/workbook/auditor/`
- Referenced in: `auditor.md` behavior rules
- Related: `.agents/docs/framework/severity-system.md`

## References

- Defined in: `.agents/docs/framework/decision-quality-rubric.md`
- Used by: Auditor, Decision Maker, Manager
- Related: `.agents/docs/framework/artifact-contracts.md` (see `decision_record` contract)