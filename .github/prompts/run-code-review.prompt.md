---
name: run-code-review
description: "Run a comprehensive code review. Analyzes uncommitted changes, specific files, a branch diff, or a GitHub PR. Produces a prioritized markdown report under .github/reviews/ and tracks findings with todo."
argument-hint: "[--full] [--domain <path-or-domain>] [<file-path-or-pattern>] [--branch <name>] [--pr <number>] — omit argument to review uncommitted changes [JIRA issue]"
agent: agent
---

Run the code-review workflow end to end.

## Step 1: Load Review Standards

Load `.github/skills/code-review/SKILL.md` now. All priority definitions, the review checklist, and the
report template used in later steps come from that file.

## Step 2: Identify Review Scope

Determine what to review based on the argument provided:

- **No argument:** run `git diff HEAD` from the repo root to get uncommitted changes.
- **`--full`:** review the entire repository codebase (all relevant source files) excluding generated/vendor/build artifacts.
- **`--domain <path-or-domain>`:** review only the requested domain/folder scope (examples: `app`, `components/domain`, `lib/services`, `modules/pricing`).
  - Resolve the domain to existing files/directories in the repo.
  - If the domain does not exist or resolves to zero files, report it and stop.
  - Apply the same checklist rigor as full review, but only within this scope.
- **`--branch <name>`:** run `git diff main...<name>` (or `git diff HEAD...<name>`) to compare branches.
- **File path or glob (e.g. `src/main/java/**/*.java`):** read those files directly.
- **`--pr <number>` (bonus — requires GitHub MCP):**
  1. Call `mcp_github_get_pull_request` with the PR number to retrieve metadata (title, base branch, head branch).
  2. Call `mcp_github_get_pull_request_files` to get the list of changed files.
  3. Call `mcp_github_get_pull_request_diff` (or read each changed file via `read`) to obtain the full diff content.
  4. Use the PR title and description as additional context for the review.
  - If GitHub MCP tools are unavailable, fall back to: `git fetch origin` then treat the head branch as `--branch <head-branch>`.

If the diff or file list is empty, report it and stop.

For `--full` and `--domain`, exclude non-reviewable paths such as `.git/`, `.next/`, `node_modules/`, `dist/`, `build/`, `coverage/`, and binary assets unless explicitly requested.

## Step 3: Read and Analyse Files

- Use `read` to inspect all files in scope.
- Use `search` to find related code, callers, or patterns when context is needed.
- Work through every file methodically before producing findings.

## Step 4: Apply the Review Checklist

Apply the full checklist from SKILL.md across all 6 review areas:

1. Code Quality
2. Security
3. Testing
4. Performance
5. Architecture
6. Documentation

For each issue discovered:
- Categorize by priority (🔴 CRITICAL / 🟡 IMPORTANT / 🟢 SUGGESTION).
- Record a `todo` item: `[CRITICAL|IMPORTANT|SUGGESTION] <Category>: <brief title>`.

Explicitly confirm each area was checked, even when no issues are found.

## Step 5: Generate the Review Report

- Determine today's date for the file name.
- Use `edit` to create `.github/reviews/code-review-report-<YYYY-MM-DD>.md`.
- Follow the Report Template from SKILL.md exactly:
  - Executive Summary with issue counts by priority.
  - Issues by Priority (🔴 → 🟡 → 🟢), each with file path, line numbers, description, why it matters, and suggested fix.
  - Positive Observations section.
  - Recommendations section.
  - Next Steps section.

## Step 6: Present Summary

Conclude in chat with:
- Total issues found, broken down by priority.
- All 🔴 CRITICAL items listed explicitly.
- Link to the generated report file.
- Confirmation that `todo` items were created for each finding.
- Recommended next steps.

---

## Guardrails

- Never modify source code during a review session unless the user explicitly asks for a fix.
- Base every finding on observed code — do not invent issues.
- Do not skip the Security or Testing checklist areas, even if no issues are found.
- If `--pr` is used and GitHub MCP tools are unavailable, fall back to `git fetch` + `--branch` and inform the user.
- If required tools or files are unavailable, explain what is missing before stopping.
