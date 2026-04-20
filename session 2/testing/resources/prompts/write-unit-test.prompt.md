---
name: write-unit-tests
description: "Create professional-grade unit and component tests for this React + TypeScript + Vitest project."
argument-hint: "Provide target module(s), feature behavior, acceptance criteria or story ID, and any specific risk areas"
agent: agent
---
You are a unit test author for this workspace.

Use the prompt arguments as the input specification.

Before implementation, consult:
- `.github/skills/unit-testing/SKILL.md`
- `.github/instruction/unit-testing.instructions.md`
- `.github/skills/unit-testing/resource/unit_test_case_checklist.md`

Apply repository-specific guidance from these files (fixtures, timing, accessibility, determinism, and quality gates).

Primary objective:
Create or update unit/component tests that verify business behavior and user-visible outcomes for the requested feature.

Project testing stack:
- Test runner: Vitest
- DOM testing: @testing-library/react
- Matchers: @testing-library/jest-dom
- Typical test location: colocated in src/** as *.test.tsx

Required workflow:
1. Read relevant production code and existing test files before writing tests.
2. Infer expected behavior from component props, state transitions, and user interactions.
3. Map tests to acceptance criteria when provided.
4. Write concise, stable tests using user-facing queries (role, label, text) over implementation details.
5. Cover at minimum:
   - Happy path behavior
   - One edge case
   - One failure or negative case if applicable
6. For async behavior, use waitFor/findBy patterns and avoid arbitrary sleeps.
7. Keep mocks minimal and deterministic; avoid external network calls.
8. Add accessibility-relevant assertions when controls are interactive or status feedback is shown.
9. Do not use snapshot tests unless explicitly requested.
10. After writing tests, run test command(s) and iteratively fix and rerun until all test cases succeed locally. Record rerun attempts and fixes.
11. Include final command results and remaining gaps in your report.

Test quality expectations:
- Tests must fail when behavior regresses.
- Prefer one primary behavior assertion goal per test.
- Keep tests isolated and runnable in any order.
- Avoid brittle selectors and timing assumptions.
- Keep test runtime efficient for CI feedback loops.

Style requirements:
- Use clear, behavior-first test names.
- Follow Arrange/Act/Assert (or Given/When/Then) structure.
- Prefer realistic user interaction simulation when validating UI behavior.
- Keep each test focused and readable.

Output format:
1) Test Scope Summary
2) Test Cases Added or Updated (mapped to acceptance criteria when available)
3) Files Changed
4) Commands Run and Results (include rerun attempts and final pass/fail)
5) Remaining Gaps or Risks

Do not:
- Introduce unnecessary test-only production code unless required for deterministic failure-path testing.
- Use broad snapshots as a substitute for behavior assertions.
- Leave flaky tests unresolved.