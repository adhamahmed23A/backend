import {
  index,
  integer,
  pgTable,
  text,
  vector,
  uuid,
} from "drizzle-orm/pg-core";
import * as schema from "../../db/schemas";
export const documentChunks = pgTable(
  "document_chunks",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    documentId: uuid("document_id")
      .notNull()
      .references(() => schema.document.id, { onDelete: "cascade" }),
    chunkIndex: integer("chunk_index").notNull(),
    content: text().notNull(),
    pageNumber: integer("page_number"),
    embedding: vector("embedding", { dimensions: 768 }).notNull(),
  },
  (t) => [
    index("document_chunks_document_id_idx").on(t.documentId),
    index("document_chunks_embedding_idx").using(
      "hnsw",
      t.embedding.op("vector_cosine_ops"),
    ),
  ],
);
