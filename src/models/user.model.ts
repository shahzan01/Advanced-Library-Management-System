export enum Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  emailVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}
