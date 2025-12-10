import { Request, Response } from 'express';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}
export const uploadController = (req: MulterRequest, res: Response) => {
  if (!req.file) {
    return res.status(400).send({ message: 'No file uploaded' });
  }
  res.send({ message: 'File uploaded successfully', file: req.file });
};
