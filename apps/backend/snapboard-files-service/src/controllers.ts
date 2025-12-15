import { NextFunction, Request, Response } from 'express';
import { env } from './config.env';
import { prisma } from './client';
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
    // // save the metadata for the uploaded file in database
    // prisma.snap.create({
    //   data: {},
    // });

    res.send({
      message: 'File uploaded successfully',
      url: new URL(`/i/${req.file.filename}`, env.BASE_URL),
    });
  } catch (error) {
    next(error);
  }
};
