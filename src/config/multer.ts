import { Request } from "express";
import multer, { FileFilterCallback } from "multer";
import crypto from "crypto";
import { GridFsStorage } from "multer-gridfs-storage";

const dbURI: string | undefined = process.env.DB_URI;

const storage = new GridFsStorage({
  // @ts-ignore
  url: dbURI,
  file: (_req: Request, _files: FileCallback): Promise<unknown> => {
    return new Promise((resolve: any, _reject: unknown) => {
      const buf: string = crypto.randomUUID();
      const fileInfo = {
        fileName: buf,
        bucketName: "uploads",
      };
      resolve(fileInfo);
    });
  },
});

const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
): void => {
  const fileEnum = ["image/png", "image/jpg", "image/jpeg"];
  if (!fileEnum.includes(file.mimetype)) {
    cb(new Error("Wrong mimetype!"));
  }
  cb(null, true);
};

const upload = multer({ storage, fileFilter });

export default upload;
