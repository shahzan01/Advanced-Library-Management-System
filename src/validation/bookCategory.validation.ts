import { z } from "zod";

export const bookCategorySchema = z.object({
  bookId: z.string().uuid("Invalid book ID"),
  categoryId: z.string().uuid("Invalid category ID"),
});

export type BookCategoryInput = z.infer<typeof bookCategorySchema>;
