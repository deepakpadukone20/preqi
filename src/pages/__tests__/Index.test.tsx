import { render, screen, waitFor } from '@testing-library/react';
import Index from '@/pages/Index';
import { userApi } from '@/api/userApi';

jest.mock('@/api/userApi');
jest.mock('@/hooks/useErrorHandler', () => ({
  useErrorHandler: () => ({
    handleError: jest.fn(),
    handleSuccess: jest.fn(),
  }),
}));

describe('Index Page', () => {
  it('renders and loads user data', async () => {
    (userApi.getUsers as jest.Mock).mockResolvedValue([
      {
        id: '1',
        name: 'John',
        surname: 'Doe',
        email: 'john@example.com',
        company: 'Example Co.',
        jobTitle: 'Engineer',
      },
    ]);

    render(<Index />);

    expect(
      screen.getByRole('heading', { name: /User Management System/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      const nameButtons = screen.getAllByRole('button', { name: /Name: John/i });
      const emailButtons = screen.getAllByRole('button', { name: /Email: john@example.com/i });

      expect(nameButtons.length).toBeGreaterThan(0);
      expect(emailButtons.length).toBeGreaterThan(0);
    });
  });
});
