import { AppError } from "../../shared/errors/app-error";
import { HttpStatus } from "../../shared/http/http-status";
const invalidFileType = (fileType: string) =>
  new AppError(
    HttpStatus.UNSUPPORTED_MEDIA_TYPE,
    "INVALID_FILE_TYPE",
    `Invalid file type: ${fileType}`,
  );
const missingFile = () =>
  new AppError(HttpStatus.NOT_FOUND, "MISSING_FILE", "No file uploaded");
const uploadToStorageFailed = (error: any) =>
  new AppError(
    HttpStatus.SERVICE_UNAVAILABLE,
    error.statusCode || "UPLOAD_FILE_TO_STORAGE_FAILED",
    error.message,
  );
const downloadFromStorageFailed = (error: any) =>
  new AppError(
    HttpStatus.SERVICE_UNAVAILABLE,
    error.statusCode || "DOWNLOAD_FILE_FROM_STORAGE_FAILED",
    error.message,
  );
const insertToDbFailed = () =>
  new AppError(
    HttpStatus.NOT_IMPLEMENTED,
    "INSERT_FILE_TO_DB_FAILED",
    "File is not inserted",
  );
const updateInDbFailed = () =>
  new AppError(
    HttpStatus.NOT_IMPLEMENTED,
    "UPDATE_FILE_IN_DB_FAILED",
    "File is not updated",
  );

const documentNotFound = () =>
  new AppError(
    HttpStatus.NOT_FOUND,
    "DOCUMENT_NOT_FOUND",
    "Document was not found",
  );

const documentNotReady = () =>
  new AppError(
    HttpStatus.CONFLICT,
    "DOCUMENT_NOT_READY",
    "Document processing is not complete",
  );
export const documentErrors = {
  invalidFileType,
  missingFile,
  uploadToStorageFailed,
  downloadFromStorageFailed,
  insertToDbFailed,
  updateInDbFailed,
  documentNotFound,
  documentNotReady,
};
