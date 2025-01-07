import { User } from "./user.model";

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  description: string;
  createdAt: Date;

  user?: User;
}
