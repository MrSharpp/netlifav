import z from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(["Development", "Production"]),
  PORT: z.string(),
});

const config = envVarsSchema.parse(process.env);

export { config };
