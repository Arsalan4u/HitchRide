// backend/routes/Verification.routes.js
import express from 'express';
import * as VerificationController from '../controllers/Verification.controller.js'; // Import everything as an object
import { verifyClerkSession } from '../middleware/authMiddleWare.js';

const router = express.Router();

// POST /api/verification - Submit a new verification (Protected)
router.post('/', verifyClerkSession, VerificationController.submitVerification);

// GET /api/verification/check-status - Check verification status (Protected)
router.get('/check-status', VerificationController.checkVerificationStatus);

// GET /api/verification/:userId - Get a user's verification (Protected)
router.get('/:userId', verifyClerkSession, VerificationController.getVerification);

export default router;
