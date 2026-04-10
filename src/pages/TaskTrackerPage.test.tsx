import { fireEvent, render, screen } from '@testing-library/react';
import { TaskTrackerPage } from './TaskTrackerPage';
import type { Task } from '../types';

const trackerTasks: Task[] = [
  {
    id: 1,
    name: 'Safety Inspection - Block B',
    description: 'desc',
    location: 'Block B',
    dueDate: 'Apr 9, 2026',
    priority: 'High',
    status: 'To Do',
    assignee: { initials: 'SC', name: 'Sarah Chen' }
  }
];

describe('TaskTrackerPage', () => {
  it('renders status options and dispatches status changes', () => {
    const onStatusChange = vi.fn();
    render(<TaskTrackerPage tasks={trackerTasks} onStatusChange={onStatusChange} />);

    const select = screen.getByLabelText('Status for Safety Inspection - Block B');
    expect(screen.getByRole('option', { name: 'To Do' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'In Progress' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Blocked' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Done' })).toBeInTheDocument();

    fireEvent.change(select, { target: { value: 'Done' } });
    expect(onStatusChange).toHaveBeenCalledWith(1, 'Done');
  });
});
