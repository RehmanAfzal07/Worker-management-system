import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  phone: String,
  username: { type: String, unique: true },
  password: String,
}, { timestamps: true });

  export  const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);




