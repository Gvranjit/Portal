import multer from 'multer';
import path from 'path';
import fs from 'fs';
import os from 'os';

// Use path.resolve from the workspace root to target service folder
const homeDir = os.homedir();
const uploadFolder = path.resolve(homeDir, 'snapboard', 'uploads '); // TODO; make sure ALL folders exist or create them if not
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (fs.existsSync(uploadFolder) === false) {
      console.log('Create upload folder:', uploadFolder);
      fs.mkdirSync(uploadFolder);
    }
    cb(null, uploadFolder);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now().toString(36); // base36 timestamp
    const random = Math.random().toString(36).slice(2, 7); // short random token
    const ext = path.extname(file.originalname);
    cb(null, `${timestamp}-${random}${ext}`);
  },
});
const upload = multer({ storage: storage });
export { upload, uploadFolder };
