export const SessionData = {
  expiresIn: 60 * 60 * 24 * 7, // 7 days
  updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
} as const;
