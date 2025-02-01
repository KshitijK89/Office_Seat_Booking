import Seat from '../models/Seat.js';

// Get seats for a specific office
export const getSeats = async (req, res) => {
  try {
    const seats = await Seat.find({ officeId: req.query.officeId });
    res.status(200).json(seats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching seats' });
  }
};

// Book a seat
export const bookSeat = async (req, res) => {
  try {
    const { seatId, employeeId } = req.body;
    const seat = await Seat.findByIdAndUpdate(
      seatId,
      { status: 'Occupied', employeeId },
      { new: true }
    );
    res.status(200).json(seat);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

export const addSeats = async (req, res) => {
    try {
      const { officeId, totalSeats } = req.body;
      
      // Create array of seat objects
      const seatsToAdd = Array.from({ length: totalSeats }, (_, index) => ({
        officeId,
        seatNumber: index + 1, // Add seat numbering
        status: 'Available'
      }));
  
      // Insert seats and get created seat documents with IDs
      const createdSeats = await Seat.insertMany(seatsToAdd);
  
      res.status(201).json({
        success: true,
        seats: createdSeats.map(seat => ({
          id: seat._id,
          seatNumber: seat.seatNumber,
          officeId: seat.officeId,
          status: seat.status
        }))
      });
  
    } catch (error) {
      res.status(500).json({ 
        success: false,
        message: 'Error adding seats',
        error: error.message 
      });
    }
  };