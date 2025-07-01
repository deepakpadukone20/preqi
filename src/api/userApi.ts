import type { User, CreateUserDto, UpdateUserDto } from '@/types/user';

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

export const userApi = {
  async getUsers(): Promise<User[]> {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('Failed to fetch users');
    return res.json();
  },

  async createUser(userData: CreateUserDto): Promise<User> {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to create user');
    return res.json();
  },

  async updateUser(userData: UpdateUserDto): Promise<User> {
    const res = await fetch(`${API_URL}/${userData.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });
    if (!res.ok) throw new Error('Failed to update user');
    return res.json();
  },

  async deleteUser(id: string): Promise<void> {
    // Your FastAPI server currently does not support DELETE,
    // this is optional depending on future changes.
    console.warn('DELETE endpoint not implemented in backend',id);
    return Promise.resolve();
  },
};
