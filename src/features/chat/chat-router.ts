import { Router } from "express";
import { authMiddleware } from "../../shared/middlewares/auth-middleware";
import { requestValidationMiddleware } from "../../shared/middlewares/request-validation-middleware";
import { chatValidation } from "./validation/request-validation";
import { chatControllers } from "./chat-controllers";
const router = Router();

router.use(authMiddleware);
/**
 * POST /api/chat/:documentId/new
 * Create a new chat depending on the document id
 * Check first the document status to === "completed".
 * Returns 201 with { chatId }.
 */
router.post(
  "/:documentId/new",
  requestValidationMiddleware(chatValidation.documentIdParams, "params"),
  chatControllers.createNewChat,
);
/**
 * GET /api/chat/:chatId
 * Returns the chat's messages in chronological order.
 */
router.get(
  "/:chatId",
  requestValidationMiddleware(chatValidation.chatIdParams, "params"),
  chatControllers.getChatHistory,
);
/**
 * POST /api/chat/:chatId
 * Chatting with ai model (one message for the user and other for ai assistant).
 */
router.post(
  "/:chatId",
  requestValidationMiddleware(chatValidation.chatIdParams, "params"),
  requestValidationMiddleware(chatValidation.chatWithAiBody, "body"),
  chatControllers.chatWithAi,
);

export default router;
