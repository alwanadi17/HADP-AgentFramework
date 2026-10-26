# Project — [PROJECT NAME]

> Every role reads this before every task. Keep it short and current.

## What this is

[One paragraph: what the project does and who it's for.]

## Tech stack

- **Language / framework**: [e.g. TypeScript + React]
- **Data**: [e.g. PostgreSQL]
- **Deployment**: [e.g. Vercel]

## Commands

```bash
[npm run build]   # must pass before a task goes to REVIEW
[npm run test]
[npm run lint]
[npm run dev]
```

## Structure

```
src/        # [what lives here]
```

## Conventions

- [e.g. Follow the patterns in neighbouring files.]

## Red lines

Breaking one of these is an automatic FAIL.

- Never commit secrets, API keys or credentials.
- Never mark a task `REVIEW` if build, tests or lint fail.
- Never add a dependency without a one-line reason in *Coder notes* (or an ADR if it's significant).
- Never delete or overwrite data without a rollback path.
- Never break an existing public URL or API without a Planner decision.
- Coder and Tester never edit files under `.agents/`.
- [Project-specific red line]
