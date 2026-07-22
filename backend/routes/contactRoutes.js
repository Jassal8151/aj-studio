import express from 'express';
import {
  createContactInquiry,
  getContactInquiries,
  updateContactStatus,
} from '../controllers/contactController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
  .post(createContactInquiry)
  .get(protect, getContactInquiries);

router.route('/:id')
  .put(protect, updateContactStatus);

export default router;
