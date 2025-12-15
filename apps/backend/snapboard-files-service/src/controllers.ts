import { NextFunction, Request, Response } from 'express';
import { env } from './config.env';
import { prisma } from './client';
import { ANONYMOUS_USER } from './constants/defaults';
interface MulterRequest extends Request {
  file: Express.Multer.File;
}
export const uploadController = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: 'No file uploaded' });
    }
    // save the metadata for the uploaded file in database
    await prisma.snap.create({
      data: {
        filename: req.file.filename,
        mimeType: req.file.mimetype,
        size: req.file.size,
        createdBy: { connect: { email: ANONYMOUS_USER.email } },
      },
    });

    res.send({
      message: 'File uploaded successfully',
      url: new URL(`/i/${req.file.filename}`, env.BASE_URL),
    });
  } catch (error) {
    next(error);
  }
};
export const getSnapsController = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const snaps = await prisma.snap.findMany(); // TODO: Add pagination
    const payload = snaps.map((snap) => ({
      id: snap.id,
      filename: snap.filename,
      url: new URL(`/i/${snap.filename}`, env.BASE_URL).toString(),
      mimeType: snap.mimeType,
      size: snap.size,
    }));
    res.send({
      message: 'Snaps retrieved successfully',
      data: payload,
    });
  } catch (error) {
    next(error);
  }
};
