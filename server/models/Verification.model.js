import mongoose from 'mongoose';

const VerificationSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, ref: 'User' },
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  aadharNumber: { type: String, required: true, unique: true },
  gender: { type: String, required: true },
  dob: { type: Date, required: true },
  isVerified: { type: Boolean, default: false },
  verifiedAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Verification = mongoose.model('Verification', VerificationSchema);

export default Verification;




//-----------------
