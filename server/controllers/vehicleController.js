import Vehicle from "../models/Vehicle.js";

// vehicle registration verfication

const verifyVehicle=async (req,res)=>{
    console.log("req.body",req.body);
    
    const {userId,vehicleNumber,vehicleType,vehicleModel,vehiclePhoto,rcNumber,drivingLicence,dashcamPhoto}=req.body;

    // validating user input
    if(!userId||!vehicleNumber||!vehicleType||!vehicleModel||!vehiclePhoto||!rcNumber||!drivingLicence||!dashcamPhoto){
        return res.status(400).json({
            success:false,
            message:"Missing required vehicle data",
        });
    }
    try{
        // upsert vehicle details create or update if vehicle already exist
        const vehicle=await Vehicle.findOneAndUpdate(
            {userId},
            {
                vehicleModel,
                vehicleNumber,
                vehiclePhoto,
                vehicleType,
                rcNumber,
                drivingLicence,
                dashcamPhoto,
                isVehicleVerified:true,
            },
            {new:true,upsert:true},
        );

        res.status(200).json({
            success:true,
            message:"vehicle registered ",
            vehicle,
        });
    }
    catch (err){
        // console.error("vehicle verification Error:",err);
        res.status(400).json({
            success:false,
            message:"Internal Server Error During Vehicle Verification",
        });
    }
};

export {verifyVehicle};