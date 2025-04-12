// server/controllers/clerk.controller.js

import User from '../models/User.js';
import Verification from '../models/Verification.model.js';
import fetchClerkUser from '../utils/fetchClerkUser.js'; // Step 1 ka helper

export const handleClerkWebhook = async (req, res) => {
    console.log('📩 Incoming Request:', req); // Log the entire request object
    console.log('📩 Request body:', req.body); // Log just the body
  const { type, data } = req.body;
  console.log('📨 Webhook type:', type);
  console.log('📦 Webhookdata:',data);
  
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

      // ✅ New addition to handle OTP login sessions
      case 'session.created':
        const userId = data.user_id;
        const existingUser = await User.findOne({ clerkId: userId });

        if (!existingUser) {
          // 🧠 Fetch user details from Clerk API
          const userInfo = await fetchClerkUser(userId);

          // 🧾 Save user in MongoDB
          await new User({
            clerkId: userInfo.id,
            email: userInfo.email,
            firstName: userInfo.firstName,
            lastName: userInfo.lastName,
            profileImage: userInfo.profileImage,
          }).save();
        }

        break;
    }

    res.status(200).json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
};


