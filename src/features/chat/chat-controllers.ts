import { pipeTextStreamToResponse, toTextStream } from "ai";
import { RequestHandler } from "express";
import { asyncHandler } from "../../shared/utils/async-handler";
import { ChatIdParams, ChatWithAiBody, DocumentIdParams } from "./types";
import { chatServices } from "./chat-services";
import { sendSuccess } from "../../shared/http/send-response";
import { HttpStatus } from "../../shared/http/http-status";

const createNewChat: RequestHandler = asyncHandler(async (req, res, next) => {
  const { documentId } = req.params as DocumentIdParams;
  const userId = req.user?.id!;
  const { chatId } = await chatServices.createNewChat(documentId, userId);
  return sendSuccess(res, { chatId }, HttpStatus.CREATED);
});

const getChatHistory: RequestHandler = asyncHandler(async (req, res) => {
  const { chatId } = req.params as ChatIdParams;
  const userId = req.user?.id!;
  const history = await chatServices.getChatHistory(chatId, userId);
  return sendSuccess(res, history, HttpStatus.OK);
});
const chatWithAi: RequestHandler = asyncHandler(async (req, res) => {
  const { query } = req.body as ChatWithAiBody;
  const { chatId } = req.params as ChatIdParams;
  const userId = req.user?.id!;
  const result = await chatServices.chatWithAi(chatId, userId, query);
  await pipeTextStreamToResponse({
    response: res,
    stream: toTextStream({ stream: result.stream }),
    status: HttpStatus.OK,
  });
});
export const chatControllers = {
  createNewChat,
  getChatHistory,
  chatWithAi,
};
