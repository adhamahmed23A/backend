import { Router } from "express";
import { chatModel } from "../../shared/ai/model";
import { generateText } from "ai";
import { logger } from "../../shared/logger/logger";
const router = Router();
router.post("/chat", async (req, res) => {
  const { message } = req.body as { message: string };
  try {
    const { text } = await generateText({
      model: chatModel,
      prompt: message,
    });
    res.json({ text });
  } catch (err) {
    logger.error({ err }, "Error while generating text");
    res.status(500).json({ error: "Internal Server Error" });
  }
});
export default router;
