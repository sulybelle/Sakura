import express from 'express';
import { getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/auth.js';
import { uploadAvatar } from '../middleware/upload.js';

const router = express.Router();

router.route('/:id')
  .get(getUserProfile)
  .put(protect, uploadAvatar, updateUserProfile);

export default router;