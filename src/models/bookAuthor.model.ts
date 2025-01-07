import { Book } from "./book.model";
import { Author } from "./author.model";

export interface BookAuthor {
  id: string;
  bookId: string;
  authorId: string;

  book?: Book;
  author?: Author;
}
