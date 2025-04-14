// import mongoose from 'mongoose';

// const VerificationSchema = new mongoose.Schema({
//   clerkUserId: { type: String, required: true, ref: 'User' },
//   fullName: { type: String, required: true },
//   phone: { type: String, required: true },
//   aadharNumber: { type: String, required: true, unique: true },
//   gender: { type: String, required: true },
//   dob: { type: Date, required: true },
//   isVerified: { type: Boolean, default: false },
//   verifiedAt: { type: Date },
//   createdAt: { type: Date, default: Date.now }
// });

// const Verification = mongoose.model('Verification', VerificationSchema);

// export default Verification;




//-----------------


import mongoose from "mongoose";

const VerificationSchema = new mongoose.Schema({
    clerkUserId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    aadharNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedAt: {
        type: Date
    },
    emergencyContacts: {
        priority1: {
            number: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        priority2: {
            number: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        },
        priority3: {
            number: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            }
        }
    }
}, {
    timestamps: true
});

const Verification = mongoose.model("Verification", VerificationSchema);

export default Verification;