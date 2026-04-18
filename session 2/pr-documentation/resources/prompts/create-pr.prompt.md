---
name: create-pr
description: "Create a pull request with AI-generated title and description from git diff, with preview and optional manual edit before submission."
argument-hint: "Base branch (for example: develop or main)"
agent: agent
---
Run the create-pr workflow end to end.

Primary behavior:
1. Use full available tool access for this workflow.
2. Invoke the workspace create-pr skill first if it is available.
3. If the skill is not available, execute the fallback workflow below directly.

Fallback workflow:
1. Determine target base branch.
- If the user provided a base branch in arguments, use it.
- Otherwise ask once and wait for answer.

2. Set repository context.
- Remote: origin
- Head branch: detect current branch from git; if unavailable, default to main.

3. Generate PR content.
- Analyze branch diff against the selected base branch.
- Use generate_description_from_diff when available.
- Generate a meaningful PR title from commits and diff.
- Fill the structure from [.github/pull_request_template.md](../pull_request_template.md).

4. Show preview.
- Present final proposed title and description before creating the PR.

5. Offer manual edit.
- Ask whether the user wants to edit.
- If yes, create a temporary editable draft, wait for edits, then read the edited content.

6. Create PR.
- Use create_pull_request when available.
- If unavailable, use a repository-standard CLI fallback.

7. Report result and cleanup.
- Return PR URL (or exact failure reason).
- Remove temporary draft artifacts.

Guardrails:
- Never create a PR without explicit user confirmation after preview.
- Keep generated text factual and diff-based; avoid inventing behavior.
- If required tools are missing, explain what is missing and provide the exact next command.
