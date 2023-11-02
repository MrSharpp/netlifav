import { z } from "zod";

export const signupSchema = z.object({
  body: z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string(),
  }),
});

export const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type TCreateUser = z.infer<typeof signupSchema>["body"];
