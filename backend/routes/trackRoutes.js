import express from 'express';
import { getAllTracks, getTrackById, createTrack, updateTrack, deleteTrack, searchTracks } from '../controllers/trackController.js';
import { protect, admin } from '../middleware/auth.js'; 

const router = express.Router();

router.get('/', getAllTracks);
router.get('/search', searchTracks);
router.get('/:id', getTrackById); 
router.put('/:id', protect, admin, updateTrack);
router.delete('/:id', protect, admin, deleteTrack);

export default router;