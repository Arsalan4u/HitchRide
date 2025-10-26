import mongoose from 'mongoose';

const emergencyContactSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  relation: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('EmergencyContact', emergencyContactSchema);