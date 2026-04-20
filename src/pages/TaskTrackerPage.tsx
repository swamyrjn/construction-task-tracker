import { useState } from 'react';
import { Notification } from '../components/Notification';
import { StatusSelector } from '../components/StatusSelector';
import { useTaskStore } from '../state/TaskContext';
import type { TaskStatus } from '../types';

type NotificationState = { message: string; type: 'success' | 'error' } | null;

export function TaskTrackerPage() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const [notification, setNotification] = useState<NotificationState>(null);

  const handleStatusChange = async (taskId: number, status: TaskStatus) => {
    try {
      await updateTaskStatus(taskId, status);
      setNotification({ message: 'Task status updated successfully.', type: 'success' });
    } catch {
      setNotification({ message: 'Failed to update task status. Please try again.', type: 'error' });
    }
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div>
      <header className="page-header page-header-row">
        <div>
          <h1>Task Tracker</h1>
          <p>Manage construction tasks across all project sites</p>
        </div>
        <button className="primary-button">+ Create Task</button>
      </header>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <section className="filters-row">
        <input type="text" placeholder="Search tasks..." aria-label="Search tasks" />
        <select aria-label="Status filter">
          <option>All Status</option>
        </select>
        <select aria-label="Priority filter">
          <option>All Priority</option>
        </select>
        <select aria-label="Assignee filter">
          <option>All Assignees</option>
        </select>
      </section>

      <section className="panel task-table-panel">
        <div className="task-table-head">
          <span>TASK NAME</span>
          <span>LOCATION</span>
          <span>PRIORITY</span>
          <span>STATUS</span>
          <span>ASSIGNEE</span>
          <span>DUE DATE</span>
        </div>
        {tasks.map((task) => (
          <article key={task.id} className="task-table-row">
            <div>
              <h3>{task.name}</h3>
              <p>{task.description}</p>
            </div>
            <div>{task.location}</div>
            <div>
              <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
            </div>
            <div>
              <StatusSelector
                taskId={task.id}
                value={task.status}
                onChange={handleStatusChange}
              />
            </div>
            <div className="assignee-cell">
              <span className="avatar">{task.assignee.initials}</span>
              {task.assignee.name}
            </div>
            <div>{task.dueDate}</div>
          </article>
        ))}
      </section>
    </div>
  );
}