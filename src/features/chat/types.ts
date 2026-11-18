import z from "zod";
import { chatValidation } from "./validation/request-validation";
import * as schema from "../../db/schemas";

export type DocumentIdParams = z.infer<typeof chatValidation.documentIdParams>;
export type ChatIdParams = z.infer<typeof chatValidation.chatIdParams>;
export type ChatWithAiBody = z.infer<typeof chatValidation.chatWithAiBody>;
export type MessageSelect = typeof schema.messages.$inferSelect;
export type MessageInsert = typeof schema.messages.$inferInsert;
