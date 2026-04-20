import { createContext, useContext, useState, type ReactNode } from 'react';
import { tasks as initialTasks } from '../data/mockData';
import type { Task, TaskStatus } from '../types';

type TaskContextValue = {
  tasks: Task[];
  updateTaskStatus: (id: number, status: TaskStatus, forceFailure?: boolean) => Promise<void>;
};

const TaskContext = createContext<TaskContextValue | null>(null);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const updateTaskStatus = (id: number, status: TaskStatus, forceFailure = false): Promise<void> => {
    const previousStatus = tasks.find((t) => t.id === id)?.status;

    // Optimistic update
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (forceFailure) {
          // Rollback to previous status
          setTasks((prev) =>
            prev.map((t) => (t.id === id ? { ...t, status: previousStatus! } : t))
          );
          reject(new Error('Status update failed'));
        } else {
          resolve();
        }
      }, 50);
    });
  };

  return (
    <TaskContext.Provider value={{ tasks, updateTaskStatus }}>
      {children}
    </TaskContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useTaskStore(): TaskContextValue {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error('useTaskStore must be used within a TaskProvider');
  return ctx;
}
