import express from "express"
import { verifyUser } from "../controllers/userVerificationController.js";

const router =express.Router();

router.post("/verify-user",verifyUser);

export default router;

