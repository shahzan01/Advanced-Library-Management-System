import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required").max(50),
  email: z.string().email("Invalid email format").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255),
  role: z.enum(["ADMIN", "MEMBER"]),
  emailVerified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
});

export const userLoginSchema = z.object({
  name: z.string().min(1, "Name is required").max(50).optional(),
  email: z.string().email("Invalid email format").max(255),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(255),
  role: z.enum(["ADMIN", "MEMBER"]),
  emailVerified: z.boolean().optional(),
  isDeleted: z.boolean().optional(),
  otp: z.string().optional(),
});

export type UserInput = z.infer<typeof userSchema>;
