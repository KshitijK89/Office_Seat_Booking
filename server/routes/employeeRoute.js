import express from 'express';
import { getEmployees, addEmployee } from '../controllers/employeeController.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// Get all employees
router.get('/', protect, adminOnly, getEmployees);

// Add a new employee (Admin-only)
router.post('/', protect, adminOnly, addEmployee);

export default router;