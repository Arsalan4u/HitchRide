// server/controllers/clerk.controller.js

import User from '../models/User.js';
import Verification from '../models/Verification.model.js'; // make sure this file exists if you're using it

export const handleClerkWebhook = async (req, res) => {
  const { type, data } = req.body;

  try {
    switch (type) {
      case 'user.created':
        await new User({
          clerkId: data.id,
          email: data.email_addresses[0]?.email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          profileImage: data.profile_image_url
        }).save();
        break;

      case 'user.updated':
        await User.findOneAndUpdate(
          { clerkId: data.id },
          {
            email: data.email_addresses[0]?.email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            profileImage: data.profile_image_url,
            updatedAt: new Date()
          }
        );
        break;

      case 'user.deleted':
        await User.findOneAndDelete({ clerkId: data.id });
        await Verification.deleteOne({ clerkUserId: data.id });
        break;
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};
