import express from 'express';
import {
  getPortfolioItems,
  createPortfolioItem,
  updatePortfolioItem,
  deletePortfolioItem,
} from '../controllers/portfolioController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .get(getPortfolioItems)
  .post(protect, createPortfolioItem);

router.route('/:id')
  .put(protect, updatePortfolioItem)
  .delete(protect, deletePortfolioItem);

export default router;
