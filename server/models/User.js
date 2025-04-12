import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  profileImage: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

const User = mongoose.model('User', UserSchema);
export default User;

