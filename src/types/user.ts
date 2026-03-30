// src/types/user.ts

export type UserRole = 'student' | 'bde_member' | 'admin';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}
