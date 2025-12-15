import express, { Request, Response, NextFunction } from 'express';
import * as path from 'path';
import routes from './routes';
import { uploadFolder } from './storage.config';
import morgan from 'morgan';
const app = express();

//create a user in database if not exists
// Anonymous user with id 'anon' is used for all uploads
import { prisma } from './client';

async function ensureAnonymousUser() {
  const anonUser = await prisma.user.findUnique({
    where: { id: 1 },
  });
  if (!anonUser) {
    await prisma.user.create({
      data: {
        name: 'Anonymous',
        email: 'anonymous@gauravranjit.com',
      },
    });
    console.log('Created anonymous user with id 1 and name Anonymous');
  }
}

app.use(morgan('dev'));
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/i', express.static(uploadFolder));
app.use(express.json());
app.use('/', routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ message: 'Internal Server Error' });
  console.error(error);
});
const port = process.env.PORT || 3333;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
  ensureAnonymousUser();
  console.log('Ensured anonymous user exists');
});
server.on('error', console.error);
