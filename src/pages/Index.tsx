import { useState, useEffect } from 'react';
import type { User } from '@/types/user';
import { userApi } from '@/api/userApi';
import UserTable from '@/components/UserTable';
import UserForm from '@/components/UserForm';
import { useErrorHandler } from '@/hooks/useErrorHandler';
import { ThemeToggle } from '@/components/ThemeToggle';

const Index = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const { handleError, handleSuccess } = useErrorHandler();

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setInitialLoading(true);
        const fetchedUsers = await userApi.getUsers();
        setUsers(fetchedUsers);
        console.log('Users loaded successfully:', fetchedUsers.length);
      } catch (error) {
        handleError(error, 'Failed to load users. Please try again.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async (userData: {
    name: string;
    surname: string;
    email: string;
    company: string;
    jobTitle: string;
    id?: string;
  }): Promise<boolean> => {
    try {
      setLoading(true);

      if (editingUser && userData.id) {
        // Update existing user
        const updatedUser = await userApi.updateUser({
          id: userData.id,
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          company: userData.company,
          jobTitle: userData.jobTitle,
        });

        setUsers((prev) =>
          prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
        );

        handleSuccess('User updated successfully!');
        setEditingUser(null);
      } else {
        // Create new user
        const newUser = await userApi.createUser({
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          company: userData.company,
          jobTitle: userData.jobTitle,
        });

        setUsers((prev) => [...prev, newUser]);
        handleSuccess('User added successfully!');
      }
      return true;
    } catch (error) {
      handleError(error, 'Failed to save user. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    console.log('Editing user:', user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    console.log('Cancelled editing');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="bg-card border-b border-border px-4 py-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-foreground">
              User Management
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="p-4">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-foreground mb-2">
              User Management System
            </h1>
            <p className="text-lg text-muted-foreground">
              Manage your users with our intuitive interface
            </p>
          </header>

          <main className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-h-[calc(100vh-200px)]">
            {/* Users Table */}
            <section
              className="order-2 lg:order-1"
              aria-labelledby="users-table-title"
            >
              <UserTable
                users={users}
                onEditUser={handleEditUser}
                loading={initialLoading}
              />
            </section>

            {/* User Input Form */}
            <section
              className="order-1 lg:order-2"
              aria-labelledby="user-form-title"
            >
              <UserForm
                editingUser={editingUser}
                onSubmit={handleSubmit}
                onCancelEdit={handleCancelEdit}
                loading={loading}
              />
            </section>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
