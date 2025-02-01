// import express from 'express';
// const router = express.Router();
// import { getSeats, bookSeat, addSeats } from '../controllers/seatController.js';
// import { protect, adminOnly } from '../middleware/auth.js';

// router.get('/', getSeats);
// router.post('/book', bookSeat);
// router.post('/add', protect, adminOnly, addSeats);
// export default router;

import express from 'express';
import { addSeats, bookSeat, bookSeatsForTeam } from '../controllers/seatController.js';
import { protect, adminOnly } from '../middleware/auth.js';
import {isEmployee, isTeamLeader} from "../middleware/roleCheck.js"
import {addSeatsSchema,bookSeatSchema,bookSeatsForTeamSchema} from "../validations/authvalidation.js"
import { validate } from '../middleware/validate.js';
const router = express.Router();

// Add seats to an office (Admin-only)
router.post('/add', validate(addSeatsSchema),protect, adminOnly, addSeats);

// Book a single seat (for Employees)
router.post('/book', validate(bookSeatSchema),protect, isEmployee, bookSeat);

// Book multiple seats (for Team Leaders)
router.post('/book-team',validate(bookSeatsForTeamSchema), protect, isTeamLeader, bookSeatsForTeam);

export default router;