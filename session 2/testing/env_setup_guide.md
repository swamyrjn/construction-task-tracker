# Session 2 Testing File Migration Guide

This guide helps teammates move Session 2 testing assets into the project-level `.github` folders so testing prompts, instructions, and skills are discoverable in Copilot Chat.

## Goal

Move files from `session 2/testing/resources/` into `.github/` with the same file names and folder structure expected by the testing prompts.

## Source to Destination Map

1. `session 2/testing/resources/instructions/unit-testing.instructions.md`
   - Copy to: `.github/instructions/unit-testing.instructions.md`

2. `session 2/testing/resources/instructions/e2e-testing.instructions.md`
   - Copy to: `.github/instructions/e2e-testing.instructions.md`

3. `session 2/testing/resources/prompts/write-unit-test.prompt.md`
   - Copy to: `.github/prompts/write-unit-test.prompt.md`

4. `session 2/testing/resources/prompts/write-e2e-test.prompt.md`
   - Copy to: `.github/prompts/write-e2e-test.prompt.md`

5. `session 2/testing/resources/skills/unit-testing/SKILL.md`
   - Copy to: `.github/skills/unit-testing/SKILL.md`

6. `session 2/testing/resources/skills/unit-testing/README.md`
   - Copy to: `.github/skills/unit-testing/README.md`

7. `session 2/testing/resources/skills/e2e-testing/SKILL.md`
   - Copy to: `.github/skills/e2e-testing/SKILL.md`

8. `session 2/testing/resources/skills/e2e-testing/README.md`
   - Copy to: `.github/skills/e2e-testing/README.md`

## Quick Validation Checklist

1. Confirm all files above exist under `.github/`.

2. Open Copilot Chat and verify testing prompts are available:
   - `/write-unit-tests`
   - `/write-e2e-tests`

3. Optional: run a dry prompt check by invoking each prompt once and confirming no missing-file errors.

## Team Notes

- Keep file names exactly the same unless your team intentionally standardizes names.
- If you rename a prompt file, also verify the frontmatter `name:` still matches the command you expect to run.
- Keep instructions and skill content aligned with your repository's test stack and CI workflow.
