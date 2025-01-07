import { z } from "zod";

export const borrowedBookSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  bookId: z.string().uuid("Invalid book ID"),
  borrowedAt: z.date().optional(),
  dueDate: z.date(),
  returnedAt: z.date().optional(),
  fine: z.number().nonnegative("Fine must be a non-negative number").optional(),
});

export type BorrowedBookInput = z.infer<typeof borrowedBookSchema>;
