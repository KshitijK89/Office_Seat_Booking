import Employee from '../models/Employee.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Register a new employee (Admin or Employee)
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if employee exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Employee already exists' });
    }

    // Create employee
    const employee = await Employee.create({ name, email, password, role });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error registering employee' });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if employee exists
    const employee = await Employee.findOne({ email });
    if (!employee) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, employee.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: employee._id, role: employee.role },
      process.env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in' });
  }
};