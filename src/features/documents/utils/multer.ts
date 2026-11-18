import multer from "multer";
import { DocumentConstants } from "../document-constants";
import { documentErrors } from "../document-errors";
const { MaxFileSize, MaxFilesCount, AllowedFileTypes } = DocumentConstants;
const storage = multer.memoryStorage();
export const uploader = multer({
  storage,
  limits: {
    fileSize: MaxFileSize, // 10 MB
    files: MaxFilesCount, // 1 file
  },
  fileFilter: (req, file, cb) => {
    if (!AllowedFileTypes.includes(file.mimetype as any)) {
      return cb(documentErrors.invalidFileType(file.mimetype));
    }
    cb(null, true);
  },
});
