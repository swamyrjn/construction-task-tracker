import { useEffect, useState } from 'react';
import { Sidebar, type NavKey } from './components/Sidebar';
import { tasks as initialTasks } from './data/mockData';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskTrackerPage } from './pages/TaskTrackerPage';
import { TeamPage } from './pages/TeamPage';
import type { Status, Task } from './types';

const TASK_STORAGE_KEY = 'construction-task-tracker.tasks';

function readStoredTasks() {
  const raw = localStorage.getItem(TASK_STORAGE_KEY);

  if (!raw) {
    return initialTasks;
  }

  try {
    return JSON.parse(raw) as Task[];
  } catch {
    return initialTasks;
  }
}

function shouldSimulateUpdateFailure(taskId: number, status: Status) {
  return taskId === 1 && status === 'Blocked';
}

const updateDelayMs = 120;

function App() {
  const [page, setPage] = useState<NavKey>('dashboard');
  const [tasks, setTasks] = useState<Task[]>(readStoredTasks);

  useEffect(() => {
    localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleTaskStatusChange = async (taskId: number, status: Status) => {
    const existingTask = tasks.find((task) => task.id === taskId);

    if (!existingTask || existingTask.status === status) {
      return false;
    }

    const previousStatus = existingTask.status;

    setTasks((current) =>
      current.map((task) => {
        if (task.id !== taskId) {
          return task;
        }

        return { ...task, status };
      })
    );

    await new Promise((resolve) => {
      setTimeout(resolve, updateDelayMs);
    });

    if (shouldSimulateUpdateFailure(taskId, status)) {
      setTasks((current) =>
        current.map((task) => {
          if (task.id !== taskId) {
            return task;
          }

          return { ...task, status: previousStatus };
        })
      );

      return false;
    }

    return true;
  };

  const pageMap: Record<NavKey, JSX.Element> = {
    dashboard: <DashboardPage tasks={tasks} />,
    tasks: <TaskTrackerPage tasks={tasks} onTaskStatusChange={handleTaskStatusChange} />,
    team: <TeamPage />,
    settings: <SettingsPage />
  };

  return (
    <div className="app-shell">
      <Sidebar current={page} onSelect={setPage} />
      <main className="content">{pageMap[page]}</main>
    </div>
  );
}

export default App;