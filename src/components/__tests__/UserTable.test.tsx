// src/components/__tests__/UserTable.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import UserTable from '@/components/UserTable';
import type { User } from '@/types/user';

const mockUsers: User[] = [
  {
    id: 'abc123xyz789',
    name: 'Deepak',
    surname: 'Padukone',
    email: 'Deepak@example.com',
    company: 'Prequin',
    jobTitle: 'Engineer',
  },
  {
    id: 'def456uvw000',
    name: 'Ambika',
    surname: 'PM',
    email: 'amb@visa.com',
    company: 'Visa',
    jobTitle: 'Data Scientist',
  },
];

describe('UserTable', () => {
  it('renders user rows correctly', () => {
    const handleEdit = jest.fn();
    render(<UserTable users={mockUsers} onEditUser={handleEdit} />);

    expect(screen.getByText('Users Table (2 users)')).toBeInTheDocument();
    expect(screen.getByText('Deepak')).toBeInTheDocument();
    expect(screen.getByText('Ambika')).toBeInTheDocument();
  });

  it('calls onEditUser when Edit button is clicked', () => {
    const handleEdit = jest.fn();
    render(<UserTable users={mockUsers} onEditUser={handleEdit} />);

    const editButtons = screen.getAllByRole('button', { name: /Edit user/i });
    fireEvent.click(editButtons[0]);
    expect(handleEdit).toHaveBeenCalledWith(mockUsers[0]);
  });

  it('shows empty message when user list is empty', () => {
    render(<UserTable users={[]} onEditUser={() => {}} />);
    expect(
      screen.getByText('No users found. Add your first user using the form.')
    ).toBeInTheDocument();
  });

  it('renders loading state correctly', () => {
    render(<UserTable users={[]} onEditUser={() => {}} loading={true} />);
    expect(screen.getByRole('status')).toHaveTextContent('Loading users data...');
  });
});
