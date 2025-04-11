import Verification from '../models/Verification.model';

exports.submitVerification = async (req, res) => {
  try {
    const { clerkUserId, fullName, phone, aadharNumber, gender, dob } = req.body;

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

exports.getVerification = async (req, res) => {
  try {
    const verification = await Verification.findOne({ 
      clerkUserId: req.params.userId 
    });
    
    res.status(200).json({
      success: true,
      data: verification
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: 'Verification not found'
    });
  }
};