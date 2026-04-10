import { render, screen, within } from '@testing-library/react';
import { DashboardPage } from './DashboardPage';
import type { Task } from '../types';

const dashboardTasks: Task[] = [
  {
    id: 1,
    name: 'A',
    description: 'A',
    location: 'A',
    dueDate: 'Apr 1, 2026',
    priority: 'High',
    status: 'To Do',
    assignee: { initials: 'AA', name: 'A A' }
  },
  {
    id: 2,
    name: 'B',
    description: 'B',
    location: 'B',
    dueDate: 'Apr 2, 2026',
    priority: 'Medium',
    status: 'Blocked',
    assignee: { initials: 'BB', name: 'B B' }
  },
  {
    id: 3,
    name: 'C',
    description: 'C',
    location: 'C',
    dueDate: 'Apr 3, 2026',
    priority: 'Low',
    status: 'Done',
    assignee: { initials: 'CC', name: 'C C' }
  },
  {
    id: 4,
    name: 'D',
    description: 'D',
    location: 'D',
    dueDate: 'Apr 4, 2026',
    priority: 'Low',
    status: 'In Progress',
    assignee: { initials: 'DD', name: 'D D' }
  }
];

describe('DashboardPage', () => {
  it('calculates metrics from task statuses', () => {
    render(<DashboardPage tasks={dashboardTasks} />);

    expect(within(screen.getByTestId('metric-todo')).getByText('1')).toBeInTheDocument();
    expect(within(screen.getByTestId('metric-in-progress')).getByText('1')).toBeInTheDocument();
    expect(within(screen.getByTestId('metric-blocked')).getByText('1')).toBeInTheDocument();
    expect(within(screen.getByTestId('metric-done')).getByText('1')).toBeInTheDocument();
  });
});
