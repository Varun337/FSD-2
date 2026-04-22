import { render, screen } from '@testing-library/react';
import App from './App';

test('renders login form title', () => {
  render(<App />);
  const titleElement = screen.getByText(/login form/i);
  expect(titleElement).toBeInTheDocument();
});
