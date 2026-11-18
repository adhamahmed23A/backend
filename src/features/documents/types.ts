import type { Job } from "bullmq";
import * as schema from "../../db/schemas";
export type DocumentJobData = { documentId: string; documentPath: string };
export type DocumentJobResult = void;
export type DocumentJobName = "process";
export type DocumentStatus = "pending" | "processing" | "completed" | "failed";
// Worker types
export type DocumentJob = Job<
  DocumentJobData,
  DocumentJobResult,
  DocumentJobName
>;
// Db types
export type DocumentChunksInsert = typeof schema.documentChunks.$inferInsert;
export type DocumentInsert = typeof schema.document.$inferInsert;
export type DocumentChunksSelect = typeof schema.documentChunks.$inferSelect;
export type DocumentSelect = typeof schema.document.$inferSelect;
