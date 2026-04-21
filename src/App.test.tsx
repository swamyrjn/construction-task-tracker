import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App navigation', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('shows dashboard by default and switches pages from sidebar', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    expect(screen.getByRole('heading', { name: 'Task Tracker' })).toBeInTheDocument();
  });

  it('updates task status and refreshes dashboard status metrics', async () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));

    fireEvent.change(screen.getByLabelText('Status for Safety Inspection - Block B'), {
      target: { value: 'In Progress' }
    });

    expect(await screen.findByRole('alert')).toHaveTextContent('Status updated for Safety Inspection - Block B.');

    fireEvent.click(screen.getByLabelText('Dashboard'));

    await waitFor(() => {
      expect(screen.getByTestId('metric-to-do')).toHaveTextContent('1');
      expect(screen.getByTestId('metric-in-progress')).toHaveTextContent('2');
      expect(screen.getByTestId('metric-blocked')).toHaveTextContent('1');
      expect(screen.getByTestId('metric-done')).toHaveTextContent('1');
    });
  });

  it('rolls back status and shows an error message when update fails', async () => {
    render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));

    fireEvent.change(screen.getByLabelText('Status for Safety Inspection - Block B'), {
      target: { value: 'Blocked' }
    });

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Unable to update Safety Inspection - Block B. Previous status was restored.'
    );

    await waitFor(() => {
      expect(screen.getByLabelText('Status for Safety Inspection - Block B')).toHaveValue('To Do');
    });
  });

  it('persists status updates across app remounts', async () => {
    const { unmount } = render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    fireEvent.change(screen.getByLabelText('Status for Safety Inspection - Block B'), {
      target: { value: 'In Progress' }
    });

    await screen.findByText('Status updated for Safety Inspection - Block B.');

    unmount();
    render(<App />);

    fireEvent.click(screen.getByLabelText('Task Tracker'));

    expect(screen.getByLabelText('Status for Safety Inspection - Block B')).toHaveValue('In Progress');
  });
});