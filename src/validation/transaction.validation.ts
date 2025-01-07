import { z } from "zod";

export const transactionSchema = z.object({
  // userId: z.string().uuid("Invalid user ID"),
  // borrowedBookId: z.string().uuid("Invalid borrowed Book Id"),

  userId: z.string(),
  borrowedBookId: z.string(),
  amount: z.number().positive("Amount must be a positive number").optional(),
  description: z.string().min(1, "Description is required"),
  createdAt: z.date().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
