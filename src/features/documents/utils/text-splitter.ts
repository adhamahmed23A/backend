import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { DocumentConstants } from "../document-constants";

const { ChunkOverlap, ChunkSize } = DocumentConstants;
export const textSplitter = new RecursiveCharacterTextSplitter({
  chunkSize: ChunkSize,
  chunkOverlap: ChunkOverlap,
});
