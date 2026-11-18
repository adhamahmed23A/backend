import "dotenv/config";
import z from "zod";

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
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  GOOGLE_MODEL: z.string().min(1),
  GOOGLE_EMBEDDING_MODEL: z.string().min(1),
  GOOGLE_EMBEDDING_DIMENSION: z.coerce.number(),
  SUPABASE_URL: z.string().url(),
  SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
  SUPABASE_SECRET_KEY: z.string().min(1),
  SUPABASE_JWKS_URL: z.string().url(),
  STORAGE_DOCUMENTS_BUCKET: z.string().min(1),
  REDIS_HOST: z.string().min(1),
  REDIS_PORT: z.coerce.number(),
  REDIS_USERNAME: z.string().default("default"),
  REDIS_PASSWORD: z.string().min(1),
  RATE_LIMIT_MAX: z.coerce.number().int().positive(),
  RATE_LIMIT_WINDOW: z.coerce.number(),
});
const result = envSchema.safeParse(process.env);
if (!result.success) {
  console.error("Error while parsing environment varaibles", {
    error: result.error.flatten().fieldErrors,
  });
  process.exit(1);
}
export const env = result.data;
