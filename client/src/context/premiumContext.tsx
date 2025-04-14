// import React, { createContext, useState, useContext, useEffect } from 'react';
// import { useUser, useAuth } from '@clerk/clerk-react';
// import { useToast } from "@/components/ui/use-toast";

// interface PremiumContextType {
//   isPremium: boolean;
//   isLoading: boolean;
//   checkPremiumStatus: (force?: boolean) => Promise<void>;
//   setPremiumStatus: (status: boolean) => void;
// }

// const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

// export const PremiumProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [isPremium, setIsPremium] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [lastStatusCheck, setLastStatusCheck] = useState<Date | null>(null);
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const { toast } = useToast();

//   const checkPremiumStatus = async (force = false) => {
//     if (!user?.id) {
//       setIsLoading(false);
//       return;
//     }

//     // Skip if recently checked (unless forced)
//     if (!force && lastStatusCheck && Date.now() - lastStatusCheck.getTime() < 5000) {
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const token = await getToken();
//       const res = await fetch(`http://localhost:5000/api/premium/status`, {
//         headers: { 'Authorization': `Bearer ${token}` },
//         cache: 'no-store'
//       });

//       if (!res.ok) throw new Error('Status check failed');
      
//       const { data } = await res.json();
//       setIsPremium(data.isPremium);
//       setLastStatusCheck(new Date());

//     } catch (error) {
//       console.error("Status check error:", error);
//       toast({
//         title: "Status Update Failed",
//         description: "Couldn't verify premium status",
//         variant: "destructive",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Check premium status on mount and when user changes
//   useEffect(() => {
//     checkPremiumStatus();
//   }, [user]);

//   const setPremiumStatus = (status: boolean) => {
//     setIsPremium(status);
//   };

//   return (
//     <PremiumContext.Provider value={{ 
//       isPremium, 
//       isLoading, 
//       checkPremiumStatus,
//       setPremiumStatus
//     }}>
//       {children}
//     </PremiumContext.Provider>
//   );
// };

// export const usePremium = () => {
//   const context = useContext(PremiumContext);
//   if (context === undefined) {
//     throw new Error('usePremium must be used within a PremiumProvider');
//   }
//   return context;
// };































import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useUser, useAuth } from '@clerk/clerk-react';

interface PremiumContextType {
  isPremium: boolean;
  isLoading: boolean;
  setPremiumStatus: (status: boolean) => void;
  checkPremiumStatus: (force?: boolean) => Promise<void>;
}

const PremiumContext = createContext<PremiumContextType | undefined>(undefined);

export const PremiumProvider = ({ children }: { children: ReactNode }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);
  const { user } = useUser();
  const { getToken } = useAuth();

  const checkPremiumStatus = async (force = false) => {
    if (!user?.id) {
      setIsLoading(false);
      return;
    }

    // Skip if recently checked (unless forced)
    if (!force && lastCheck && Date.now() - lastCheck.getTime() < 60000) {
      return;
    }

    setIsLoading(true);
    try {
      const token = await getToken();
      const res = await fetch(`http://localhost:5000/api/premium/status`, {
        headers: { 'Authorization': `Bearer ${token}` },
        cache: 'no-store'
      });

      if (res.ok) {
        const { data } = await res.json();
        setIsPremium(data?.isPremium || false);
      } else {
        // Silently handle errors - don't show toasts
        console.log('Premium status check failed, will retry later');
      }
      
      setLastCheck(new Date());
    } catch (error) {
      // Silently log errors without showing toasts
      console.log('Premium status check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const setPremiumStatus = (status: boolean) => {
    setIsPremium(status);
  };

  useEffect(() => {
    checkPremiumStatus();
    
    // Check status periodically
    const interval = setInterval(() => {
      checkPremiumStatus();
    }, 60000); // Check every minute
    
    return () => clearInterval(interval);
  }, [user]);

  return (
    <PremiumContext.Provider value={{ isPremium, isLoading, setPremiumStatus, checkPremiumStatus }}>
      {children}
    </PremiumContext.Provider>
  );
};

export const usePremium = () => {
  const context = useContext(PremiumContext);
  if (context === undefined) {
    throw new Error('usePremium must be used within a PremiumProvider');
  }
  return context;
};
