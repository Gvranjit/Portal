import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { v1 as uuid } from 'uuid';
// Use path.resolve from the workspace root to target service folder
const uploadFolder = path.resolve(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (fs.existsSync(uploadFolder) === false) {
      console.log('Create upload folder:', uploadFolder);
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    cb(null, uuid());
  },
});
const upload = multer({ storage: storage });
export { upload };
