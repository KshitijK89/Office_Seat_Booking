import express from 'express';
const router = express.Router();
import { getSeats, bookSeat, addSeats } from '../controllers/seatController.js';
import { protect, adminOnly } from '../middleware/auth.js';

router.get('/', getSeats);
router.post('/book', bookSeat);
router.post('/add', protect, adminOnly, addSeats);
export default router;