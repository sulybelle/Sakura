import { Review, User, Track } from '../models/index.js';

export const getReviewsForTrack = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { trackId: req.params.trackId },
      include: [{ model: User, attributes: ['id', 'username', 'avatar'] }],
      order: [['createdAt', 'DESC']],
    });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;
    const track = await Track.findByPk(req.params.trackId);
    if (!track) return res.status(404).json({ message: 'Track not found' });

    const existing = await Review.findOne({ where: { userId: req.user.id, trackId: req.params.trackId } });
    if (existing) return res.status(400).json({ message: 'You already reviewed this track' });

    const review = await Review.create({ rating, comment, userId: req.user.id, trackId: req.params.trackId });
    res.status(201).json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== req.user.id) return res.status(403).json({ message: 'Not authorized' });
    await review.update(req.body);
    res.json(review);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findByPk(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    if (review.userId !== req.user.id && req.user.role !== 'admin')
      return res.status(403).json({ message: 'Not authorized' });
    await review.destroy();
    res.json({ message: 'Review deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};