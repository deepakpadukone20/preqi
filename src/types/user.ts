export interface User {
  id: string;
  name: string;
  surname: string;
  email: string;
  company?: string;
  jobTitle?: string;
}

export type CreateUserDto = Omit<User, 'id'>;
export type UpdateUserDto = User;
