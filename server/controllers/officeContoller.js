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

// Add a new office
export const addOffice = async (req, res) => {
  try {
    const { name, location, totalSeats } = req.body;
    const office = new Office({ name, location, totalSeats });
    await office.save();
    res.status(201).json(office);
  } catch (error) {
    res.status(500).json({ message: 'Error adding office' });
  }
};