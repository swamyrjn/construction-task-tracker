## Plan: US1 Task Status Sync

Implement US-TT-001 by introducing a single source of truth for tasks in App-level state, wiring Task Tracker status updates to that state, deriving Dashboard metrics from it, and validating with targeted unit/integration/accessibility tests. This delivers immediate status updates, rollback behavior, notifications, and session persistence with minimal architectural churn.

**Steps**
1. Phase 1 - Domain and data alignment: update status model to To Do, In Progress, Blocked, Done; normalize seed task statuses; map each acceptance criterion to test assertions. This blocks all later work.
2. Phase 2 - Shared state foundation: move tasks into App state and pass tasks plus status update action to Dashboard and Task Tracker. Depends on step 1.
3. Phase 3 - Task status interaction: replace read-only status pill with a keyboard-accessible selector and optimistic update handler with rollback on simulated failure. Depends on step 2.
4. Phase 4 - Dashboard metric derivation: remove hardcoded metric constants and compute totals from shared task state selectors. Depends on step 2; can run in parallel with step 3 after props contract is agreed.
5. Phase 5 - Feedback and persistence: add success/error alert handling and sessionStorage rehydrate/persist behavior for AC6. Depends on steps 2 and 3.
6. Phase 6 - Styling and accessibility polish: add Blocked/Done status styling variants, focus states, and role=alert semantics verification. Parallel with step 5.
7. Phase 7 - Verification implementation: add tests for status control rendering, optimistic update and rollback, cross-page metric sync, and persistence behavior. Depends on steps 3 to 5.
8. Phase 8 - Final validation: run lint, type checks, and tests; execute manual acceptance walkthrough for AC1 to AC6 and NFR checks.

**Relevant files**
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/types.ts - update Status union and ensure Task typing aligns with story status vocabulary.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/data/mockData.ts - normalize initial status values and preserve deterministic test data.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/App.tsx - host shared tasks state, alert state, persistence logic, and pass props to pages.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/pages/TaskTrackerPage.tsx - add per-row status selector and dispatch update intents.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/pages/DashboardPage.tsx - compute metrics from tasks prop instead of hardcoded numbers.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/styles.css - add status tone variants and interactive focus styling.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/App.test.tsx - extend tests for cross-page synchronization and messaging behavior.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/test/setup.ts - verify testing helpers remain sufficient for alert and interaction assertions.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/pages/TaskTrackerPage.test.tsx - new tests for status update controls and keyboard interaction.
- c:/Users/sarumug1/WebstormProjects/ai-pdlc-practice/src/pages/DashboardPage.test.tsx - new tests for metric derivation from live state.

**Verification**
1. Automated checks: run lint, typecheck, and test commands; all must pass with no new warnings/errors.
2. AC1: confirm each task row exposes To Do, In Progress, Blocked, Done as selectable status options.
3. AC2: change a task status and confirm immediate in-place UI update without reload.
4. AC3: confirm Dashboard counts change after Task Tracker updates in same session.
5. AC4: verify success alert appears after successful status update.
6. AC5: trigger simulated failure and verify rollback plus error alert.
7. AC6: refresh app and confirm status persistence matches chosen sessionStorage behavior.
8. NFR: keyboard-only interaction works; alerts are screen-reader discoverable; update interaction remains under local threshold.

**Decisions**
- Include in scope: App-level shared state, optimistic update with rollback, success/error notifications, sessionStorage persistence, test coverage.
- Exclude from scope: backend API calls, role permissions, audit history.
- Recommended implementation strategy: keep architecture simple using App state and props to avoid premature introduction of state libraries.

**Further Considerations**
1. Dashboard metric design: Option A add a dedicated Blocked card, Option B keep current cards and include Blocked only in detailed metrics.
2. Failure simulation: Option A deterministic toggle for tests/dev, Option B random failure branch for demo-only behavior.
3. Persistence boundary: Option A sessionStorage only (story-compliant minimal), Option B localStorage (stronger continuity but broader retention semantics).