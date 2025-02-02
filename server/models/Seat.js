import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  floorId: { 
    type: mongoose.Schema.Types.ObjectId, 
    required: true 
  },
  floorNumber: { 
    type: Number, 
    required: true 
  },
  seatNumber: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['Available', 'Occupied'], 
    default: 'Available' 
  },
  employeeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Employee' 
  },
  bookedBy: { 
    type: mongoose.Schema.Types.ObjectId, // Track who booked this seat
    ref: 'Employee',
    required: true 
  }
});

export default mongoose.model('Seat', seatSchema);