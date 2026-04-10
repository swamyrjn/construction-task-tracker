import { STATUS_OPTIONS } from '../services/taskService';
import type { Status, Task } from '../types';

type TaskTrackerPageProps = {
  tasks: Task[];
  onStatusChange: (taskId: number, nextStatus: Status) => void;
};

function statusClass(status: Status): string {
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

export function TaskTrackerPage({ tasks, onStatusChange }: TaskTrackerPageProps) {
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
              <label className="status-select-wrap">
                <span className={`pill status ${statusClass(task.status)}`}>{task.status}</span>
                <select
                  className="status-select"
                  aria-label={`Status for ${task.name}`}
                  value={task.status}
                  onChange={(event) => onStatusChange(task.id, event.target.value as Status)}
                >
                  {STATUS_OPTIONS.map((statusOption) => (
                    <option key={statusOption} value={statusOption}>
                      {statusOption}
                    </option>
                  ))}
                </select>
              </label>
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