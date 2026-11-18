import { generateStreamText } from "../../shared/ai/chat-model";
import { generateEmbedding } from "../../shared/ai/embedding-model";
import { documentErrors } from "../documents/document-errors";
import { documentRepositery } from "../documents/document-repositery";
import { chatErrors } from "./chat-errors";
import { chatLogger } from "./chat-logger";
import { chatRepositery } from "./chat-repositery";
import { messageRepositery } from "./message-repositery";
import { MessageInsert } from "./types";

const createNewChat = async (documentId: string, userId: string) => {
  const document = await documentRepositery.findDocumentForUser(
    documentId,
    userId,
  );
  if (!document) throw documentErrors.documentNotFound();
  if (document.status !== "completed") throw documentErrors.documentNotReady();

  const chat = await chatRepositery.insertNewChat(documentId, userId);
  if (!chat) throw chatErrors.createChatFailed();
  return { chatId: chat.id };
};

const getChatHistory = async (chatId: string, userId: string) => {
  const chat = await chatRepositery.findChatForUser(chatId, userId);
  if (!chat) throw chatErrors.chatNotFound();

  const messages = await messageRepositery.findMessagesByChatId(chat.id);
  if (messages.length === 0) throw chatErrors.chatHistoryNotFound();
  return { chatId: chat.id, messages };
};
const chatWithAi = async (chatId: string, userId: string, query: string) => {
  const chat = await chatRepositery.findChatForUser(chatId, userId);

  if (!chat) throw chatErrors.chatNotFound();

  // 1) generate query embedding
  const embeddedQuery = await generateEmbedding(query);
  // 2) retrieve similar chunks
  const relevantContent = await documentRepositery.findRelevantBySimilaraity(
    embeddedQuery,
    chat.documentId,
  );
  const history = await messageRepositery.getRecentMessages(chatId);

  return generateStreamText(
    relevantContent,
    query,
    history,
    async ({ text }) => {
      const messages: MessageInsert[] = [
        {
          role: "assistant",
          chatId,
          content: text,
        },
        {
          role: "user",
          chatId,
          content: query,
        },
      ];
      try {
        await messageRepositery.insertMessages(messages);
      } catch (err) {
        chatLogger.error({ err, chatId }, "Failed to save exchange messages");
      }
    },
  );
};
export const chatServices = {
  createNewChat,
  getChatHistory,
  chatWithAi,
};
