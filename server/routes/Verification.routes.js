const express = require('express');
const router = express.Router();
const verificationController = require('../controllers/Verification.controller.js');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, verificationController.submitVerification);
router.get('/:userId', authMiddleware, verificationController.getVerification);

module.exports = router;