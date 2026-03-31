import express from 'express';
import { getUserPlaylists, createPlaylist, getPlaylistById, addTrackToPlaylist, removeTrackFromPlaylist, deletePlaylist, updatePlaylist } from '../controllers/playlistController.js';
import { protect } from '../middleware/auth.js';
import { uploadPlaylistCover } from '../middleware/upload.js';

const router = express.Router();

router.route('/')
  .get(protect, getUserPlaylists)
  .post(protect, uploadPlaylistCover, createPlaylist);

router.route('/:id')
  .get(protect, getPlaylistById)
  .put(protect, uploadPlaylistCover, updatePlaylist)
  .delete(protect, deletePlaylist);

router.post('/:id/tracks', protect, addTrackToPlaylist);
router.delete('/:id/tracks/:trackId', protect, removeTrackFromPlaylist);

export default router;