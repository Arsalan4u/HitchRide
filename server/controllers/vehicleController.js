import Vehicle from "../models/Vehicle.js";

// vehicle registration verification
const verifyVehicle = async (req, res) => {
    console.log("📦 req.body:", req.body);
    console.log("🖼 req.files:", req.files);

    const { userId, vehicleNumber, vehicleType, vehicleModel, rcNumber } = req.body;

    // Check if all required fields exist in req.body
    if (!userId || !vehicleNumber || !vehicleType || !vehicleModel || !rcNumber) {
        return res.status(400).json({
            success: false,
            message: "Missing required vehicle text data",
        });
    }

    // Check if required files exist in req.files
    if (
        !req.files?.vehiclePhoto ||
        !req.files?.drivingLicence ||
        !req.files?.dashcamPhoto
    ) {
        return res.status(400).json({
            success: false,
            message: "Missing required vehicle image files",
        });
    }

    try {
        const vehiclePhoto = req.files.vehiclePhoto[0].filename;
        const drivingLicence = req.files.drivingLicence[0].filename;
        const dashcamPhoto = req.files.dashcamPhoto[0].filename;

        const vehicle = await Vehicle.findOneAndUpdate(
            { userId },
            {
                vehicleNumber,
                vehicleType,
                vehicleModel,
                vehiclePhoto,
                rcNumber,
                drivingLicence,
                dashcamPhoto,
                isVehicleVerified: true,
            },
            { new: true, upsert: true }
        );

        res.status(200).json({
            success: true,
            message: "Vehicle registered successfully ✅",
            vehicle,
        });
    } catch (err) {
        console.error("🚨 Vehicle verification error:", err);
        res.status(500).json({
            success: false,
            message: "Internal Server Error During Vehicle Verification",
        });
    }
};
// GET /api/vehicle/verify?userId=someId
const getVehicleVerificationStatus = async (req, res) => {
    const { userId } = req.query;
  
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Missing userId in query params",
      });
    }
  
    try {
      const vehicle = await Vehicle.findOne({ userId });
  
      if (!vehicle) {
        return res.status(404).json({
          success: false,
          message: "No vehicle record found for this user",
          isVehicleVerified: false,
        });
      }
  
      res.status(200).json({
        success: true,
        isVehicleVerified: vehicle.isVehicleVerified || false,
      });
    } catch (err) {
      console.error("🚨 Error fetching vehicle verification status:", err);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  };
  

export { verifyVehicle,getVehicleVerificationStatus};
