---
name: code-review
description: Perform thorough code reviews with prioritized findings across security, code quality, testing, performance, architecture, and documentation. Includes checklist, priority definitions, review standards, and report template.
---

# Code Review Skill

Use this skill when performing a code review. It provides the complete reference for priority definitions,
review standards, the systematic checklist, and the report template.

---

## Priority Definitions

### 🔴 CRITICAL (Block Merge)

- **Security:** Vulnerabilities, exposed secrets, authentication/authorization issues.
- **Correctness:** Logic errors, data corruption risks, race conditions.
- **Breaking Changes:** API contract changes without versioning.
- **Data Loss:** Risk of data loss or corruption.

### 🟡 IMPORTANT (Requires Discussion)

- **Code Quality:** Severe SOLID violations, excessive duplication.
- **Test Coverage:** Missing tests for critical paths or new functionality.
- **Performance:** Obvious bottlenecks — N+1 queries, memory leaks.
- **Architecture:** Significant deviations from established patterns.

### 🟢 SUGGESTION (Non-blocking Improvement)

- **Readability:** Poor naming, complex logic that could be simplified.
- **Optimization:** Performance improvements without functional impact.
- **Best Practices:** Minor deviations from conventions.
- **Documentation:** Missing or incomplete comments/documentation.

---

## Review Checklist

Work through every item in each area. Mark explicitly whether issues were found or the area is clean.

### Code Quality
- [ ] Code follows consistent style and conventions
- [ ] Names are descriptive and follow naming conventions
- [ ] Functions/methods are small and focused (target <20–30 lines)
- [ ] No code duplication (DRY)
- [ ] Complex logic is broken into simpler parts (max 3–4 nesting levels)
- [ ] Error handling is appropriate — no silent failures
- [ ] No commented-out code or untracked TODO markers

### Security
- [ ] No sensitive data (passwords, API keys, tokens, PII) in code or logs
- [ ] All user inputs are validated and sanitized
- [ ] No SQL injection vulnerabilities — parameterized queries everywhere
- [ ] Authentication and authorization checks are in place
- [ ] Cryptography uses established libraries, no custom crypto
- [ ] Dependencies are up-to-date and free of known CVEs

### Testing
- [ ] New code has appropriate test coverage
- [ ] Tests use descriptive names explaining what is tested
- [ ] Tests follow Arrange-Act-Assert or Given-When-Then structure
- [ ] Tests are independent and deterministic (no shared state)
- [ ] Assertions are specific (avoid bare `assertTrue`/`assertFalse`)
- [ ] Edge cases, null values, and empty collections are tested
- [ ] No tests that always pass or are commented out

### Performance
- [ ] No N+1 query patterns
- [ ] Algorithms have appropriate time/space complexity
- [ ] Caching is used for expensive or repeated operations where appropriate
- [ ] Resources (connections, files, streams) are properly closed/released
- [ ] Large result sets are paginated

### Architecture
- [ ] Follows established layer boundaries and naming conventions
- [ ] Separation of concerns is maintained
- [ ] No layer violations (e.g., business logic in controllers)
- [ ] Dependencies flow in the correct direction (high-level → low-level via abstractions)
- [ ] Components are independently testable

### Documentation
- [ ] Public APIs are documented (purpose, parameters, return values)
- [ ] Non-obvious logic has explanatory comments
- [ ] README is updated if behavior or setup changed
- [ ] Breaking changes are clearly documented

---

## Review Standards

### Code Quality Standards
- **Clean Code:** Descriptive naming, Single Responsibility Principle, DRY, small functions, limited nesting.
- **Error Handling:** Handle errors at the right level, produce meaningful messages, fail fast, no silent swallowing.

### Security Review Standards
- Never include passwords, API keys, tokens, or PII in source code or log statements.
- Validate and sanitize all user-supplied input before use.
- Use parameterized queries for all database interactions — never string concatenation.
- Enforce authentication and authorization checks before accessing protected resources.
- Use vetted cryptographic libraries; never implement custom encryption or hashing.
- Audit third-party dependencies for known vulnerabilities (CVEs).

### Testing Standards
- Every new behavior and every critical path must have at least one test.
- Test names must describe the scenario: `should_returnError_when_inputIsNull`.
- Use Arrange-Act-Assert (Java) or Given-When-Then (BDD) consistently.
- Tests must not rely on execution order or shared mutable state.
- Use specific matchers (`assertEquals`, `assertThrows`) over generic ones.
- Cover boundary conditions, empty collections, and null inputs.

### Performance Standards
- Identify N+1 patterns — prefer batch fetching or join queries.
- Choose algorithms and data structures appropriate to the expected data size.
- Cache results of expensive operations that are called repeatedly.
- Ensure all I/O resources (streams, connections) are closed in `finally` blocks or via try-with-resources.
- Return paginated results for endpoints that may return large datasets.

### Architecture Standards
- Follow layer responsibilities: controller (routing + validation), service (business logic), repository (persistence), mapper (DTO conversion).
- High-level modules must not depend directly on low-level implementation details.
- Prefer small, focused interfaces over large general-purpose ones.
- Keep modules loosely coupled and independently testable.
- Group related functionality together (high cohesion).

### Documentation Standards
- All public-facing API methods must document purpose, parameters, and return values.
- Leave comments on non-obvious logic explaining the *why*, not the *what*.
- Update `README.md` when adding features or changing project setup.
- Clearly document breaking changes in commit messages and changelog.
- Provide usage examples for complex or non-obvious features.

---

## Report Template

Use this template when generating the review report. Write it to `.github/reviews/code-review-report-<YYYY-MM-DD>.md`.

```markdown
# Code Review Report

**Date:** <current-date>
**Reviewer:** GitHub Copilot
**Scope:** <files or diff reviewed>

---

## Executive Summary

| Priority | Count | Action |
|---|---|---|
| 🔴 Critical | <n> | Must fix before merge |
| 🟡 Important | <n> | Requires team discussion |
| 🟢 Suggestion | <n> | Non-blocking improvements |
| **Total** | **<n>** | |

---

## Issues by Priority

### 🔴 CRITICAL Issues (Block Merge)

#### Issue #1: <Category>: <Brief Title>

**File:** `<file-path>`
**Lines:** <line-numbers>

<Detailed description of the issue>

**Why this matters:**
<Explanation of impact>

**Suggested fix:**
```<language>
<code example>
```

---

### 🟡 IMPORTANT Issues (Requires Discussion)

#### Issue #N: <Category>: <Brief Title>

**File:** `<file-path>`
**Lines:** <line-numbers>

<Detailed description>

**Why this matters:**
<Explanation>

**Suggested fix:**
```<language>
<code example>
```

---

### 🟢 SUGGESTIONS (Non-blocking Improvements)

#### Issue #N: <Category>: <Brief Title>

**File:** `<file-path>`
**Lines:** <line-numbers>

<Detailed description>

**Why this matters:**
<Explanation>

**Suggested fix:**
```<language>
<code example>
```

---

## Positive Observations

- <Well-implemented feature or practice>
- <Smart solution or pattern worth noting>

---

## Recommendations

- <High-level code quality or architectural recommendation>
- <Pattern to adopt or avoid>
- <Process improvement>

---

## Next Steps

1. Address all 🔴 CRITICAL issues before merging.
2. Discuss 🟡 IMPORTANT issues with the team.
3. Consider 🟢 SUGGESTIONS for future iterations.
4. Update tests and documentation as needed.
```
