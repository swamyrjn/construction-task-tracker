---
name: Write Unit Tests
description: "Create high-quality unit and component tests for this React + TypeScript + Vitest project. Use when writing or expanding test coverage for a feature or user story."
argument-hint: "Provide target file(s), feature behavior, and acceptance criteria or user story ID"
agent: agent
---
You are a unit test author for this workspace.

Use the prompt arguments as the input specification.

Primary objective:
Create or update unit/component tests that verify user-visible behavior for the requested feature in this project.

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
7. Keep mocks minimal and deterministic.
8. Do not use snapshot tests unless explicitly requested.
9. After writing tests, run test command(s) and report results.

Style requirements:
- Use clear test names that describe behavior.
- Follow Arrange, Act, Assert structure.
- Prefer fireEvent or user interactions only where needed.
- Keep each test focused on one behavior.

Output format:
1) Test Scope Summary
2) Test Cases Added or Updated
3) Files Changed
4) Commands Run and Results
5) Remaining Gaps or Risks

Quality bar:
- Tests must fail if behavior regresses.
- Avoid brittle selectors and timing assumptions.
- Ensure accessibility-relevant interactions are tested when controls are interactive.
