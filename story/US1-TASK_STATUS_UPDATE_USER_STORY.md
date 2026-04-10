# User Story: Update Task Status From Task Tracker

## Story ID
US-TT-001

## Story Title
Update task status from the Task Tracker page and reflect the result on the Dashboard.

## User Story
As a team lead,
I want to change a task's status directly from the Task Tracker page,
so that the Dashboard always shows the current delivery progress.

## Business Value
- Improves visibility into team progress.
- Reduces stale reporting on the Dashboard.
- Speeds up daily standups by keeping status current.

## Scope
### In Scope
- Status update control for each task in Task Tracker.
- Immediate UI update after a status change.
- Dashboard summary metrics refresh based on changed status.
- Session persistence using application state (optional local storage persistence).

### Out of Scope
- Backend API integration.
- Role-based permissions.
- Audit history and activity feed.

## Acceptance Criteria
1. Given I am on the Task Tracker page,
   when I view a task,
   then I can see and use a status control with values: To Do, In Progress, Blocked, Done.

2. Given I select a new status for a task,
   when the update is submitted,
   then the task status changes immediately in the Task Tracker list without full page reload.

3. Given a task status changes,
   when I navigate to or view the Dashboard,
   then summary metrics reflect the new counts for To Do, In Progress, Blocked, and Done.

4. Given a status update succeeds,
   when the UI applies the update,
   then I see a success confirmation message.

5. Given a status update fails,
   when the update cannot be applied,
   then I see an error message and the previous status is restored.

6. Given I refresh the app in the same session,
   when data is reloaded,
   then changed task statuses remain available from in-memory app state (or local storage if implemented).

## Non-Functional Requirements
- Status update interaction should complete in under 200 ms in local mock mode.
- UI must be keyboard accessible (status control focusable and selectable).
- Messages should be screen-reader readable (use semantic alert patterns).

## Implementation Notes
- Reuse existing task type definitions from src/types.ts.
- Centralize task state where both Task Tracker and Dashboard can read from the same source.
- Prefer optimistic UI updates with rollback on simulated failure.
- Keep status enum/string literals consistent across pages.

## Suggested Technical Tasks
1. Add or confirm status values in task type model.
2. Add status selector UI to Task Tracker row/card.
3. Implement shared state update function for task status changes.
4. Recompute Dashboard metrics from shared state.
5. Add success/error notification component behavior.
6. Add tests for status changes and dashboard metric updates.

## Test Scenarios
1. Change one task from To Do to In Progress and verify list update.
2. Change one task from In Progress to Done and verify Dashboard done count increments.
3. Simulate update failure and verify rollback + error message.
4. Refresh app and verify persistence behavior expected by current implementation.
5. Verify keyboard-only status changes work correctly.

## Definition of Done
- All acceptance criteria pass.
- Unit tests and UI tests pass.
- No TypeScript or lint errors introduced.
- Story documented and demo-ready for review.
