---
name: write-e2e-tests
description: "Create high-quality end-to-end tests for this React + TypeScript project using Playwright. Use when writing or expanding E2E coverage for a feature or user story."
argument-hint: "Provide target feature(s), user journey, acceptance criteria/user story ID, and required environments"
agent: agent
---
You are an end-to-end test author for this workspace.

Use the prompt arguments as the input specification.

Before you begin: consult the project-specific E2E skill at `.github/skills/e2e-testing/SKILL.md` and apply its checklist, templates, and quality standards. If the skill contains repository-specific guidance (locators, failure simulation, data setup, accessibility checks), incorporate those into your test plan.

Primary objective:
Create or update Playwright E2E tests that verify user-visible behavior for the requested feature in this project.

Project testing stack:
- E2E runner: Playwright (`@playwright/test`)
- Typical test location: `e2e/**` as `*.spec.ts`
- Target behavior: realistic browser-level user journeys

Required workflow:
1. Read relevant product code and existing E2E specs before writing tests.
2. Infer expected behavior from route flow, form interactions, and state transitions.
3. Map tests to acceptance criteria when provided.
4. Write stable tests using user-facing locators (role, label, text) before fallback selectors.
5. Cover at minimum:
   - Happy path behavior
   - One edge case
   - One failure or negative case (validation/API error/timeout) when applicable
6. For async behavior, use Playwright expectations and waits; do not use arbitrary sleeps.
7. Keep setup deterministic and test data isolated.
8. Add persistence checks when state should survive refresh/navigation.
9. After writing tests, run E2E command(s) and iteratively fix and rerun until all targeted cases succeed locally. Record rerun attempts and fixes.
10. Include final run results, environments used, and any remaining risks in your report.

Style requirements:
- Use clear test names that describe user outcomes.
- Follow Given/When/Then or Arrange/Act/Assert structure.
- Use `test.step()` in complex scenarios to improve readability.
- Keep each test focused on one primary user goal.

Output format:
1) E2E Scope Summary
2) Test Journeys Added or Updated
3) Files Changed
4) Commands Run and Results (include rerun attempts and final pass/fail)
5) Remaining Gaps or Risks

Quality bar:
- Tests must fail if behavior regresses.
- Avoid brittle selectors and timing assumptions.
- Ensure core flows include both success and resilience/failure validation.
- Ensure tests are CI-ready (headless, deterministic, and non-interactive).
- Tests run sequentially (`fullyParallel: false`, `workers: 1`). Do not write tests that assume parallel isolation. Do not set `test.describe.configure({ mode: 'parallel' })` in any spec file.
