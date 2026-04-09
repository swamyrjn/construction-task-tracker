type NavKey = 'dashboard' | 'tasks' | 'team' | 'settings';

type SidebarProps = {
  current: NavKey;
  onSelect: (item: NavKey) => void;
};

const navItems: Array<{ key: NavKey; icon: string; label: string }> = [
  { key: 'dashboard', icon: '▦', label: 'Dashboard' },
  { key: 'tasks', icon: '☰', label: 'Task Tracker' },
  { key: 'team', icon: '👥', label: 'Team' },
  { key: 'settings', icon: '⚙', label: 'Settings' }
];

export function Sidebar({ current, onSelect }: SidebarProps) {
  return (
    <aside className="sidebar">
      <div className="logo">▼</div>
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-item ${item.key === current ? 'active' : ''}`}
            onClick={() => onSelect(item.key)}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
      </nav>
      <button className="help">?</button>
    </aside>
  );
}

export type { NavKey };