import { PDFParse } from "pdf-parse";
export const createPdfParser = (data: Buffer<ArrayBuffer>) =>
  new PDFParse({
    data,
  });
