import { User } from "./user.model";
import { Book } from "./book.model";

export interface BorrowedBook {
  id: string;
  userId: string;
  bookId: string;
  borrowedAt: Date;
  dueDate: Date;
  returnedAt?: Date;
  fine: number;

  user?: User;
  book?: Book;
}
