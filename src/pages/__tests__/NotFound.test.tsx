import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../NotFound';

describe('NotFound Page', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders 404 page with correct elements', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Oops! Page not found')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /return to home/i })).toBeInTheDocument();
  });
});
