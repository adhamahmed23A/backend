import { DefaultJobOptions } from "bullmq";

export const DocumentConstants = {
  DocumentStatus: {
    PENDING: "pending",
    PROCESSING: "processing",
    COMPLETED: "completed",
    FAILED: "failed",
  },
  ChunkSize: 1000,
  ChunkOverlap: 200,
  MaxFileSize: 10 * 1024 * 1024, // 10 MB
  MaxFilesCount: 1,
  AllowedFileTypes: [
    "application/pdf",
    "text/plain",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ] as const,
  ProcessingQueue: "document-processing-queue",
  DefaultJobOptions: {
    attempts: 3,
    backoff: { type: "exponential", delay: 5000 },
    removeOnComplete: 100,
    removeOnFail: 500,
  } as DefaultJobOptions,
} as const;
