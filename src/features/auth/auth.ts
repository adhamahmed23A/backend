import { betterAuth, BetterAuthOptions } from "better-auth/minimal";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../../db/client"; // your drizzle instance
import { SessionData } from "./auth-constants";
import { AuthConfigOptions } from "./auth-config";
import * as schema from "../../db/schemas";
import { env } from "../../config/env";
const { BETTER_AUTH_URL } = env;
const options: BetterAuthOptions = {
  baseURL: BETTER_AUTH_URL,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  session: {
    expiresIn: SessionData.expiresIn,
    updateAge: SessionData.updateAge,
  },
  advanced: {
    useSecureCookies: true,
  },
  ...AuthConfigOptions,
};
export const auth = betterAuth(options);
export type Auth = typeof auth;
