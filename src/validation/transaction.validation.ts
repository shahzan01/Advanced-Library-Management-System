import { z } from "zod";

export const transactionSchema = z.object({
  userId: z.string().uuid("Invalid user ID"),
  amount: z.number().positive("Amount must be a positive number"),
  description: z.string().min(1, "Description is required"),
  createdAt: z.date().optional(),
});

export type TransactionInput = z.infer<typeof transactionSchema>;
