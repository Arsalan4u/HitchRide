import Verification from '../models/Verification.model.js';

exports.submitVerification = async (req, res) => {
  try {
    const { clerkUserId, fullName, phone, aadharNumber, gender, dob } = req.body;

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
      dob: new Date(dob)
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

//--------------------------------------------------------------------------------------------------

