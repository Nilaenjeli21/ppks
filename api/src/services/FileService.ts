import multer from 'multer';
import { Request, Response } from 'express';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'img/');
  },
  filename: function (req, file, cb) {
    console.log('File', file);
    cb(null, file.originalname);
  },
});

export const FileService = {
  async uploadSingleFile(req: Request, res: Response): Promise<void> {
    const upload = multer({ storage });
    return new Promise<void>((resolve, reject) => {
      upload.single('file')(req, res, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  },
  getFile: async (filename: string) => {
    return `http://${process.env.HOST}:${process.env.PORT}/img/${filename}`;
  },
};
