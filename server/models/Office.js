import mongoose from'mongoose';

const officeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  totalSeats: { type: Number, required: true },
});

export default mongoose.model('Office', officeSchema);