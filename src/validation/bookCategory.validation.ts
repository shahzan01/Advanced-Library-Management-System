import { z } from "zod";

export const bookCategorySchema = z.object({
  // bookId: z.string().uuid("Invalid book ID"),
  // categoryId: z.string().uuid("Invalid category ID"),
  bookId: z.string(),
  categoryId: z.string(),
});

export type BookCategoryInput = z.infer<typeof bookCategorySchema>;
