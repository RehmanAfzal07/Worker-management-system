// models/paymentModel.ts
import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },
  date: String,
  day: String,
  time: String,
  workingPayment: Number,
});

export default mongoose.models.Payment || mongoose.model('Payment', paymentSchema);

