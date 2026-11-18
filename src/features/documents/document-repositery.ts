import {
  and,
  cosineDistance,
  desc,
  eq,
  gt,
  Placeholder,
  sql,
  SQL,
} from "drizzle-orm";
import { db } from "../../db/client";
import * as schema from "../../db/schemas";
import { DocumentChunksInsert, DocumentSelect, DocumentStatus } from "./types";

const insertNewDocument = async (
  userId: string | SQL<unknown> | Placeholder<string, any>,
  fileName: string,
  storagePath: string,
) => {
  const [doc] = await db
    .insert(schema.document)
    .values({
      userId,
      fileName,
      storagePath,
      pageCount: 0,
    })
    .returning();
  return doc ?? null;
};
const insertNewDocumentChunks = async (chunks: DocumentChunksInsert[]) => {
  const [doc] = await db
    .insert(schema.documentChunks)
    .values(chunks)
    .returning();
  return doc ?? null;
};
const findDocumentById = async (documentId: string) => {
  const [doc] = await db
    .select()
    .from(schema.document)
    .where(eq(schema.document.id, documentId));
  return doc ?? null;
};
const findDocumentForUser = async (documentId: string, userId: string) => {
  const [doc] = await db
    .select()
    .from(schema.document)
    .where(
      and(
        eq(schema.document.id, documentId),
        eq(schema.document.userId, userId),
      ),
    );
  return doc ?? null;
};
const findRelevantBySimilaraity = async (
  embeddedQuery: number[],
  documentId: string,
) => {
  const similarity = sql<number>`1 - (${cosineDistance(schema.documentChunks.embedding, embeddedQuery)})`;
  const similarGuides = await db
    .select({
      chunkIndex: schema.documentChunks.chunkIndex,
      content: schema.documentChunks.content,
      similarity,
    })
    .from(schema.documentChunks)
    .where(
      and(
        eq(schema.documentChunks.documentId, documentId),
        gt(similarity, 0.5),
      ),
    )
    .orderBy((t) => desc(t.similarity))
    .limit(4);
  return similarGuides;
};
const updateDocumentStatus = async (
  documentId: string,
  status: DocumentStatus,
) => {
  const [doc] = await db
    .update(schema.document)
    .set({ status })
    .where(eq(schema.document.id, documentId))
    .returning();
  return doc ?? null;
};
const updateMultipleDocumentFields = async (
  documentId: string,
  fields: Partial<DocumentSelect>,
) => {
  const [doc] = await db
    .update(schema.document)
    .set(fields)
    .where(eq(schema.document.id, documentId))
    .returning();
  return doc ?? null;
};
export const documentRepositery = {
  insertNewDocument,
  findDocumentById,
  findDocumentForUser,
  findRelevantBySimilaraity,
  updateDocumentStatus,
  insertNewDocumentChunks,
  updateMultipleDocumentFields,
};
