import { HttpStatus } from "./http-status";
import { Response } from "express";

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code: string;
    details?: unknown;
  };
}
export function sendSuccess<T>(
  res: Response<ApiResponse<T>>,
  data: T,
  statusCode: HttpStatus,
) {
  return res.status(statusCode).json({ success: true, data });
}
export function sendError(
  res: Response<ApiResponse<never>>,
  message: string,
  code: string,
  statusCode: HttpStatus,
  details?: unknown,
) {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message,
      details: details ? details : null,
    },
  });
}
