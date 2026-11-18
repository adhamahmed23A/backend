import { supabase } from "../../storage/supabase";
import { env } from "../../config/env";
const { STORAGE_DOCUMENTS_BUCKET } = env;
const upload = async (filePath: string, file: Express.Multer.File) => {
  return await supabase.storage
    .from(STORAGE_DOCUMENTS_BUCKET)
    .upload(filePath, file.buffer, {
      contentType: file.mimetype,
    });
};
const download = async (filePath: string) => {
  return await supabase.storage
    .from(STORAGE_DOCUMENTS_BUCKET)
    .download(filePath);
};
export const documentStorage = { upload, download };
