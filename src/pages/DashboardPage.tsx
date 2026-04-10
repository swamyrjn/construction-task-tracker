import type { Task } from '../types';

function DashboardMetric({ value, label, tone, testId }: { value: number; label: string; tone: string; testId: string }) {
  return (
    <article className="metric-card" data-testid={testId}>
      <div className={`metric-icon ${tone}`}>▤</div>
      <p className="metric-value">{value}</p>
      <p className="metric-label">{label}</p>
    </article>
  );
}

type DashboardPageProps = {
  tasks: Task[];
};

export function DashboardPage({ tasks }: DashboardPageProps) {
  const toDo = tasks.filter((task) => task.status === 'To Do').length;
  const inProgress = tasks.filter((task) => task.status === 'In Progress').length;
  const blocked = tasks.filter((task) => task.status === 'Blocked').length;
  const done = tasks.filter((task) => task.status === 'Done').length;

  return (
    <div>
      <header className="page-header">
        <h1>Dashboard</h1>
        <p>Overview of construction project tasks and activities</p>
      </header>

      <section className="metrics-grid">
        <DashboardMetric value={toDo} label="To Do" tone="blue" testId="metric-todo" />
        <DashboardMetric value={inProgress} label="In Progress" tone="blue" testId="metric-in-progress" />
        <DashboardMetric value={blocked} label="Blocked" tone="red" testId="metric-blocked" />
        <DashboardMetric value={done} label="Done" tone="green" testId="metric-done" />
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