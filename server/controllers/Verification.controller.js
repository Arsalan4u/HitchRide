// import Verification from '../models/Verification.model.js';

// exports.submitVerification = async (req, res) => {
//   try {
//     const { clerkUserId, fullName, phone, aadharNumber, gender, dob } = req.body;

//     // 🔒 Check if user has already submitted verification
//     const alreadySubmitted = await Verification.findOne({ clerkUserId });
//     if (alreadySubmitted) {
//       return res.status(400).json({
//         success: false,
//         error: 'Verification form already submitted for this user.'
//       });
//     }

//     const verificationData = new Verification({
//       clerkUserId,
//       fullName,
//       phone,
//       aadharNumber,
//       gender,
//       dob: new Date(dob)
//     });

//     await verificationData.save();

//     res.status(201).json({
//       success: true,
//       data: verificationData
//     });
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       error: err.message
//     });
//   }
// };

// exports.checkVerificationStatus = async (req, res) => {
//   try {
//     const userId = req.query.userId;
//     if (!userId) {
//       return res.status(400).json({
//         success: false,
//         error: 'User ID is required'
//       });
//     }

//     const verification = await Verification.findOne({ clerkUserId: userId });
    
//     res.status(200).json({
//       success: true,
//       isUserVerified: !!verification,
//       isVehicleVerified: verification?.isVehicleVerified || false
//     });
//   } catch (err) {
  //     res.status(500).json({
    //       success: false,
    //       error: err.message
//     });
//   }
// };

// //--------------------------------------------------------------------------------------------------



// backend/controllers/Verification.controller.js

import Verification from '../models/Verification.model.js';

// Submit verification
export const submitVerification = async (req, res) => {
  try {
    const {
      clerkUserId,
      fullName,
      phone,
      aadharNumber,
      gender,
      dob,
      emergencyContacts // ✅ Make sure this is included from the frontend
    } = req.body;

    // 🔒 Check if user has already submitted verification
    const alreadySubmitted = await Verification.findOne({ clerkUserId });
    if (alreadySubmitted) {
      return res.status(400).json({
        success: false,
        error: 'Verification form already submitted for this user.'
      });
    }

    const verificationData = new Verification({
      clerkUserId,
      fullName,
      phone,
      aadharNumber,
      gender,
      dob: new Date(dob),
      emergencyContacts // ✅ Pass the full object
    });

    await verificationData.save();

    res.status(201).json({
      success: true,
      data: verificationData
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err.message
    });
  }
};

// Check verification status
export const checkVerificationStatus = async (req, res) => {
  try {
    const userId = req.query.userId;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    console.log("Checking verification for userId:", userId);  // Log userId

    // Fetch the verification data based on clerkUserId
    const verification = await Verification.findOne({ clerkUserId: userId });

    console.log("Verification data found:", verification);  // Log the result

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification data not found'
      });
    }

    const isUserVerified = verification.isVerified;
    const isVehicleVerified = verification.isVehicleVerified || false;

    res.status(200).json({
      success: true,
      isUserVerified,
      isVehicleVerified
    });
  } catch (err) {
    console.error("Error during verification check:", err);  // Log errors
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};

// Get a user's verification data
export const getVerification = async (req, res) => {
  try {
    const { userId } = req.params;

    const verification = await Verification.findOne({ clerkUserId: userId });

    if (!verification) {
      return res.status(404).json({
        success: false,
        error: 'Verification data not found'
      });
    }

    res.status(200).json({
      success: true,
      data: verification
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
};




