import { z } from "zod";

export const authorSchema = z.object({
  name: z.string().min(1, "Author name is required"),
});

export type AuthorInput = z.infer<typeof authorSchema>;
