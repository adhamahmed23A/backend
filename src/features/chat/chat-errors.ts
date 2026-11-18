import { AppError } from "../../shared/errors/app-error";
import { HttpStatus } from "../../shared/http/http-status";

const createChatFailed = () =>
  new AppError(
    HttpStatus.INTERNAL_SERVER_ERROR,
    "CHAT_CREATION_FAILED",
    "Chat could not be created",
  );

const chatNotFound = () =>
  new AppError(HttpStatus.NOT_FOUND, "CHAT_NOT_FOUND", "Chat was not found");

const chatHistoryNotFound = () =>
  new AppError(
    HttpStatus.NOT_FOUND,
    "CHAT_HISTORY_NOT_FOUND",
    "Chat history was not found",
  );
export const chatErrors = {
  createChatFailed,
  chatNotFound,
  chatHistoryNotFound,
};
