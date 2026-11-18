import { defineRelationsPart } from "drizzle-orm";
import * as schema from "../../db/schemas";
export const documentRelations = defineRelationsPart(schema, (r) => ({
  user: {
    documents: r.many.document({
      from: r.user.id,
      to: r.document.userId,
    }),
  },
  document: {
    user: r.one.user({
      from: r.document.userId,
      to: r.user.id,
      optional: false,
    }),
    chunks: r.many.documentChunks({
      from: r.document.id,
      to: r.documentChunks.documentId,
    }),
  },
  documentChunks: {
    document: r.one.document({
      from: r.documentChunks.documentId,
      to: r.document.id,
      optional: false,
    }),
  },
}));
