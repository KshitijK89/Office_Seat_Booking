import express from 'express';
import { getOffices, addOffice } from '../controllers/officeContoller.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getOffices);
router.post('/', protect, adminOnly, addOffice); // Only Admins can add offices

export default router;