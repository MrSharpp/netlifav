import { z } from "zod";

const movieSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Movie name should be atleast of 3 characters" }),
  ratings: z.enum(["1", "2", "3", "4", "5"]),
  casts: z.string().min(3),
  genre: z.string().min(3),
  release: z.string(),
});

export { movieSchema };
