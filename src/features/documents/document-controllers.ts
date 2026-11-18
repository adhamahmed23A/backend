import { RequestHandler } from "express";
import { asyncHandler } from "../../shared/utils/async-handler";
import { documentErrors } from "./document-errors";
import { documentServices } from "./document-services";
import { sendSuccess } from "../../shared/http/send-response";
import { HttpStatus } from "../../shared/http/http-status";

const uploadFile: RequestHandler = asyncHandler(async (req, res, next) => {
  const file = req.file;
  if (!file) throw documentErrors.missingFile();
  const userId = req.user?.id!;
  // passing the file to service layer
  const {
    document: { id, status },
    filePath,
  } = await documentServices.uploadFile(userId, file);
  return sendSuccess(
    res,
    { documentId: id, status, filePath },
    HttpStatus.ACCEPTED,
  );
});

export const documentControllers = {
  uploadFile,
};
