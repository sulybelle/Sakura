import { Playlist, Track, PlaylistTrack, Artist } from '../models/index.js';

export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.findAll({
      where: { user_id: req.user.id },
      include: [{ model: Track, include: [{ model: Artist, attributes: ['id', 'name', 'image'] }] }],
    });
    res.json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { name, description, cover_image, play_mode } = req.body;
    const uploadedCover = req.file ? `/uploads/playlists/${req.file.filename}` : undefined;

    if (name !== undefined) playlist.name = name;
    if (description !== undefined) playlist.description = description;
    if (cover_image !== undefined || uploadedCover !== undefined) {
      playlist.cover_image = uploadedCover ?? cover_image;
    }
    if (play_mode === 'shuffle' || play_mode === 'sequence') {
      playlist.play_mode = play_mode;
    }

    await playlist.save();
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createPlaylist = async (req, res) => {
  try {
    const { name, description, cover_image, play_mode } = req.body;
    const uploadedCover = req.file ? `/uploads/playlists/${req.file.filename}` : undefined;
    const playlist = await Playlist.create({
      name,
      description,
      cover_image: uploadedCover ?? cover_image ?? null,
      play_mode: play_mode === 'shuffle' ? 'shuffle' : 'sequence',
      user_id: req.user.id,
    });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPlaylistById = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id, {
      include: [{ model: Track, through: { attributes: [] }, include: [{ model: Artist, attributes: ['id', 'name', 'image'] }] }],
    });
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    res.json(playlist);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const addTrackToPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    const track = await Track.findByPk(req.body.trackId);
    if (!track) return res.status(404).json({ message: 'Track not found' });

    await playlist.addTrack(track);
    res.json({ message: 'Track added' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const removeTrackFromPlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user_id !== req.user.id) return res.status(403).json({ message: 'Not authorized' });

    await PlaylistTrack.destroy({
      where: { playlistId: req.params.id, trackId: req.params.trackId }
    });
    res.json({ message: 'Track removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findByPk(req.params.id);
    if (!playlist) return res.status(404).json({ message: 'Playlist not found' });
    if (playlist.user_id !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await playlist.destroy();
    res.json({ message: 'Playlist deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};