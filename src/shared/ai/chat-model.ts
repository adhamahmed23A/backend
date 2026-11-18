import { google } from "@ai-sdk/google";
import { env } from "../../config/env";
import { streamText, StreamTextOnEndCallback, ToolSet } from "ai";
import { chatLogger } from "../../features/chat/chat-logger";
import {
  buildUserMessage,
  CHAT_SYSTEM_PROMPT,
} from "../../features/chat/chat-prompts";
import { MessageSelect } from "../../features/chat/types";
const { GOOGLE_MODEL } = env;
const chatModel = google(GOOGLE_MODEL);
type RelevantContent = {
  chunkIndex: number;
  content: string;
  similarity: number;
}[];
export const generateStreamText = (
  relevantContent: RelevantContent,
  query: string,
  history: Pick<MessageSelect, "role" | "content">[],
  onEnd: StreamTextOnEndCallback,
) => {
  return streamText({
    model: chatModel,
    system: CHAT_SYSTEM_PROMPT,

    messages: [
      ...history,
      { role: "user", content: buildUserMessage(relevantContent, query) },
    ],
    onError: ({ error }) =>
      chatLogger.error({ err: error }, "Chat model stream failed"),
    onEnd,
  });
};
