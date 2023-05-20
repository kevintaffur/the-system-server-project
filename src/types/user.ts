export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rolId: number;
}

export type NewUser = Omit<User, "id" | "createdAt" | "updatedAt">;
