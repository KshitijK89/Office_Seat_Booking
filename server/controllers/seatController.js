
// import Seat from '../models/Seat.js';
// import Office from '../models/Office.js';

// export const addSeats = async (req, res) => {
//   try {
//     const { floorId, numberOfSeats } = req.body;

//     // Find the floor to get its floor number
//     const office = await Office.findOne({ 'floors._id': floorId });
    
//     if (!office) {
//       return res.status(404).json({ message: 'Floor not found' });
//     }

//     const floor = office.floors.id(floorId)
    
//     const floorNumber = floor.floorNumber;

//     const lastSeat = await Seat.findOne({ floorId })
//       .sort({ seatNumber: -1 }) // Sort in descending order
//       .select('seatNumber'); // Only fetch the seatNumber field

//     // Calculate the starting seat number
//     const startSeatNumber = lastSeat ? lastSeat.seatNumber + 1 : 1;
    
//     // Create seats with floorNumber
//     const seatsToAdd = Array.from({ length: numberOfSeats }, (_, index) => ({
//       floorId,
//       floorNumber,
//       seatNumber: startSeatNumber + index,
//       status: 'Available'
//     }));
    

//     const createdSeats = await Seat.insertMany(seatsToAdd);
//     res.status(201).json({ seats: createdSeats });
//   } catch (error) {
//     res.status(500).json({ message: `${error}` });
//   }
// };

// //for idivisual booking
// export const bookSeat = async (req, res) => {
//   try {
//     const { seatId } = req.body;
//     const employeeId = req.user.id;

//     const seat = await Seat.findByIdAndUpdate(
//       seatId,
//       { status: 'Occupied', employeeId },
//       { new: true }
//     ).select('floorNumber seatNumber status employeeId'); // Include floorNumber

//     res.status(200).json({
//       message: 'Seat booked successfully',
//       seat: {
//         id: seat._id,
//         floorNumber: seat.floorNumber,
//         seatNumber: seat.seatNumber,
//         status: seat.status,
//         employeeId: seat.employeeId
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: 'Error booking seat' });
//   }
// };

// // book seats for team
// export const bookSeatsForTeam = async (req, res) => {
//   try {
//     const { seatIds, employeeIds } = req.body;
//     const teamLeaderId = req.user.id;

//     // Validate team leader is included in bookings
//     if (!employeeIds.includes(teamLeaderId)) {
//       return res.status(400).json({ 
//         message: 'Team leader must book a seat for themselves' 
//       });
//     }

//     // Check seat availability
//     const seats = await Seat.find({ 
//       _id: { $in: seatIds },
//       status: 'Available' 
//     });

//     if (seats.length !== seatIds.length) {
//       return res.status(400).json({ 
//         message: 'Some seats are already occupied' 
//       });
//     }

//     // Validate seat-employee count match
//     if (seatIds.length !== employeeIds.length) {
//       return res.status(400).json({ 
//         message: 'Number of seats must match number of employees' 
//       });
//     }

//     // Book seats
//     const bookedSeats = await Promise.all(
//       seatIds.map(async (seatId, index) => {
//         const seat = await Seat.findByIdAndUpdate(
//           seatId,
//           { 
//             status: 'Occupied', 
//             employeeId: employeeIds[index] 
//           },
//           { new: true }
//         ).select('floorNumber seatNumber status employeeId');

//         return {
//           id: seat._id,
//           floorNumber: seat.floorNumber,
//           seatNumber: seat.seatNumber,
//           status: seat.status,
//           employeeId: seat.employeeId
//         };
//       })
//     );

//     res.status(200).json({
//       message: 'Seats booked successfully for the team',
//       seats: bookedSeats
//     });

//   } catch (error) {
//     console.error('Team booking error:', error);
//     res.status(500).json({ 
//       message: 'Error booking seats for the team',
//       error: error.message 
//     });
//   }
// };

// export const getBookedSeats = async (req, res) => {
//   try {
//     const employeeId = req.user.id;
//     console.log(employeeId);
    

//     // Fetch seats booked by the employee (including floor number)
//     const seats = await Seat.find({ employeeId })
//       .select('floorNumber seatNumber status');

//     res.status(200).json({ seats });
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching booked seats' });
//   }
// };

import Seat from '../models/Seat.js';
import Office from '../models/Office.js';
import Employee from '../models/Employee.js';

// Add seats to a floor
export const addSeats = async (req, res) => {
  try {
    const { floorId, numberOfSeats } = req.body;

    // Find the floor to get its floor number
    const office = await Office.findOne({ 'floors._id': floorId });
    if (!office) {
      return res.status(404).json({ message: 'Floor not found' });
    }

    const floor = office.floors.id(floorId);
    const floorNumber = floor.floorNumber;

    // Find the highest seat number for the floor
    const lastSeat = await Seat.findOne({ floorId })
      .sort({ seatNumber: -1 }) // Sort in descending order
      .select('seatNumber'); // Only fetch the seatNumber field

    // Calculate the starting seat number
    const startSeatNumber = lastSeat ? lastSeat.seatNumber + 1 : 1;

    // Create seats with floorNumber
    const seatsToAdd = Array.from({ length: numberOfSeats }, (_, index) => ({
      floorId,
      floorNumber,
      seatNumber: startSeatNumber + index,
      status: 'Available'
    }));

    const createdSeats = await Seat.insertMany(seatsToAdd);
    res.status(201).json({ seats: createdSeats });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// Book a single seat (Employee)
export const bookSeat = async (req, res) => {
  try {
    const { seatId } = req.body;
    const employeeId = req.user.id;
    const bookedBy = req.user.id; // Track who booked the seat

    // Check if seat exists and is available
    const seat = await Seat.findOne({ _id: seatId, status: 'Available' });
    if (!seat) {
      return res.status(400).json({ 
        message: 'Seat not available or does not exist' 
      });
    }

    // Book the seat
    const updatedSeat = await Seat.findByIdAndUpdate(
      seatId,
      { 
        status: 'Occupied', 
        employeeId, 
        bookedBy 
      },
      { new: true }
    ).select('floorNumber seatNumber status employeeId');

    res.status(200).json({
      message: 'Seat booked successfully',
      seat: updatedSeat
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error booking seat',
      error: error.message 
    });
  }
};

// Book seats for a team (Team Leader)
export const bookSeatsForTeam = async (req, res) => {
  try {
    const { seatIds, employeeIds } = req.body;
    const teamLeaderId = req.user.id;
    const bookedBy = teamLeaderId; // Track who booked the seats

    // ========== Validation Start ==========
    // 1. Check team leader is included
    if (!employeeIds.includes(teamLeaderId.toString())) {
      return res.status(400).json({ 
        message: 'Team leader must book a seat for themselves' 
      });
    }

    // 2. Check seat IDs and employee IDs match in count
    if (seatIds.length !== employeeIds.length) {
      return res.status(400).json({ 
        message: 'Mismatch between seat count and employee count' 
      });
    }

    // 3. Verify all seats exist and are available
    const seats = await Seat.find({ 
      _id: { $in: seatIds },
      status: 'Available' 
    });

    if (seats.length !== seatIds.length) {
      const unavailableSeats = seatIds.filter(seatId => 
        !seats.some(s => s._id.toString() === seatId)
      );
      
      return res.status(400).json({ 
        message: 'Some seats are unavailable',
        unavailableSeats
      });
    }

    // 4. Verify all employees exist
    const employees = await Employee.find({
      _id: { $in: employeeIds }
    });

    if (employees.length !== employeeIds.length) {
      const invalidEmployees = employeeIds.filter(empId => 
        !employees.some(e => e._id.toString() === empId)
      );
      
      return res.status(400).json({ 
        message: 'Invalid employee IDs found',
        invalidEmployees
      });
    }
    // ========== Validation End ==========

    // Book all seats
    const bookedSeats = await Promise.all(
      seatIds.map(async (seatId, index) => {
        const seat = await Seat.findByIdAndUpdate(
          seatId,
          { 
            status: 'Occupied',
            employeeId: employeeIds[index],
            bookedBy
          },
          { new: true }
        ).select('floorNumber seatNumber status employeeId');
        
        return {
          id: seat._id,
          floorNumber: seat.floorNumber,
          seatNumber: seat.seatNumber,
          status: seat.status,
          employeeId: seat.employeeId
        };
      })
    );

    res.status(200).json({
      message: 'Team seats booked successfully',
      bookedSeats
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error booking team seats',
      error: error.message 
    });
  }
};

// Get booked seats (for both team leaders and employees)
export const getBookedSeats = async (req, res) => {
  try {
    const { id: userId, role } = req.user;

    let seats;
    if (role === 'Team Leader') {
      // Fetch all seats booked by the team leader (for the entire team)
      seats = await Seat.find({ bookedBy: userId })
        .select('floorNumber seatNumber status employeeId');
    } else {
      // Fetch only the employee's booked seat
      seats = await Seat.find({ employeeId: userId })
        .select('floorNumber seatNumber status');
    }

    res.status(200).json({ seats });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error fetching booked seats',
      error: error.message 
    });
  }
};