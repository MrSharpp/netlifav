import z from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, "Password is required"),
});

export const SignupSchema = LoginSchema.extend({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
});
