import axios from 'axios';

const fetchClerkUser = async (userId) => {
  try {
    const response = await axios.get(`https://api.clerk.com/v1/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
    });

    const user = response.data;

    // Extracting details from Clerk response
    const email = user.email_addresses?.[0]?.email_address || 'No email found';
    const profileImage = user.profile_image_url || user.image_url || 'No image found';
    const firstName = user.first_name || 'No first name';
    const lastName = user.last_name || 'No last name';

    return {
      id: user.id,
      email,
      firstName,
      lastName,
      profileImage,
    };
  } catch (error) {
    console.error(`Error fetching Clerk user with ID ${userId}:`, error.message);
    throw new Error('Failed to fetch Clerk user data');
  }
};

export default fetchClerkUser;
