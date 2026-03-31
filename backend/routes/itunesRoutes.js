import express from 'express';
import { searchTracks, getTrackById } from '../controllers/itunesController.js';

const router = express.Router();

router.get('/search', searchTracks);
router.get('/track/:id', getTrackById);

export default router;