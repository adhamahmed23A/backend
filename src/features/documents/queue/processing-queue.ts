import { Queue } from "bullmq";
import { DocumentConstants } from "../document-constants";
import { redisConnection } from "../../../storage/redis";
import { DocumentJobData, DocumentJobName, DocumentJobResult } from "../types";
export const processingQueue = new Queue<
  DocumentJobData,
  DocumentJobResult,
  DocumentJobName
>(DocumentConstants.ProcessingQueue, {
  connection: redisConnection,
  defaultJobOptions: DocumentConstants.DefaultJobOptions,
});
