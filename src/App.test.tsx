import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

describe('App navigation', () => {
  it('shows dashboard by default and switches pages from sidebar', () => {
    render(<App />);

    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument();

    fireEvent.click(screen.getByLabelText('Task Tracker'));
    expect(screen.getByRole('heading', { name: 'Task Tracker' })).toBeInTheDocument();
  });
});