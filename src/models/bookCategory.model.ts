import { Book } from "./book.model";
import { Category } from "./category.model";

export interface BookCategory {
  id: string;
  bookId: string;
  categoryId: string;

  book?: Book;
  category?: Category;
}
