import { randomUUID } from "crypto";
import { documentErrors } from "./document-errors";
import { documentStorage } from "./document-storage";
import { documentRepositery } from "./document-repositery";
import { processingQueue } from "./queue/processing-queue";
import { createPdfParser } from "./utils/pdf-parser";
import { textSplitter } from "./utils/text-splitter";
import { generateEmbeddings } from "../../shared/ai/embedding-model";

const buildStoragePath = (userId: string, fileName: string) =>
  `${userId}/${randomUUID()}-${fileName}`;

const uploadFile = async (userId: string, file: Express.Multer.File) => {
  const filePath = buildStoragePath(userId, file.originalname);
  // uploading to the supabase store
  const { data: storedFile, error: storageError } =
    await documentStorage.upload(filePath, file);
  if (storageError) throw documentErrors.uploadToStorageFailed(storageError);
  // uploading to the db
  const doc = await documentRepositery.insertNewDocument(
    userId,
    file.originalname,
    storedFile.path,
  );
  if (!doc) throw documentErrors.insertToDbFailed();
  await processingQueue.add("process", {
    documentId: doc.id,
    documentPath: doc.storagePath,
  });
  return {
    document: doc,
    filePath: storedFile.path,
  };
};
const processFile = async (documentId: string, documentPath: string) => {
  // 1) set current document status to processing (documentRepositery)
  const doc = await documentRepositery.updateDocumentStatus(
    documentId,
    "processing",
  );
  if (!doc) throw documentErrors.updateInDbFailed();
  // 2) retrieve file from the storage and buffer it
  const { data: downloadedFile, error: storageError } =
    await documentStorage.download(documentPath);
  if (storageError)
    throw documentErrors.downloadFromStorageFailed(storageError);
  const bufferdData = Buffer.from(await downloadedFile.arrayBuffer());
  // 3) parse the document
  const parser = createPdfParser(bufferdData);
  const { text, total: pageCount } = await parser.getText();

  // 4) chunking the text of the document
  const chunks = await textSplitter.splitText(text);
  // 5) embedding
  const result = await generateEmbeddings(documentId, chunks);
  // 6) saving the embedded text in the postgress vector relationship

  await documentRepositery.insertNewDocumentChunks(result);
  // 7) modifing the document status to completed and adding the page count
  await documentRepositery.updateMultipleDocumentFields(documentId, {
    status: "completed",
    pageCount,
  });
};
export const documentServices = {
  uploadFile,
  processFile,
};
