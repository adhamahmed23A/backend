import { Router } from "express";
import { uploader } from "./utils/multer";
import { documentControllers } from "./document-controllers";
import { authMiddleware } from "../../shared/middlewares/auth-middleware";
const router = Router();

router.use(authMiddleware);
/**
 * POST /api/document/upload
 * Upload a PDF (multipart/form-data, field "file", max 10 MB).
 * Stores the file, creates a document with status "pending".
 * Returns 202 with { documentId, status ,filePath }.
 */
router.post(
  "/upload",
  uploader.single("document"),
  documentControllers.uploadFile,
);

export default router;
