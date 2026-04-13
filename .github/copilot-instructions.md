# Copilot Instructions for Construction Task Tracker Frontend

## Project Context

- This is a Vite + React 18 + TypeScript frontend.
- UI is a multi-page dashboard experience with local navigation state, not route-based navigation.
- Current pages are Dashboard, Task Tracker, Team, and Settings.
- Data is mock/static and lives in `src/data/mockData.ts`.

## Tech and Commands

- Use npm scripts defined in `package.json`:
- `npm run dev` for local development
- `npm run lint` for ESLint
- `npm run typecheck` for TypeScript checks
- `npm run test` for Vitest tests
- `npm run build` for production build
- When you change behavior or types, prefer running `lint`, `typecheck`, and relevant tests.

## Architecture Expectations

- Keep app composition in `src/App.tsx` with the `pageMap` pattern unless asked to refactor.
- Keep navigation contract aligned with `NavKey` in `src/components/Sidebar.tsx`.
- Add page-level UI inside `src/pages/` and shared reusable UI in `src/components/`.
- Keep domain types centralized in `src/types.ts` and reuse those types instead of redefining inline types.
- Keep mock data changes in `src/data/mockData.ts`.

## Coding Style

- Use functional React components and TypeScript-first code.
- Preserve current naming conventions and file layout.
- Prefer explicit, readable code over clever abstractions.
- Avoid introducing new dependencies unless necessary.
- Do not add React Router unless explicitly requested.
- Keep accessibility in mind for controls (for example `aria-label` on icon-only buttons and form fields).

## UI and Styling

- Reuse existing CSS class patterns in `src/styles.css`.
- Prefer extending existing design tokens and classes before adding new visual systems.
- Keep the visual language consistent with current prototype-inspired cards, pills, avatars, tables, and forms.
- Maintain responsive behavior for desktop and mobile when adjusting layout.

## Testing Guidance

- Use Vitest and Testing Library patterns already present in the repo.
- Add or update tests in `src/App.test.tsx` or near related features when behavior changes.
- Prioritize tests for navigation behavior, rendering states, and user-visible interactions.

## Change Discipline

- Keep changes focused and minimal to the requested task.
- Do not refactor unrelated areas.
- If requirements are ambiguous, ask for clarification before broad structural changes.