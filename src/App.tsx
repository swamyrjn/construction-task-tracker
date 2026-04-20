import { useState } from 'react';
import { Sidebar, type NavKey } from './components/Sidebar';
import { DashboardPage } from './pages/DashboardPage';
import { SettingsPage } from './pages/SettingsPage';
import { TaskTrackerPage } from './pages/TaskTrackerPage';
import { TeamPage } from './pages/TeamPage';
import { TaskProvider } from './state/TaskContext';

function App() {
  const [page, setPage] = useState<NavKey>('dashboard');

  const pageMap: Record<NavKey, JSX.Element> = {
    dashboard: <DashboardPage />,
    tasks: <TaskTrackerPage />,
    team: <TeamPage />,
    settings: <SettingsPage />
  };

  return (
    <TaskProvider>
      <div className="app-shell">
        <Sidebar current={page} onSelect={setPage} />
        <main className="content">{pageMap[page]}</main>
      </div>
    </TaskProvider>
  );
}

export default App;