import { tasks } from '../data/mockData';

export function TaskTrackerPage() {
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
              <span className={`pill status ${task.status === 'In Progress' ? 'status-progress' : 'status-todo'}`}>
                {task.status}
              </span>
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