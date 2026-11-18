import { google } from "@ai-sdk/google";
import { env } from "../../config/env";
import { DocumentChunksInsert } from "../../features/documents/types";
import { embed, embedMany } from "ai";
const { GOOGLE_EMBEDDING_MODEL } = env;
export const embeddingModel = google.embeddingModel(GOOGLE_EMBEDDING_MODEL);

export const generateEmbeddings = async (
  documentId: string,
  chunks: string[],
): Promise<DocumentChunksInsert[]> => {
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: chunks,
    dimensions: env.GOOGLE_EMBEDDING_DIMENSION,
  });
  // 6) Combine chunks and embeddings into your exact project schema
  return chunks.map((chunk, index) => ({
    documentId,
    chunkIndex: index,
    content: chunk,
    embedding: embeddings[index]!,
  }));
};
export const generateEmbedding = async (query: string): Promise<number[]> => {
  const { embedding } = await embed({
    model: embeddingModel,
    value: query,
    dimensions: env.GOOGLE_EMBEDDING_DIMENSION,
  });
  return embedding;
};
