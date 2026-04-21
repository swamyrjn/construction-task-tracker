---
name: unit-testing
description: Generic unit and component testing skill for the Construction Task Tracker repository. Provides production-grade standards, templates, and quality checks using Vitest and React Testing Library.
---

# Unit Testing Skill — Construction Task Tracker

This skill is a generic, reusable reference for writing unit and component tests in this repository. It is optimized for deterministic behavior testing with Vitest and React Testing Library.

## When to Use This Skill
- Adding tests for a new component, page, utility, or state module.
- Updating tests after feature changes or bug fixes.
- Designing test plans that must include happy path, edge case, and failure coverage.

## Goals
- Verify user-visible behavior and business rules with stable tests.
- Keep tests maintainable, readable, and fast enough for CI.
- Enforce consistent test quality across contributors and features.

## Tools And Conventions
- Test runner: Vitest (`npm run test`).
- UI testing: `@testing-library/react` + `@testing-library/jest-dom`.
- Mocks/timers: `vi`.
- Test naming: `*.test.ts` or `*.test.tsx` colocated with code when practical.
- Fixture source: `src/data/mockData.ts` (clone fixture objects before mutation).

## Actionable Skill Checklist
- [ ] Define test scope first: unit, component, or integration-within-app.
- [ ] Map tests to acceptance criteria when available.
- [ ] Include at least one happy path, one edge case, and one negative/failure case.
- [ ] Prefer role/label/text queries over implementation details and class selectors.
- [ ] Keep mocks minimal and deterministic; avoid real network calls in unit tests.
- [ ] Use fake timers for timing-sensitive behavior and restore timers after each test.
- [ ] Verify accessibility semantics for interactive and announcement UI.
- [ ] Ensure tests are isolated and can run in any order.
- [ ] Run `npm run test`, then `npm run typecheck`, and `npm run lint` before finalizing.
- [ ] Record rerun attempts and fixes if any test initially fails.

## Test Templates

### Component behavior template
```tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';

test('updates selected value when user changes status', () => {
  const onChange = vi.fn();
  render(<StatusSelector value="To Do" onChange={onChange} ariaLabel="Change status" />);

  fireEvent.change(screen.getByRole('combobox', { name: /change status/i }), {
    target: { value: 'Done' }
  });

  expect(onChange).toHaveBeenCalledWith('Done');
});
```

### Page integration template
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';

test('changing task status updates UI and shows success notification', async () => {
  render(<App />);

  fireEvent.click(screen.getByRole('button', { name: /task tracker/i }));
  const status = screen.getByRole('combobox', { name: /change status for/i });
  fireEvent.change(status, { target: { value: 'In Progress' } });

  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/updated/i));
});
```

### Failure and rollback template
```tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../../src/App';

test('failed status update shows error and restores previous state', async () => {
  render(<App />);

  // Arrange: enable a deterministic failure path in test setup.
  // Act: trigger status change.
  // Assert: error message + rolled-back status.
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent(/failed|error/i));
});
```

## Reliability Guidance
- Avoid arbitrary sleeps; use `findBy*` or `waitFor`.
- Avoid brittle snapshots for dynamic UI unless explicitly requested.
- Prefer focused tests with one primary behavior assertion per test.
- Keep assertions at behavior level, not implementation internals.

## Recommended Test Locations
- `src/components/<ComponentName>.test.tsx`
- `src/pages/<PageName>.test.tsx`
- `src/state/<ModuleName>.test.ts`

## References
- Project instruction: `.github/instruction/unit-testing.instructions.md`
- Checklist: `.github/skills/unit-testing/resource/unit_test_case_checklist.md`
- Vitest docs: https://vitest.dev
- Testing Library docs: https://testing-library.com/docs/react-testing-library/

## Team Enablement
- Review this skill and instruction together during onboarding.
- Pair-write one test from each template category.
- During review, validate determinism, accessibility, and failure-path coverage.