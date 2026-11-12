import dotenv from "dotenv";
dotenv.config();
import z from "zod";
console.log(process.env.PORT);
const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  LOG_LEVEL: z
    .enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"])
    .default("info"),
  DATABASE_URL: z.string().min(1),
  BETTER_AUTH_SECRET: z.string().min(1),
  BETTER_AUTH_URL: z.url(),
  GOOGLE_CLIENT_ID: z.string().min(1),
  GOOGLE_CLIENT_SECRET: z.string().min(1),
  GENERATIVE_API_KEY: z.string().min(1),
  GOOGLE_MODEL: z.string().min(1),
});
const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("Error while parsing environment varaibles", {
    error: result.error.flatten().fieldErrors,
  });
  process.exit(1);
}
export const env = result.data;
