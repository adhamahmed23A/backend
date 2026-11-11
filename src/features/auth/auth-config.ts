import { BetterAuthOptions } from "better-auth";
import { env } from "../../config/env";
export type AuthConfig = Pick<
  BetterAuthOptions,
  "emailAndPassword" | "socialProviders"
>;
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = env;
export const AuthConfigOptions: AuthConfig = {
  emailAndPassword: {
    enabled: true,
    revokeSessionsOnPasswordReset: true,
    autoSignIn: true,
  },
  socialProviders: {
    google: {
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    },
  },
};
