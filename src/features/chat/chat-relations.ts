import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../../db/schemas";

export const chatRelations = defineRelationsPart(schema, (r) => ({
  chat: {
    messages: r.many.messages({
      from: r.chat.id,
      to: r.messages.chatId,
    }),
  },
  messages: {
    chat: r.one.chat({
      from: r.messages.chatId,
      to: r.chat.id,
      optional: false,
    }),
  },
}));
