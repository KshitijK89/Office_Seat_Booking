import Office from '../models/Office.js';

// Get all offices
export const getOffices = async (req, res) => {
  try {
    const offices = await Office.find();
    res.status(200).json(offices);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching offices' });
  }
};

// Add office with floors
export const addOffice = async (req, res) => {
  try {
    const { name, location, floors } = req.body;

    // Simple validation
    if (!floors || floors.length === 0) {
      return res.status(400).json({ message: 'At least one floor is required' });
    }

    const office = await Office.create({ name, location, floors });
    res.status(201).json(office);
  } catch (error) {
    res.status(500).json({ message: 'Error adding office' });
  }
};