// src/tests/ThemeToggle.test.tsx
import { render, screen, fireEvent } from '../../test-utils';
import { ThemeToggle } from '@/components/ThemeToggle';

jest.mock('next-themes', () => {
  const actual = jest.requireActual('next-themes');
  return {
    ...actual,
    useTheme: jest.fn(() => ({ theme: 'light', setTheme: jest.fn() }))
  };
});

describe('ThemeToggle', () => {
  it('renders the toggle button', () => {
    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    expect(button).toBeInTheDocument();
  });

  it('calls setTheme when clicked', () => {
    const mockSetTheme = jest.fn();
    const useTheme = require('next-themes').useTheme;
    useTheme.mockReturnValue({ theme: 'light', setTheme: mockSetTheme });

    render(<ThemeToggle />);

    const button = screen.getByRole('button', { name: /toggle theme/i });
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });
});
