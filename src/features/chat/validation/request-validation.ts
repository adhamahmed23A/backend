import z from "zod";

const documentIdParams = z.object({ documentId: z.uuid() });
const chatIdParams = z.object({ chatId: z.uuid() });
const chatWithAiBody = z.object({
  query: z.string().min(1, "The message is empty"),
});
export const chatValidation = {
  documentIdParams,
  chatIdParams,
  chatWithAiBody,
};
