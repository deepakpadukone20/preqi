// src/components/__tests__/UserForm.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import UserForm from '../UserForm';
import type { User } from '@/types/user';

const mockUser: User = {
  id: '1',
  name: 'Deepa',
  surname: 'K',
  email: 'deepa@eka.com',
  company: 'EKA Inc',
  jobTitle: 'Engineer',
};

describe('UserForm', () => {
  it('renders the form fields correctly', () => {
    render(
      <UserForm editingUser={null} onSubmit={jest.fn()} onCancelEdit={jest.fn()} />
    );
    expect(screen.getByLabelText('Name *')).toBeInTheDocument();
    expect(screen.getByLabelText('Surname *')).toBeInTheDocument();
    expect(screen.getByLabelText('Email *')).toBeInTheDocument();
    expect(screen.getByLabelText('Company *')).toBeInTheDocument();
    expect(screen.getByLabelText('JobTitle *')).toBeInTheDocument();
  });

  it('shows validation errors if fields are empty', async () => {
    render(
      <UserForm editingUser={null} onSubmit={jest.fn()} onCancelEdit={jest.fn()} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));

    await waitFor(() => {
      expect(screen.getByText('Name is required')).toBeInTheDocument();
      expect(screen.getByText('Surname is required')).toBeInTheDocument();
      expect(screen.getByText('Email is required')).toBeInTheDocument();
      expect(screen.getByText('Company is required')).toBeInTheDocument();
      expect(screen.getByText('Job Title is required')).toBeInTheDocument();
    });
  });

  it('submits form with valid data and clears it', async () => {
    const mockSubmit = jest.fn().mockResolvedValue(true);
    render(<UserForm editingUser={null} onSubmit={mockSubmit} onCancelEdit={jest.fn()} />);

    fireEvent.change(screen.getByLabelText('Name *'), { target: { value: 'Pushpendra' } });
    fireEvent.change(screen.getByLabelText('Surname *'), { target: { value: 'Rao' } });
    fireEvent.change(screen.getByLabelText('Email *'), { target: { value: 'p.rao@reddifmail.com' } });
    fireEvent.change(screen.getByLabelText('Company *'), { target: { value: 'Aum Ltd' } });
    fireEvent.change(screen.getByLabelText('JobTitle *'), { target: { value: 'Manager' } });

    fireEvent.click(screen.getByRole('button', { name: /Add User/i }));

    await waitFor(() => {
      expect(mockSubmit).toHaveBeenCalledWith({
        name: 'Pushpendra',
        surname: 'Rao',
        email: 'p.rao@reddifmail.com',
        company: 'Aum Ltd',
        jobTitle: 'Manager',
      });
    });
  });

  it('calls onCancelEdit when cancel is clicked during edit', () => {
    const onCancelEdit = jest.fn();
    render(
      <UserForm editingUser={mockUser} onSubmit={jest.fn()} onCancelEdit={onCancelEdit} />
    );
    fireEvent.click(screen.getByRole('button', { name: /Cancel/i }));
    expect(onCancelEdit).toHaveBeenCalled();
  });
});
