import * as multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: path.resolve(__dirname, '..', '..', 'uploads'),
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

export default storage;
