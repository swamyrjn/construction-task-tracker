import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import App from './App';

describe('App navigation', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('shows dashboard by default and switches pages from sidebar', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    expect(screen.getByRole('heading', { name: 'Task Tracker' })).toBeInTheDocument();
  });

  it('updates dashboard metrics after task status change', () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    const select = screen.getByLabelText('Status for Safety Inspection - Block B');
    fireEvent.change(select, { target: { value: 'Done' } });

    fireEvent.click(screen.getByLabelText('Dashboard'));
    expect(within(screen.getByTestId('metric-done')).getByText('2')).toBeInTheDocument();
  });

  it('rolls back status and shows error alert on simulated failure', async () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    const select = screen.getByLabelText('Status for Safety Inspection - Block B');

    fireEvent.change(select, { target: { value: 'Blocked' } });
    expect(select).toHaveValue('Blocked');

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Status update failed. Previous value has been restored.');
    });

    expect(screen.getByLabelText('Status for Safety Inspection - Block B')).toHaveValue('To Do');

    fireEvent.click(screen.getByLabelText('Dashboard'));
    expect(within(screen.getByTestId('metric-todo')).getByText('2')).toBeInTheDocument();
    expect(within(screen.getByTestId('metric-blocked')).getByText('1')).toBeInTheDocument();
  });
});