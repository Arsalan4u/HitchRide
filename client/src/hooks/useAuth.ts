// hooks/useAuth.ts
import { useAuth } from '@clerk/clerk-react';
import { useEffect, useState } from 'react';

export const useAuthData = () => {
  const { userId, sessionId, getToken } = useAuth();
  const [sessionToken, setSessionToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await getToken();
        setSessionToken(token);
      } catch (err) {
        console.error('Error fetching session token:', err);
        setSessionToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, [getToken, sessionId]); // Re-fetch when session changes

  return {
    userId,
    sessionToken,
    loading,
    isSignedIn: !!userId
  };
};