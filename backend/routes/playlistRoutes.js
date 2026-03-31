import express from 'express';
import { getUserPlaylists, createPlaylist, getPlaylistById, addTrackToPlaylist, removeTrackFromPlaylist, deletePlaylist } from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserPlaylists)
  .post(protect, createPlaylist);

router.route('/:id')
  .get(protect, getPlaylistById)
  .delete(protect, deletePlaylist);

router.post('/:id/tracks', protect, addTrackToPlaylist);
router.delete('/:id/tracks/:trackId', protect, removeTrackFromPlaylist);

export default router;