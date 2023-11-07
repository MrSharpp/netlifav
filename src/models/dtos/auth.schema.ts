import { z } from "zod";

export const signupSchema = z.object({
  email: z.string().email({ message: "Email should be valid" }),
  password: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email({ message: "Email should be valud" }),
  password: z.string(),
});

export type TCreateUser = z.infer<typeof signupSchema>["body"];
