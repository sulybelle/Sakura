import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ensureDir = (targetPath) => {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
};

const storage = (subDir) => multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads', subDir);
    ensureDir(uploadDir);
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const safeExt = path.extname(file.originalname || '').toLowerCase() || '.jpg';
    cb(null, `${Date.now()}-${Math.round(Math.random() * 1e9)}${safeExt}`);
  },
});

const imageFilter = (req, file, cb) => {
  if (file.mimetype?.startsWith('image/')) cb(null, true);
  else cb(new Error('Only image files are allowed'));
};

export const uploadAvatar = multer({ storage: storage('avatars'), fileFilter: imageFilter }).single('avatar');
export const uploadPlaylistCover = multer({ storage: storage('playlists'), fileFilter: imageFilter }).single('cover');
