import type { Status, Task } from '../types';

export const STATUS_OPTIONS: Status[] = ['To Do', 'In Progress', 'Blocked', 'Done'];

export function updateTaskStatus(tasks: Task[], taskId: number, nextStatus: Status): Task[] {
  return tasks.map((task) => (task.id === taskId ? { ...task, status: nextStatus } : task));
}

export async function simulateStatusUpdate(taskId: number, nextStatus: Status): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 80));

  // Deterministic failure path so rollback and error handling can be verified.
  if (taskId === 1 && nextStatus === 'Blocked') {
    throw new Error('Unable to update task status at this time.');
  }
}
