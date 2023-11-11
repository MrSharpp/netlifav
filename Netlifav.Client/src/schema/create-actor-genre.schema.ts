import z from "zod";

export const CreateActorOrGenreSchema = z.object({
  name: z.string().min(1),
});
