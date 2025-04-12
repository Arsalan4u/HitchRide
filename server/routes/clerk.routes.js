// routes/clerk.routes.js
import express from 'express';
import { handleClerkWebhook } from '../controllers/clerk.controller.js'; // ✅ named import

const router = express.Router();

router.post('/webhook', handleClerkWebhook);
// router.post('/', handleClerkWebhook);

export default router;
