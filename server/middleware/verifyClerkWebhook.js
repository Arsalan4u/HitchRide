// middleware/verifyClerkWebhook.js
const crypto = require('crypto');
module.exports = (req, res, next) => {
    console.log("Headers:", req.headers);  // Log request headers
    console.log("Received webhook data:", req.body);  // Log body before verification
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    const signature = req.headers['svix-signature'];
    const timestamp = req.headers['svix-timestamp'];
    const body = JSON.stringify(req.body);
  
    if (!signature || !timestamp) {
      return res.status(400).json({ error: 'Missing signature headers' });
    }
  
    const signedContent = `${timestamp}.${body}`;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedContent)
      .digest('base64');
  
    if (signature !== expectedSignature) {
      return res.status(401).json({ error: 'Invalid signature' });
    }
  
    next();
  };
  