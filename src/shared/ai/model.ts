import { google } from "@ai-sdk/google";
import { env } from "../../config/env";
const { GOOGLE_MODEL } = env;
export const chatModel = google(GOOGLE_MODEL);
