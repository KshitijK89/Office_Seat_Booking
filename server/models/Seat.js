import mongoose from 'mongoose';

const seatSchema = new mongoose.Schema({
  officeId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Office', 
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
});

export default mongoose.model('Seat', seatSchema);