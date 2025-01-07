import { z } from "zod";

export const bookValidationSchema = z.object({
  isbn: z
    .string()
    .min(1, { message: "ISBN must be at least 1 characters" })
    .max(50, { message: "ISBN must be at most 50 characters" })
    .regex(/^\d+$/, { message: "ISBN must contain only numbers" }),
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().optional(),
  copies: z
    .number()
    .min(1, { message: "Copies must be at least 1" })
    .max(1000, { message: "Copies cannot exceed 1000" }),
  categories: z
    .array(z.string())
    .min(1, { message: "At least one category is required" }),
  authors: z
    .array(z.string())
    // .array(z.string().uuid())
    .min(1, { message: "At least one author is required" }),
});
