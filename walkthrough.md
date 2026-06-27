# Core Concept Preserved

The 5-role hierarchy with separation of concerns:

| Role | Model Profile | Core Job |
|---|---|---|
| **Analyst** (Tier 0) | Long-context, cheap (e.g., Gemini 3.5 Flash Extended) | Read codebase → produce briefs so Decision Maker saves tokens |
| **Decision Maker** (Tier 1) | High reasoning (e.g., Opus 4.8) | Governance, architecture decisions — never writes code |
| **Manager** (Tier 2) | Balanced (e.g., GPT 5.5) | Task decomposition, macro-validation — never writes code |
| **Worker Coder** (Tier 3a) | Coding-focused (e.g., GLM 5.2) | Implementation only — never tests own work |
| **Worker Tester** (Tier 3b) | Token-efficient (e.g., Gemini 3.5 Flash) | Cross-validation in separate session — eliminates confirmation bias |

## Key Design Decisions

1. **Generic placeholders** — all project-specific content replaced with `[e.g., ...]` brackets so users customize per project
2. **Role-based handoff prefixes** — `analyst-to-dm` instead of `gemini-to-opus` so the naming works regardless of which models you assign
3. **Model suggestions, not mandates** — each role suggests a model profile (e.g., "coding-focused") with an example, not a hard lock
