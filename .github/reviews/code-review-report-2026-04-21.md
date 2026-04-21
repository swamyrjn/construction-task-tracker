# Code Review Report

**Date:** 2026-04-21
**Reviewer:** GitHub Copilot
**Scope:** Uncommitted changes from `git diff HEAD` in `src/App.tsx`, `src/App.test.tsx`, `src/data/mockData.ts`, `src/pages/DashboardPage.tsx`, `src/pages/TaskTrackerPage.tsx`, `src/styles.css`, and `src/types.ts`

---

## Executive Summary

| Priority | Count | Action |
|---|---|---|
| 🔴 Critical | 0 | Must fix before merge |
| 🟡 Important | 2 | Requires team discussion |
| 🟢 Suggestion | 1 | Non-blocking improvements |
| **Total** | **3** | |

Checklist coverage confirmation:
- Code Quality: checked, issues found.
- Security: checked, issues found.
- Testing: checked, issues found.
- Performance: checked, issue found.
- Architecture: checked, no blocking issue found.
- Documentation: checked, no blocking issue found.

---

## Issues by Priority

### 🔴 CRITICAL Issues (Block Merge)

No critical issues found.

---

### 🟡 IMPORTANT Issues (Requires Discussion)

#### Issue #1: Security: Unvalidated persisted task payload from localStorage

**File:** `src/App.tsx`
**Lines:** 12-23

`readStoredTasks` parses persisted JSON and casts it directly to `Task[]` without runtime validation. Because localStorage is user-controlled state, malformed or unexpected values (for example an unknown `status`) can enter app state and break assumptions in UI logic.

**Why this matters:**
This is an input-validation gap in a trust boundary. Invalid shape or values can lead to incorrect rendering, inaccessible controls, or future runtime failures as logic expands.

**Suggested fix:**
```ts
function isTaskArray(value: unknown): value is Task[] {
  if (!Array.isArray(value)) return false;

  return value.every((task) => {
    if (!task || typeof task !== 'object') return false;
    const t = task as Record<string, unknown>;
    return (
      typeof t.id === 'number' &&
      typeof t.name === 'string' &&
      typeof t.description === 'string' &&
      typeof t.location === 'string' &&
      typeof t.dueDate === 'string' &&
      (t.priority === 'High' || t.priority === 'Medium' || t.priority === 'Low') &&
      TASK_STATUSES.includes(t.status as Status)
    );
  });
}

function readStoredTasks() {
  const raw = localStorage.getItem(TASK_STORAGE_KEY);
  if (!raw) return initialTasks;

  try {
    const parsed: unknown = JSON.parse(raw);
    return isTaskArray(parsed) ? parsed : initialTasks;
  } catch {
    return initialTasks;
  }
}
```

---

#### Issue #2: Testing: Missing resilience test for invalid persisted task state

**File:** `src/App.test.tsx`
**Lines:** 4-74

The suite covers success, rollback, and persistence, but it does not test startup behavior when localStorage contains malformed JSON or an invalid task payload.

**Why this matters:**
Persistence logic is newly introduced and now part of a critical app path. Without a negative-path test, regressions in fallback behavior may go unnoticed.

**Suggested fix:**
```tsx
it('falls back to mock tasks when persisted tasks are malformed', () => {
  localStorage.setItem('construction-task-tracker.tasks', '{not-valid-json');

  render(<App />);
  fireEvent.click(screen.getByLabelText('Task Tracker'));

  expect(screen.getByLabelText('Status for Safety Inspection - Block B')).toHaveValue('To Do');
});
```

---

### 🟢 SUGGESTIONS (Non-blocking Improvements)

#### Issue #3: Performance: Recreates page element map on every render

**File:** `src/App.tsx`
**Lines:** 80-85

`pageMap` is rebuilt on each render. In this app size it is not expensive, but keeping route-to-element selection as a switch or memoized mapping can reduce unnecessary allocations and improve clarity as pages grow.

**Why this matters:**
Small inefficiencies can accumulate as component trees become larger and props become more expensive to compute.

**Suggested fix:**
```tsx
const currentPage = useMemo(() => {
  switch (page) {
    case 'dashboard':
      return <DashboardPage tasks={tasks} />;
    case 'tasks':
      return <TaskTrackerPage tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />;
    case 'team':
      return <TeamPage />;
    case 'settings':
      return <SettingsPage />;
  }
}, [page, tasks, handleTaskStatusChange]);
```

---

## Positive Observations

- Good integration-level tests were added for happy path, rollback behavior, and persistence remount behavior in `src/App.test.tsx`.
- Task status handling is type-driven (`Status` + `TASK_STATUSES`) and reused across pages, which improves consistency.

---

## Recommendations

- Add runtime validation at the localStorage deserialization boundary before assigning persisted data into state.
- Expand tests with malformed-persistence scenarios to harden the new persistence path.
- Keep render-path structures lightweight as page-level complexity grows.

---

## Next Steps

1. Address all 🔴 CRITICAL issues before merging.
2. Discuss 🟡 IMPORTANT issues with the team.
3. Consider 🟢 SUGGESTIONS for future iterations.
4. Update tests and documentation as needed.
