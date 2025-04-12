import express from "express";
import { verifyVehicle,getVehicleVerificationStatus } from "../controllers/vehicleController.js";
import { uploadVehicleDocs } from "../middleware/multer.js";

const router = express.Router();

router.post("/verify", uploadVehicleDocs, verifyVehicle);
router.get("/verify",getVehicleVerificationStatus)

export default router;