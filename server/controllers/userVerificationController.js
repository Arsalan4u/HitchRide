import User from "../models/User.js";

const verifyUser = async (req, res) => {
  const { userId, fullname, phone, aadhaarNumber, gender, dob } = req.body;

  if (!userId || !aadhaarNumber || !fullname || !phone || !gender || !dob) {
    return res.status(400).json({
      success: false,
      message: "Missing required user verification data",
    });
  }

  if (aadhaarNumber.length !== 12 || !/^\d+$/.test(aadhaarNumber)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Aadhaar Number",
    });
  }

  const maskedNumber = aadhaarNumber.slice(0, 4) + "xxxxxxxx";

  try {
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        fullname,
        phone,
        aadhaarNumber: maskedNumber,
        gender,
        dob,
        isUserVerified: true,
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Aadhaar Verified",
      user,
    });
  } catch (err) {
    console.error("Verification error:", err);
    res.status(500).json({
      success: false,
      message: "Server error during verification",
    });
  }
};

export { verifyUser };
