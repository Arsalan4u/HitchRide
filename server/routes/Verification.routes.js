// backend/routes/verification.routes.ts
import express from 'express';
import { submitVerification, getVerification } from '../controllers/Verification.controller';
import { verifyClerkSession } from '../middleware/authMiddleWare.js';

const router = express.Router();

// POST /api/verification - Submit a new verification (Protected)
router.post('/', verifyClerkSession, submitVerification);

// GET /api/verification/:userId - Get a user's verification (Protected)
router.get('/:userId', verifyClerkSession, getVerification);

export default router;


//--------------------------------------------------------------------------
