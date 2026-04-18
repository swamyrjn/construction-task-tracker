# Session 2 File Migration Guide

This guide helps teammates move Session 2 code-review, PR Docs assets into the correct project folders so PR creation and code review workflows work in Copilot Chat.

## Goal

Move the files from `session 2/pr-documentation/resources/` into `.github/` so the prompt and skill files are discoverable by GitHub Copilot.

## Source to Destination Map

1. `session 2/pr-documentation/resources/pull_request_template.md`
   - Copy to: `.github/pull_request_template.md`

2. `session 2/pr-documentation/resources/prompts/create-pr.prompt.md`
   - Copy to: `.github/prompts/create-pr.prompt.md`

3. `session 2/pr-documentation/resources/prompts/run-code-review.prompt.md`
   - Copy to: `.github/prompts/run-code-review.prompt.md`

4. `session 2/pr-documentation/resources/skills/code-review/SKILL.md`
   - Copy to: `.github/skills/code-review/SKILL.md`

5. `session 2/pr-documentation/resources/skills/code-review/README.md`
   - Copy to: `.github/skills/code-review/README.md`

## Quick Validation Checklist

1. Confirm files exist in `.github/`:

2. Open Copilot Chat and verify prompts are available:
   - `/create-pr`
   - `/run-code-review`

3. Optional: run a dry review on local changes:
   - `/run-code-review`

## Team Notes

- Keep file names exactly the same unless your team intentionally standardizes prompt names.
- If you rename a prompt file, verify the frontmatter `name:` still matches the command you expect to run.
- Generated review reports are written to `.github/reviews/` by the review prompt.
