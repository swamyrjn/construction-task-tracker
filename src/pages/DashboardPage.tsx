import { useTaskStore } from '../state/TaskContext';

function DashboardMetric({ value, label, tone }: { value: number; label: string; tone: string }) {
  return (
    <article className="metric-card">
      <div className={`metric-icon ${tone}`}>▤</div>
      <p className="metric-value">{value}</p>
      <p className="metric-label">{label}</p>
    </article>
  );
}

export function DashboardPage() {
  const { tasks } = useTaskStore();

  const total = tasks.length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const done = tasks.filter((t) => t.status === 'Done').length;
  const highPriority = tasks.filter((t) => t.priority === 'High').length;

  return (
    <div>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of construction project tasks and activities</p>
      </header>

      <section className="metrics-grid">
        <DashboardMetric value={total} label="Total Tasks" tone="blue" />
        <DashboardMetric value={inProgress} label="In Progress" tone="blue" />
        <DashboardMetric value={done} label="Done" tone="green" />
        <DashboardMetric value={highPriority} label="High Priority" tone="red" />
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Upcoming Tasks</h2>
          <button className="link-button">View all tasks</button>
        </div>
        <ul className="task-list-simple">
          {tasks.map((task) => (
            <li key={task.id} className="task-row-simple">
              <div>
                <h3>{task.name}</h3>
                <p>{task.location} • Due {task.dueDate.replace(', 2026', '')}</p>
              </div>
              <div className="task-meta-right">
                <span className={`pill ${task.priority.toLowerCase()}`}>{task.priority}</span>
                <span className="avatar">{task.assignee.initials}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}