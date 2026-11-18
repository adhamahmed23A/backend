import {
  index,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import * as schema from "../../db/schemas";
import { DocumentConstants } from "./document-constants";

export const DocumentStatus = pgEnum(
  "document_status",
  DocumentConstants.DocumentStatus,
);
export const document = pgTable(
  "document",
  {
    id: uuid().defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => schema.user.id, { onDelete: "cascade" }),
    fileName: text("file_name").notNull(),
    storagePath: text("storage_path").notNull(),
    pageCount: integer("page_count"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    status: DocumentStatus().notNull().default("pending"),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (t) => [
    index("document_id_idx").on(t.id),
    index("document_user_id_idx").on(t.userId),
  ],
);
