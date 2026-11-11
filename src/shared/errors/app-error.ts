// shared/errors/app-error.ts
import { HttpStatus } from "../http/http-status";

export class AppError extends Error {
  readonly isOperational = true;

  constructor(
    public readonly statusCode: HttpStatus,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
    options?: { cause?: unknown },
  ) {
    super(message, options);
    this.name = new.target.name;
    Error.captureStackTrace(this, new.target);
  }
}
