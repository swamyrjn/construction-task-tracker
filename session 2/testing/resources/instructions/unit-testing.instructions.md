---
appliesTo:
  - "src/**/*.{test,spec}.{ts,tsx,js,jsx}"
  - "src/**/__tests__/**/*.{ts,tsx,js,jsx}"
---

# Unit Testing Instructions (Language-Level)

## Purpose
- Define a consistent quality bar for unit and component tests.
- Keep tests deterministic, maintainable, and focused on behavior contracts.

## Scope
- Test one behavior unit at a time (function, module, hook, or component contract).
- Keep browser journey validation in E2E tests, not unit tests.

## Core Requirements
- Test observable behavior, not internal implementation details.
- Keep tests isolated and runnable in any order.
- Use clear behavior-first names.
- Cover success path, edge case, and failure path when applicable.

## Structure and Data
- Use Arrange / Act / Assert (or Given / When / Then) structure.
- Keep setup explicit and minimal per test.
- Prefer fresh test data copies to avoid shared-state leakage.

## Determinism Rules
- Avoid real network or external system calls in unit tests.
- Avoid arbitrary sleeps and timing assumptions.
- Treat flaky tests as defects and fix root cause.

## Assertion Guidance
- Prefer user-facing queries for UI behavior (role, label, text).
- Assert outcomes tied to business logic or user-visible state.
- Avoid broad snapshot assertions unless specifically required.

## Review Checklist
- Behavior change is covered by tests.
- Assertions verify contracts rather than internals.
- Tests are deterministic locally and in CI.
