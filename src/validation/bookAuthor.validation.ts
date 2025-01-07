import { z } from "zod";

export const bookAuthorSchema = z.object({
  bookId: z.string(),
  authorId: z.string(),
  // bookId: z.string().uuid("Invalid book ID"),
  // authorId: z.string().uuid("Invalid author ID"),
});

export type BookAuthorInput = z.infer<typeof bookAuthorSchema>;
