import express from 'express';
const router = express.Router();
import { getEmergencyContacts, sendSOS } from '../controllers/emergencyController.js';

router.get('/contacts', getEmergencyContacts);
router.post('/sos', sendSOS);

export default router;
