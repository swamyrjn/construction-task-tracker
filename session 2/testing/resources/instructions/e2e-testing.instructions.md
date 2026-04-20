---
applyTo: "e2e/**/*.spec.{ts,tsx,js,jsx}"
---

# End-to-End Testing Instructions (Language-Level)

## Purpose
- Define a shared quality bar for browser-level user journey validation.
- Verify integrated behavior across UI, state, and persistence boundaries.

## Scope
- Focus on critical business workflows and user-visible outcomes.
- Keep the E2E suite risk-based and small enough to stay stable in CI.

## Core Requirements
- Cover at least one happy path per critical workflow.
- Include meaningful edge and failure/recovery scenarios for high-risk behavior.
- Ensure tests are independent and order-agnostic.

## Stability and Synchronization
- Avoid fixed sleeps as synchronization strategy.
- Wait for concrete readiness signals (UI state, network completion, persisted state).
- Capture diagnostics for failures (trace, logs, screenshots) when available.

## Data and Isolation
- Use deterministic seed/setup data.
- Create unique data when collisions are possible.
- Minimize stubbing in true E2E tests unless needed for determinism or safety.

## Locator and Accessibility Guidance
- Prefer resilient user-facing locators (role, label, visible text, stable test IDs).
- Avoid brittle selectors tied to layout or CSS implementation details.
- Include key keyboard and accessibility-sensitive interaction paths.

## CI Expectations
- Run smoke E2E coverage on pull requests.
- Run broader suites on main/scheduled pipelines.
- Track and remediate flaky tests with clear ownership.

## Review Checklist
- Test intent maps to business workflow.
- Assertions validate user-visible outcomes.
- Scenarios include both success and resilience behavior.
- Suite runs reliably in local and CI environments.
