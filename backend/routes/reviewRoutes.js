import express from 'express';
import { getReviewsForTrack, createReview, updateReview, deleteReview } from '../controllers/reviewController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router({ mergeParams: true });

router.route('/')
  .get(getReviewsForTrack)
  .post(protect, createReview);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

export default router;