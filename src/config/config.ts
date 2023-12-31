import z from "zod";
import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "..", "..", ".env") });

const envVarsSchema = z.object({
  NODE_ENV: z.enum(["Development", "Production"]),
  PORT: z.string(),
  DB_HOST: z.string(),
  DB_USERNAME: z.string(),
  DB_PASSWORD: z.string(),
  ORM_LOGGING: z.boolean().default(false),
  APP_SECRET: z.string(),
});

const config = envVarsSchema.parse(process.env);

export { config };
