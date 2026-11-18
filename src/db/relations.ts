import { betterAuthRelations } from "../features/auth/auth-relations";
import { documentRelations } from "../features/documents/document-relations";
import { chatRelations } from "../features/chat/chat-relations";

export const relations = {
  ...betterAuthRelations,
  ...documentRelations,
  ...chatRelations,
};
