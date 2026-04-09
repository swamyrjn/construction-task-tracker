# Construction Task Tracker Frontend

A React + TypeScript frontend matching the provided dashboard/task tracker/team/settings prototypes.

## Features

- Left navigation rail with 4 pages:
  - Dashboard
  - Task Tracker
  - Team
  - Settings
- Prototype-style cards, tables, pills, avatars, and forms
- Mock data for tasks and team members
- Basic unit test for page navigation

## Stack

- React 18
- TypeScript
- Vite
- ESLint
- Vitest + Testing Library

## Run locally

```powershell
npm install
npm run dev
```

## Quality checks

```powershell
npm run lint
npm run typecheck
npm run test
npm run build
```

## Notes

- Data is static in `src/data/mockData.ts`.
- Navigation is local state in `src/App.tsx` (easy to replace with React Router later).