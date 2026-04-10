import { useEffect, useState } from 'react';
import { Sidebar, type NavKey } from './components/Sidebar';
import { tasks as seedTasks } from './data/mockData';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskTrackerPage } from './pages/TaskTrackerPage';
import { TeamPage } from './pages/TeamPage';
import { simulateStatusUpdate, updateTaskStatus } from './services/taskService';
import type { Status, Task } from './types';

const TASKS_STORAGE_KEY = 'construction-task-tracker.tasks';

type AlertState = {
  type: 'success' | 'error';
  message: string;
};

function loadInitialTasks(): Task[] {
  const rawTasks = sessionStorage.getItem(TASKS_STORAGE_KEY);

  if (!rawTasks) {
    return seedTasks;
  }

  try {
    return JSON.parse(rawTasks) as Task[];
  } catch {
    return seedTasks;
  }
}

function isStatus(value: string): value is Status {
  return value === 'To Do' || value === 'In Progress' || value === 'Blocked' || value === 'Done';
}

function AppPage({ page, tasks, onStatusChange }: { page: NavKey; tasks: Task[]; onStatusChange: (taskId: number, nextStatus: Status) => void }) {
  if (page === 'dashboard') {
    return <DashboardPage tasks={tasks} />;
  }

  if (page === 'tasks') {
    return <TaskTrackerPage tasks={tasks} onStatusChange={onStatusChange} />;
  }

  if (page === 'team') {
    return <TeamPage />;
  }

  return <SettingsPage />;
};

function App() {
  const [page, setPage] = useState<NavKey>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(loadInitialTasks);
  const [alert, setAlert] = useState<AlertState | null>(null);

  useEffect(() => {
    sessionStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  async function handleStatusChange(taskId: number, nextStatusRaw: string) {
    if (!isStatus(nextStatusRaw)) {
      return;
    }

    const previousTasks = tasks;
    const nextTasks = updateTaskStatus(tasks, taskId, nextStatusRaw);
    setTasks(nextTasks);

    try {
      await simulateStatusUpdate(taskId, nextStatusRaw);
      setAlert({ type: 'success', message: 'Task status updated successfully.' });
    } catch {
      setTasks(previousTasks);
      setAlert({ type: 'error', message: 'Status update failed. Previous value has been restored.' });
    }
  }

  return (
    <div className="app-shell">
      <Sidebar current={page} onSelect={setPage} />
      <main className="content">
        {alert ? (
          <div className={`status-alert status-alert-${alert.type}`} role="alert">
            <span>{alert.message}</span>
            <button type="button" className="link-button" onClick={() => setAlert(null)}>
              Dismiss
            </button>
          </div>
        ) : null}
        <AppPage page={page} tasks={tasks} onStatusChange={handleStatusChange} />
      </main>
    </div>
  );
}

export default App;