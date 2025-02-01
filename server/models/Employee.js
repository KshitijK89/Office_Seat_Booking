// import mongoose from 'mongoose';
// import bcrypt from 'bcrypt';

// const employeeSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ['Admin', 'Teamlead'], 
//     default: 'Teamlead'                     
//   },
// });

// // Hash password before saving
// employeeSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) next();
//   this.password = await bcrypt.hash(this.password, 10);
// });

// export default mongoose.model('Employee', employeeSchema);



import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['Employee', 'Team Leader','Admin'], 
    default: 'Employee' 
  },
});

export default mongoose.model('Employee', employeeSchema);