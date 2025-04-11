// routes/clerk.routes.js
import express from 'express';
import { handleClerkWebhook } from '../controllers/clerk.controller.js'; // ✅ named import

const router = express.Router();

router.post('/webhook', handleClerkWebhook);

export default router;
