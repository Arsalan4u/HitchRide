import express from "express"
import { verifyVehicle } from "../controllers/vehicleController.js"

const router=express.Router();

router.post("/verify",verifyVehicle);

export default router;
