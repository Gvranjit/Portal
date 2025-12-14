import { NextFunction, Request, Response } from 'express';
import { env } from './config.env';
interface MulterRequest extends Request {
  file: Express.Multer.File;
}
export const uploadController = (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }

    res.send({
      message: 'File uploaded successfully',
      url: new URL(`/i/${req.file.filename}`, env.BASE_URL),
    });
  } catch (error) {
    next(error);
  }
};
