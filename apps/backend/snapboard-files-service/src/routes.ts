// set up a basic route for the snapboard-files-service
import { Router, Request, Response } from 'express';
import { uploadController } from './controllers';
import { upload } from './storage.config';
const router = Router();

router.get('/api/health-check', (req: Request, res: Response) => {
  res.send({ message: 'Welcome to snapboard-files-service!' });
});

router.post('/api/upload', upload.single('file') as any, uploadController);

export default router;
