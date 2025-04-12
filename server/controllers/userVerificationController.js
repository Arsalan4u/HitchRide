import Verification from "../models/Verification.model.js";

const verifyUser = async (req, res) => {
  const { userId, fullName, phone, aadharNumber, gender, dob } = req.body;

  if (!userId || !aadharNumber || !fullName || !phone || !gender || !dob) {
    return res.status(400).json({
      success: false,
      message: "Missing required user verification data",
    });
  }

  if (aadharNumber.length !== 12 || !/^\d+$/.test(aadharNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Aadhaar Number",
    });
  }

  const maskedNumber = aadharNumber.slice(0, 4) + "xxxxxxxx";

  try {
    const verification = await Verification.findOneAndUpdate(
      { clerkUserId: userId },
      {
        clerkUserId: userId, // add this
        fullName,
        phone,
        aadharNumber: maskedNumber,
        gender,
        dob,
        isVerified: true, // fix this field name
        verifiedAt: new Date(), // optional
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Aadhaar Verified",
      verification,
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

export { verifyUser };


