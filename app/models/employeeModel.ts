import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  fullName:   { type: String, required: true },
  email:      { type: String, required: true },
  phone:      { type: String, required: true },
  employeeId: { type: String, required: true },
  username:   { type: String, required: true, unique: true }, // ✅ Required
  department: { type: String, required: true },
  password:   { type: String, required: true },
}, { timestamps: true });

export const Employee = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
