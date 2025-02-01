// import Seat from '../models/Seat.js';

// // Get seats for a specific office
// export const getSeats = async (req, res) => {
//   try {
//     const seats = await Seat.find({ officeId: req.query.officeId });
//     res.status(200).json(seats);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching seats' });
//   }
// };

// // Book a seat
// export const bookSeat = async (req, res) => {
//   try {
//     const { seatId, employeeId } = req.body;
//     const seat = await Seat.findByIdAndUpdate(
//       seatId,
//       { status: 'Occupied', employeeId },
//       { new: true }
//     );
//     res.status(200).json(seat);
//   } catch (error) {
//     res.status(500).json({ message: `${error}` });
//   }
// };

// export const addSeats = async (req, res) => {
//     try {
//       const { officeId, totalSeats } = req.body;
      
//       // Create array of seat objects
//       const seatsToAdd = Array.from({ length: totalSeats }, (_, index) => ({
//         officeId,
//         seatNumber: index + 1, // Add seat numbering
//         status: 'Available'
//       }));
  
//       // Insert seats and get created seat documents with IDs
//       const createdSeats = await Seat.insertMany(seatsToAdd);
  
//       res.status(201).json({
//         success: true,
//         seats: createdSeats.map(seat => ({
//           id: seat._id,
//           seatNumber: seat.seatNumber,
//           officeId: seat.officeId,
//           status: seat.status
//         }))
//       });
  
//     } catch (error) {
//       res.status(500).json({ 
//         success: false,
//         message: 'Error adding seats',
//         error: error.message 
//       });
//     }
//   };

import Seat from '../models/Seat.js';

// Book a single seat (for Employees)
export const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.body;
    const employeeId = req.user.id; // Logged-in employee's ID

    // Check if the seat is available
    const seat = await Seat.findOne({ _id: seatId, status: 'Available' });
    
    if (!seat) {
      return res.status(400).json({ message: 'Seat is already occupied' });
    }

    // Book the seat for the employee
    const bookedSeat = await Seat.findByIdAndUpdate(
      seatId,
      { status: 'Occupied', employeeId },
      { new: true }
    );

    res.status(200).json({
      message: 'Seat booked successfully',
      seat: bookedSeat,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking seat' });
  }
};

// Book multiple seats (for Team Leaders)
export const bookSeatsForTeam = async (req, res) => {
  try {
    const { seatIds, employeeIds } = req.body;
    const teamLeaderId = req.user.id; // Logged-in team leader's ID

    // Ensure the team leader is booking for themselves and their team members
    if (!employeeIds.includes(teamLeaderId)) {
      return res.status(400).json({ message: 'Team Leader must book a seat for themselves' });
    }

    // Check if seats are available
    const seats = await Seat.find({ _id: { $in: seatIds }, status: 'Available' });
    if (seats.length !== seatIds.length) {
      return res.status(400).json({ message: 'Some seats are already occupied' });
    }

    // Check if the number of seats matches the number of employees
    if (seatIds.length !== employeeIds.length) {
      return res.status(400).json({ message: 'Number of seats must match number of employees' });
    }

    // Book seats for the team leader and team members
    const bookedSeats = await Promise.all(
      seatIds.map(async (seatId, index) => {
        const seat = await Seat.findByIdAndUpdate(
          seatId,
          { status: 'Occupied', employeeId: employeeIds[index] },
          { new: true }
        );
        return seat;
      })
    );

    res.status(200).json({
      message: 'Seats booked successfully for the team',
      seats: bookedSeats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error booking seats for the team' });
  }
};

// Add multiple seats to an office
export const addSeats = async (req, res) => {
  try {
    const { officeId, totalSeats } = req.body;

    // Find the highest seat number for the given office
    const lastSeat = await Seat.findOne({ officeId })
      .sort({ seatNumber: -1 }) // Sort in descending order
      .select('seatNumber'); // Only fetch the seatNumber field

    // Calculate the starting seat number
    const startSeatNumber = lastSeat ? lastSeat.seatNumber + 1 : 1;

    // Create an array of seat objects
    const seatsToAdd = Array.from({ length: totalSeats }, (_, index) => ({
      officeId,
      seatNumber: startSeatNumber + index, // Assign seat numbers sequentially
      status: 'Available',
    }));

    // Insert seats into the database
    const createdSeats = await Seat.insertMany(seatsToAdd);

    res.status(201).json({
      message: 'Seats added successfully',
      seats: createdSeats,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding seats', error: error.message });
  }
};