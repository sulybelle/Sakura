import express from 'express';
import { getAllTracks, getTrackById, createTrack, updateTrack, deleteTrack, searchTracks } from '../controllers/trackController.js';
import { protect, admin } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.get('/', getAllTracks);
router.get('/search', searchTracks);
router.get('/:id', getTrackById);
router.post('/', protect, upload.fields([{ name: 'audio', maxCount: 1 }, { name: 'image', maxCount: 1 }]), createTrack);
router.put('/:id', protect, admin, updateTrack);
router.delete('/:id', protect, admin, deleteTrack);

export default router;