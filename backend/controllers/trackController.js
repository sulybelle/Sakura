import { Track, Artist, Review, User } from '../models/index.js';
import { Op } from 'sequelize';

export const getAllTracks = async (req, res) => {
  try {
    const tracks = await Track.findAll({
      include: [{ model: Artist, attributes: ['id', 'name', 'image'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTrackById = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id, {
      include: [
        { model: Artist, attributes: ['id', 'name', 'image'] },
        { model: Review, include: [{ model: User, attributes: ['id', 'username', 'avatar'] }] }
      ]
    });
    if (!track) return res.status(404).json({ message: 'Track not found' });
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createTrack = async (req, res) => {
  try {
    const { title, duration, artistId } = req.body; 
    if (!title || !file_url) return res.status(400).json({ message: 'Title and audio file required' });
    const track = await Track.create({ title, duration, file_url, cover_image, artistId });
    res.status(201).json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    await track.update(req.body);
    res.json(track);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTrack = async (req, res) => {
  try {
    const track = await Track.findByPk(req.params.id);
    if (!track) return res.status(404).json({ message: 'Track not found' });
    await track.destroy();
    res.json({ message: 'Track deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const searchTracks = async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json([]);
  try {
    const tracks = await Track.findAll({
      where: { title: { [Op.iLike]: `%${q}%` } },
      include: [{ model: Artist, attributes: ['id', 'name', 'image'] }],
      limit: 20,
    });
    res.json(tracks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};