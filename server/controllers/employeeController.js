import Employee from '../models/Employee.js';

// Get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Add a new employee (Admin-only)
export const addEmployee = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if employee exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: 'Team already exists' });
    }

    // Create employee
    const employee = await Employee.create({ name, email, password, role });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: 'Error adding Team' });
  }
};