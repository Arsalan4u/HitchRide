import mongoose from "mongoose";

// vehicle schema to store vehicle details for the user

const vehicleSchema=new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true,
    },
    vehicleNumber:{
        type:String,
        required: true,
        unique: true,
    },
    vehicleType:{
        type:String,
        enum:["Car","Bike"],
        required:true,
    },
    vehicleModel:{
        type: String,
        required:true,
    },
    vehiclePhoto:{
        type:String,// url or base 64
        required:true,
    },
    rcNumber:{
        type:String,
        required:true,
        unique:true,
    },
    drivingLicence:{
        type:String,
        required:true,
    },
    dashcamPhoto:{
        type:String,
        required:true,
    },
    isVehicleVerified:{
        type:Boolean,
        default:false,
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },

});

const vehicle=mongoose.model("Vehicle",vehicleSchema);
export default vehicle;