import { useState } from 'react';
import { TASK_STATUSES, type Status, type Task } from '../types';

type TaskTrackerPageProps = {
  tasks: Task[];
  onTaskStatusChange: (taskId: number, status: Status) => Promise<boolean>;
};

function getStatusPillClass(status: Status) {
  if (status === 'In Progress') {
    return 'status-progress';
  }

  if (status === 'Blocked') {
    return 'status-blocked';
  }

  if (status === 'Done') {
    return 'status-done';
  }

  return 'status-todo';
}

export function TaskTrackerPage({ tasks, onTaskStatusChange }: TaskTrackerPageProps) {
  const [pendingTaskIds, setPendingTaskIds] = useState<number[]>([]);
  const [statusMessage, setStatusMessage] = useState<{ tone: 'success' | 'error'; text: string } | null>(null);

  const handleStatusChange = async (task: Task, status: Status) => {
    if (task.status === status) {
      return;
    }

    setStatusMessage(null);
    setPendingTaskIds((current) => [...current, task.id]);

    const didUpdate = await onTaskStatusChange(task.id, status);

    if (didUpdate) {
      setStatusMessage({ tone: 'success', text: `Status updated for ${task.name}.` });
    } else {
      setStatusMessage({
        tone: 'error',
        text: `Unable to update ${task.name}. Previous status was restored.`
      });
    }

    setPendingTaskIds((current) => current.filter((id) => id !== task.id));
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

      <section className="filters-row">
        <input type="text" placeholder="Search tasks..." aria-label="Search tasks" />
        <select aria-label="Status filter">
          <option>All Status</option>
          {TASK_STATUSES.map((status) => (
            <option key={status}>{status}</option>
          ))}
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
              <span className={`pill status ${getStatusPillClass(task.status)}`}>
                {task.status}
              </span>
              <select
                className="status-select"
                aria-label={`Status for ${task.name}`}
                value={task.status}
                onChange={(event) => handleStatusChange(task, event.target.value as Status)}
                disabled={pendingTaskIds.includes(task.id)}
              >
                {TASK_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
            </div>
            <div className="assignee-cell">
              <span className="avatar">{task.assignee.initials}</span>
              {task.assignee.name}
            </div>
            <div>{task.dueDate}</div>
          </article>
        ))}
      </section>

      {statusMessage ? (
        <p className={`status-alert ${statusMessage.tone}`} role="alert" aria-live="polite">
          {statusMessage.text}
        </p>
      ) : null}
    </div>
  );
}