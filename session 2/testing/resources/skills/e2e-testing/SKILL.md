````markdown
---
name: e2e-testing
description: Generic Playwright end-to-end testing skill for the Construction Task Tracker repository. Provides production-grade standards, templates, scenario coverage, and CI guidance for stable E2E automation.
---

# E2E Testing Skill — Construction Task Tracker

This skill is a generic, reusable reference for writing end-to-end tests in this repository using Playwright. It focuses on deterministic, maintainable, production-standard browser tests that validate user-visible behavior and critical business journeys.

## When to Use This Skill
- Adding E2E coverage for new features or user stories.
- Creating regression coverage for critical workflows (task lifecycle, dashboard updates, navigation).
- Verifying resilience behavior (error handling, retry, rollback), accessibility, and cross-viewport sanity.

## Goals
- Ensure high-confidence release gates through realistic user-flow validation.
- Keep E2E tests deterministic, fast enough for CI, and easy to maintain.
- Cover core scenarios: happy path, edge cases, failure handling, and recovery.

## Tools & Project Conventions
- E2E framework: Playwright (`@playwright/test`).
- Recommended test root: `e2e/`.
- File naming: `<feature>.spec.ts`.
- Locator strategy: `getByRole`, `getByLabel`, `getByText`; use `getByTestId` as fallback.
- Artifact policy: capture trace/screenshots/videos on failure.

## Skill Checklist (Actionable)
- [ ] Define scenario scope with Given/When/Then before writing code.
- [ ] Use deterministic seed data or uniquely generated entities.
- [ ] Prefer accessible, user-facing locators over CSS chains.
- [ ] Cover minimum for each feature: happy path + one edge case + one failure path.
- [ ] Validate persistence where applicable (reload/navigation retains expected state).
- [ ] Add accessibility sanity checks for critical interactions (keyboard and status feedback).
- [ ] Avoid arbitrary sleeps; rely on Playwright waiting model and explicit expectations.
- [ ] Keep tests isolated and parallel-safe.
- [ ] Run targeted specs first, then full E2E suite until passing.
- [ ] Record rerun attempts, failures observed, and fixes applied in test notes or PR description.

## Generic E2E Templates
Copy and adapt these templates for specific pages or journeys.

### Journey template (happy path)
```ts
import { test, expect } from '@playwright/test';

test('user completes primary journey successfully', async ({ page }) => {
  await page.goto('/');

  // Navigate to relevant page
  await page.getByRole('button', { name: /task tracker/i }).click();

  // Perform core action
  await page.getByRole('combobox').first().selectOption('In Progress');

  // Assert user-visible outcome
  await expect(page.getByRole('status')).toContainText(/updated|status/i);
});
```

### Persistence template (state survives refresh)
```ts
import { test, expect } from '@playwright/test';

test('state remains correct after refresh', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /task tracker/i }).click();
  await page.getByRole('combobox').first().selectOption('Done');

  await page.reload();
  await expect(page.getByRole('combobox').first()).toHaveValue('Done');
});
```

### Failure template (service outage)
```ts
import { test, expect } from '@playwright/test';

test('shows clear error feedback when backend fails', async ({ page }) => {
  await page.route('**/api/**', async route => {
    await route.fulfill({ status: 500, body: JSON.stringify({ message: 'Server error' }) });
  });

  await page.goto('/');
  await page.getByRole('button', { name: /task tracker/i }).click();
  await page.getByRole('combobox').first().selectOption('Done');

  await expect(page.getByRole('status')).toContainText(/failed|error/i);
});
```

## Scenario Matrix (Production Baseline)
At minimum, ensure these scenario classes are represented in the suite:
- **Happy path**: Core user flow succeeds end-to-end.
- **Edge case**: Boundary values, empty states, or unusual but valid input.
- **Negative/failure**: API error, timeout, validation failure, or unavailable dependency.
- **Recovery**: Retry path, rollback visibility, and continued usability post-failure.
- **Persistence**: Data correctness after refresh and route transitions.
- **Accessibility**: Keyboard path + meaningful feedback for assistive technologies.
- **Responsive**: Key journey sanity on one mobile profile and one desktop profile.
- **Regression smoke**: Fast critical checks for PR gates.

## Architecture for Stable E2E Tests
- Prefer lightweight page-object helpers only for repeated interactions.
- Keep assertions close to behavior under test; avoid giant helper abstractions.
- Use per-test data factories to avoid coupling between specs.
- Use `test.step()` for readability in complex journeys.
- Split slow and smoke suites using tags/projects for CI strategy.

## Flakiness Prevention Playbook
- Replace static waits with deterministic assertions (`await expect(...).toBeVisible()`).
- Reduce selector ambiguity; target accessible names and roles.
- Ensure backend test data initialization is complete before UI action starts.
- Investigate root cause on first flaky signal; do not rely on high retries.
- Keep retries low and consistent with org policy.

## CI Quality Bar
- PR gate: smoke E2E must pass.
- Main/nightly: full E2E suite plus artifacts on failures.
- Fail build for persistent flakes once threshold is exceeded.
- Publish report links and traces for triage.

## Recommended File Layout
- `e2e/smoke/*.spec.ts` for deployment-critical checks.
- `e2e/task-tracker/*.spec.ts` for task flows.
- `e2e/dashboard/*.spec.ts` for metrics and aggregation behavior.
- `e2e/fixtures/` for auth/data helper fixtures.

## PR Requirements for E2E Changes
- New user-facing workflows include E2E coverage for success and failure conditions.
- Tests are deterministic and pass headless in CI mode.
- Test report artifacts are available for failures.
- Include command outputs and rerun attempts in PR testing summary.

## References
- Project instruction: `.github/instruction/e2e-testing.instructions.md`
- Checklist: `.github/skills/e2e-testing/resource/e2e_test_case_checklist.md`
- Playwright docs: https://playwright.dev/docs/intro
- Playwright best practices: https://playwright.dev/docs/best-practices

## How to teach this skill to a teammate
- Walk through this `SKILL.md` and the checklist file.
- Pair-write one smoke test and one failure-path test.
- Review for deterministic waits, resilient locators, and independence.

## Meta
- Author: GitHub Copilot (generated)
- Purpose: Generic E2E testing skill for consistent Playwright coverage across features
````
