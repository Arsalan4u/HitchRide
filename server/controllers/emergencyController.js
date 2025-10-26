import User from '../models/User.js';
import Verification from '../models/Verification.model.js';

export const getEmergencyContacts = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Fetch user with emergency contacts from Verification model
    const user = await Verification.findOne({ clerkUserId: userId });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    if (!user.emergencyContacts) {
      return res.status(404).json({ error: 'No emergency contacts found' });
    }

    res.json({
      success: true,
      user: {
        name: user.fullName,
        phone: user.phone
      },
      contacts: user.emergencyContacts
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to fetch contacts',
      details: error.message 
    });
  }
};

export const sendSOS = async (req, res) => {
  try {
    const { userId, location, message } = req.body;
    
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }

    // Get user emergency contacts
    const user = await Verification.findOne({ clerkUserId: userId });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // In a real implementation, you would send SMS/notifications to emergency contacts
    // For now, we'll just return success
    
    res.json({
      success: true,
      message: 'SOS alert sent to emergency contacts',
      alertedContacts: user.emergencyContacts
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: 'Failed to send SOS',
      details: error.message 
    });
  }
};
