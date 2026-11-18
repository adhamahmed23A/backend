import {
  index,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import * as schema from "../../db/schemas";

export const chat = pgTable(
  "chat",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => schema.user.id),
    documentId: uuid("document_id")
      .notNull()
      .references(() => schema.document.id, { onDelete: "cascade" }),
    title: text("title"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (t) => [index("chat_document_user_idx").on(t.documentId, t.userId)],
);
export const messages = pgTable(
  "messages",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    chatId: uuid("chat_id")
      .notNull()
      .references(() => chat.id, { onDelete: "cascade" }),
    role: text("role", { enum: ["user", "assistant"] }).notNull(),
    content: text("content").notNull(),
    sources:
      jsonb("sources").$type<{ chunkIndex: number; similarity: number }[]>(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("messages_chat_idx").on(t.chatId, t.createdAt)],
);
