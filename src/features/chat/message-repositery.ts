import { asc, desc, eq } from "drizzle-orm";
import { db } from "../../db/client";
import * as schema from "../../db/schemas";
import { ChatConstants } from "./chat-constants";
import { MessageInsert } from "./types";

const { HistoryWindow } = ChatConstants;

const findMessagesByChatId = async (chatId: string) =>
  db
    .select({
      id: schema.messages.id,
      role: schema.messages.role,
      content: schema.messages.content,
      sources: schema.messages.sources,
      createdAt: schema.messages.createdAt,
    })
    .from(schema.messages)
    .where(eq(schema.messages.chatId, chatId))
    .orderBy(asc(schema.messages.createdAt));

const getRecentMessages = async (
  chatId: string,
  limit: number = HistoryWindow,
) => {
  const rows = await db
    .select({ role: schema.messages.role, content: schema.messages.content })
    .from(schema.messages)
    .where(eq(schema.messages.chatId, chatId))
    .orderBy(desc(schema.messages.createdAt)) // newest first, so limit keeps the latest N
    .limit(limit);

  return rows.reverse(); // flip to oldest -> newest, the order the model expects
};
const insertMessages = async (messages: MessageInsert[]) => {
  await db.insert(schema.messages).values(messages);
};
export const messageRepositery = {
  findMessagesByChatId,
  getRecentMessages,
  insertMessages,
};
