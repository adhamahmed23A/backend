import { and, eq } from "drizzle-orm";
import { db } from "../../db/client";
import * as schema from "../../db/schemas";

const insertNewChat = async (documentId: string, userId: string) => {
  const [chat] = await db
    .insert(schema.chat)
    .values({ documentId, userId })
    .returning({ id: schema.chat.id });
  return chat ?? null;
};

const findChatForUser = async (chatId: string, userId: string) => {
  const [chat] = await db
    .select({
      id: schema.chat.id,
      documentId: schema.chat.documentId,
    })
    .from(schema.chat)
    .where(and(eq(schema.chat.id, chatId), eq(schema.chat.userId, userId)))
    .limit(1);
  return chat ?? null;
};

export const chatRepositery = {
  insertNewChat,
  findChatForUser,
};
