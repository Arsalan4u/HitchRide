// import Verification from "../models/Verification.model.js";

// const verifyUser = async (req, res) => {
//   const { userId, fullName, phone, aadharNumber, gender, dob } = req.body;

//   if (!userId || !aadharNumber || !fullName || !phone || !gender || !dob) {
//     return res.status(400).json({
//       success: false,
//       message: "Missing required user verification data",
//     });
//   }

//   if (aadharNumber.length !== 12 || !/^\d+$/.test(aadharNumber)) {
//     return res.status(400).json({
//       success: false,
//       message: "Invalid Aadhaar Number",
//     });
//   }

//   const maskedNumber = aadharNumber.slice(0, 4) + "xxxxxxxx";

//   try {
//     const verification = await Verification.findOneAndUpdate(
//       { clerkUserId: userId },
//       {
//         clerkUserId: userId, // add this
//         fullName,
//         phone,
//         aadharNumber: maskedNumber,
//         gender,
//         dob,
//         isVerified: true, // fix this field name
//         verifiedAt: new Date(), // optional
//       },
//       { new: true, upsert: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Aadhaar Verified",
//       verification,
//     });
//   } catch (err) {
//     console.error("Verification error:", err);
//     res.status(500).json({
//       success: false,
//       message: "Server error during verification",
//     });
//   }
// };

// export { verifyUser };





import Verification from "../models/Verification.model.js";

const verifyUser = async (req, res) => {
    const { 
        userId, 
        fullName, 
        phone, 
        aadharNumber, 
        gender, 
        dob,
        emergencyContacts 
    } = req.body;

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

    // Make emergency contacts optional
    let validatedEmergencyContacts = {
        priority1: { number: "", name: "" },
        priority2: { number: "", name: "" },
        priority3: { number: "", name: "" }
    };

    // If emergency contacts are provided, validate them
    if (emergencyContacts) {
        const { priority1, priority2, priority3 } = emergencyContacts;
        
        // Only validate if the contact is provided
        if (priority1 && priority1.number && priority1.name) {
            if (!/^[0-9]{10}$/.test(priority1.number)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Priority 1 emergency contact phone number",
                });
            }
            validatedEmergencyContacts.priority1 = priority1;
        }

        if (priority2 && priority2.number && priority2.name) {
            if (!/^[0-9]{10}$/.test(priority2.number)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Priority 2 emergency contact phone number",
                });
            }
            validatedEmergencyContacts.priority2 = priority2;
        }

        if (priority3 && priority3.number && priority3.name) {
            if (!/^[0-9]{10}$/.test(priority3.number)) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Priority 3 emergency contact phone number",
                });
            }
            validatedEmergencyContacts.priority3 = priority3;
        }
    }

    const maskedNumber = aadharNumber.slice(0, 4) + "xxxxxxxx";

    try {
        const verification = await Verification.findOneAndUpdate(
            { clerkUserId: userId },
            {
                clerkUserId: userId,
                fullName,
                phone,
                aadharNumber: maskedNumber,
                gender,
                dob,
                isVerified: true,
                verifiedAt: new Date(),
                emergencyContacts: validatedEmergencyContacts
            },
            { new: true, upsert: true }
        );
    
        if (!verification) {
            console.log("Verification record was not updated. Check if the record exists.");
        } else {
            console.log("User verification updated:", verification);
        }
    
        res.status(200).json({
            success: true,
            message: "User verification completed successfully",
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

export { verifyUser };