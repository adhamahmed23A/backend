import { drizzle } from "drizzle-orm/neon-http";
import { env } from "../config/env";
const { DATABASE_URL } = env;
import { relations } from "./relations";
export const db = drizzle(DATABASE_URL, {
  relations,
});
