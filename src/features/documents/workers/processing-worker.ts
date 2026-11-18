import { Job, UnrecoverableError, Worker } from "bullmq";
import { DocumentConstants } from "../document-constants";
import { createWorkerConnection } from "../../../storage/redis";
import { documentLogger } from "../document-logger";
import { DocumentJob, DocumentJobResult } from "../types";
import { documentServices } from "../document-services";
import { documentRepositery } from "../document-repositery";
const processJob = async (job: DocumentJob): Promise<DocumentJobResult> => {
  const { documentId, documentPath } = job.data;
  try {
    await documentServices.processFile(documentId, documentPath);
  } catch (err) {
    documentLogger.error({ err }, "Error while processing the document");
  }
};
export const createProcessingWorker = () => {
  const connection = createWorkerConnection();
  const processingWorker = new Worker(
    DocumentConstants.ProcessingQueue,
    processJob,
    {
      connection,
    },
  );
  processingWorker.on("failed", async (job, err) => {
    if (!job) return;
    const isFinal =
      err instanceof UnrecoverableError ||
      job.attemptsMade >= (job.opts.attempts ?? 1);

    documentLogger.error(
      { documentId: job.data.documentId, attempt: job.attemptsMade },
      "Job failed",
    );

    if (isFinal) {
      await documentRepositery
        .updateMultipleDocumentFields(job.data.documentId, {
          status: "failed",
        })
        .catch((e) =>
          documentLogger.error({ err: e }, "Could not mark document as failed"),
        );
    }
  });
  processingWorker.on("ready", () =>
    documentLogger.info("Document worker ready"),
  );
  processingWorker.on("completed", (job) => {
    documentLogger.info(
      { jobId: job.id, documentId: job.data.documentId },
      "Document job completed",
    );
  });
  processingWorker.on("error", (err) =>
    documentLogger.error({ err }, "Document worker error"),
  );
  return { connection, processingWorker };
};
