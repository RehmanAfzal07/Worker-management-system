import mongoose from 'mongoose';

const EmployeeSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  employeeId: String,
  department: String,
});

export default mongoose.models.Employee || mongoose.model('Employee', EmployeeSchema);
