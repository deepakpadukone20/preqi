import { render, screen, waitFor } from '@testing-library/react';
import App from '@/App';
import '@testing-library/jest-dom';

describe('App Routing', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders Index page on root route', async () => {
    window.history.pushState({}, 'Home Page', '/');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /User Management System/i })).toBeInTheDocument();
    });
  });

  it('renders NotFound page on unknown route', async () => {
    window.history.pushState({}, '404 Page', '/non-existent');
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/Oops! Page not found/i)).toBeInTheDocument();
    });
  });
});
