// import React, { useState } from 'react';
// import { Ban, BadgeCheck, Zap, CheckCircle } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import FakeRazorpayModal from '@/components/FakeRazorpayModal';

// const PremiumBenefits = () => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isPremium, setIsPremium] = useState(false);

//   const benefits = [
//     {
//       icon: <Ban className="h-8 w-8 text-eco" />,
//       title: "No Ads",
//       description: "Enjoy an uninterrupted experience"
//     },
//     {
//       icon: <BadgeCheck className="h-8 w-8 text-eco" />,
//       title: "2× Eco Points",
//       description: "Earn double the rewards for every eco-friendly ride"
//     },
//     {
//       icon: <Zap className="h-8 w-8 text-eco" />,
//       title: "Priority Matching",
//       description: "Get matched faster with preferred routes and verified riders"
//     }
//   ];

//   const handlePaymentSuccess = () => {
//     setIsPremium(true);
//     // In a real app, you would:
//     // 1. Update user's premium status in your database
//     // 2. Update global state/context
//     // 3. Maybe show a success toast
//   };

//   return (
//     <section id="premium-section" className="container-section bg-black/95 text-white pt-32">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Benefits</h2>
//         <p className="text-gray-400 max-w-3xl mx-auto">
//           Upgrade your ride-sharing experience with exclusive features
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         {benefits.map((benefit, index) => (
//           <Card key={index} 
//                 className="animate-on-scroll bg-black/40 border-eco/20 hover:border-eco/40 transition-all duration-300" 
//                 style={{ animationDelay: `${index * 0.1}s` }}>
//             <CardContent className="p-6 text-center">
//               <div className="bg-eco/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 {benefit.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-eco">{benefit.title}</h3>
//               <p className="text-gray-400">
//                 {benefit.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="text-center">
//         {isPremium ? (
//           <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
//             <CheckCircle className="mr-2 h-5 w-5" />
//             <span className="font-medium">You're a Premium Member!</span>
//           </div>
//         ) : (
//           <Button 
//             onClick={() => setShowPaymentModal(true)}
//             className="bg-eco hover:bg-eco-dark text-white font-semibold py-6 px-8 text-lg rounded-full 
//                        shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] 
//                        transition-all duration-300"
//           >
//             Get Premium - ₹199/month
//           </Button>
//         )}
//       </div>

//       <FakeRazorpayModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         onSuccess={handlePaymentSuccess}
//       />
//     </section>
//   );
// };

// export default PremiumBenefits;


//-----------------------------------------------------------------------------------------

// import React, { useState, useEffect } from 'react';
// import { Ban, BadgeCheck, Zap, CheckCircle, Crown } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import FakeRazorpayModal from '@/components/FakeRazorpayModal';
// import { useUser } from '@clerk/clerk-react';

// const PremiumBenefits = ({ onPaymentSuccess }) => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isPremium, setIsPremium] = useState(false);
//   const { user } = useUser();

//   // Check premium status when component mounts
//   useEffect(() => {
//     const checkPremiumStatus = async () => {
//       if (!user?.id) return;
      
//       try {
//         const res = await fetch(`http://localhost:5000/api/user/premium?userId=${user.id}`);
//         const data = await res.json();
//         setIsPremium(data?.isPremium || false);
//       } catch (error) {
//         console.error("Error checking premium status:", error);
//       }
//     };

//     checkPremiumStatus();
//   }, [user]);

//   const benefits = [
//     {
//       icon: <Ban className="h-8 w-8 text-eco" />,
//       title: "No Ads",
//       description: "Enjoy an uninterrupted experience"
//     },
//     {
//       icon: <BadgeCheck className="h-8 w-8 text-eco" />,
//       title: "2× Eco Points",
//       description: "Earn double the rewards for every eco-friendly ride"
//     },
//     {
//       icon: <Zap className="h-8 w-8 text-eco" />,
//       title: "Priority Matching",
//       description: "Get matched faster with preferred routes and verified riders"
//     }
//   ];

//   const handlePaymentSuccess = () => {
//     setIsPremium(true);
//     onPaymentSuccess(); // Notify parent component (if needed)
    
//     // In a real app, you would:
//     // 1. Update user's premium status in your database
//     // 2. Update global state/context
//     // 3. Show a success toast
//   };

//   return (
//     <section id="premium-section" className="container-section bg-black/95 text-white pt-32">
//       <div className="text-center mb-16">
//         <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Benefits</h2>
//         <p className="text-gray-400 max-w-3xl mx-auto">
//           Upgrade your ride-sharing experience with exclusive features
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
//         {benefits.map((benefit, index) => (
//           <Card key={index} 
//                 className="animate-on-scroll bg-black/40 border-eco/20 hover:border-eco/40 transition-all duration-300" 
//                 style={{ animationDelay: `${index * 0.1}s` }}>
//             <CardContent className="p-6 text-center">
//               <div className="bg-eco/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
//                 {benefit.icon}
//               </div>
//               <h3 className="text-xl font-semibold mb-2 text-eco">{benefit.title}</h3>
//               <p className="text-gray-400">
//                 {benefit.description}
//               </p>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       <div className="text-center">
//         {isPremium ? (
//           <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
//             <CheckCircle className="mr-2 h-5 w-5" />
//             <span className="font-medium">You're a Premium Member!</span>
//           </div>
//         ) : (
//           <Button 
//             onClick={() => setShowPaymentModal(true)}
//             className="bg-eco hover:bg-eco-dark text-white font-semibold py-6 px-8 text-lg rounded-full 
//                        shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] 
//                        transition-all duration-300 group"
//           >
//             <span className="group-hover:scale-105 transition-transform">Get Premium - ₹199/month</span>
//             <Crown className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
//           </Button>
//         )}
//       </div>

//       <FakeRazorpayModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         onSuccess={handlePaymentSuccess}
//       />
//     </section>
//   );
// };

// export default PremiumBenefits;




// -------------------------------------------------------------------


// import React, { useState, useEffect } from 'react';
// import { Ban, BadgeCheck, Zap, CheckCircle, Crown, Loader2 } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import FakeRazorpayModal from '@/components/FakeRazorpayModal';
// import { useUser, useAuth } from '@clerk/clerk-react'; // Added useAuth

// const PremiumBenefits = ({ onPaymentSuccess }: { onPaymentSuccess: () => void }) => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isPremium, setIsPremium] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpgrading, setIsUpgrading] = useState(false);
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const { toast } = useToast();
//   const [lastStatusCheck, setLastStatusCheck] = useState<Date | null>(null);

//   // Enhanced status check with retry logic
//   const checkPremiumStatus = async (force = false) => {
//     if (!user?.id) return;

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

//   // Immediate status check after payment
//   const handlePaymentSuccess = async () => {
//     setIsUpgrading(true);
//     try {
//       if (!user?.id) throw new Error('User not authenticated');
      
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/premium/upgrade', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ clerkId: user.id })
//       });
  
//       const result = await response.json();
  
//       if (!result.success) {
//         throw new Error(result.message || 'Upgrade failed');
//       }
  
//       // Force immediate status refresh
//       await checkPremiumStatus(true);
      
//       toast({
//         title: "Premium Activated!",
//         description: "Your account has been upgraded",
//       });
  
//     } catch (error) {
//       toast({
//         title: "Upgrade Processing",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsUpgrading(false);
//     }
//   };

//   // Real-time status polling
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isPremium) checkPremiumStatus();
//     }, 15000); // Check every 15 seconds if not premium

//     return () => clearInterval(interval);
//   }, [isPremium, user]);

  // ... rest of your component ...


//   import React, { useState, useEffect } from 'react';
// import { Ban, BadgeCheck, Zap, CheckCircle, Crown, Loader2 } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { useToast } from "@/components/ui/use-toast";
// import FakeRazorpayModal from '@/components/FakeRazorpayModal';
// import { useUser, useAuth } from '@clerk/clerk-react';

// // Update the props to include a callback for premium status changes
// const PremiumBenefits = ({ 
//   onPaymentSuccess, 
//   onPremiumStatusChange 
// }: { 
//   onPaymentSuccess: () => void,
//   onPremiumStatusChange?: (isPremium: boolean) => void 
// }) => {
//   const [showPaymentModal, setShowPaymentModal] = useState(false);
//   const [isPremium, setIsPremium] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isUpgrading, setIsUpgrading] = useState(false);
//   const { user } = useUser();
//   const { getToken } = useAuth();
//   const { toast } = useToast();
//   const [lastStatusCheck, setLastStatusCheck] = useState<Date | null>(null);

//   // Enhanced status check with retry logic
//   const checkPremiumStatus = async (force = false) => {
//     if (!user?.id) return;

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
      
//       // Notify parent components about premium status change
//       if (onPremiumStatusChange) {
//         onPremiumStatusChange(data.isPremium);
//       }
      
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

//   // Immediate status check after payment
//   const handlePaymentSuccess = async () => {
//     setIsUpgrading(true);
//     try {
//       if (!user?.id) throw new Error('User not authenticated');
      
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/premium/upgrade', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ clerkId: user.id })
//       });
  
//       const result = await response.json();
  
//       if (!result.success) {
//         throw new Error(result.message || 'Upgrade failed');
//       }
  
//       // Force immediate status refresh
//       await checkPremiumStatus(true);
      
//       toast({
//         title: "Premium Activated!",
//         description: "Your account has been upgraded",
//       });
      
//       // Call the onPaymentSuccess callback
//       if (onPaymentSuccess) {
//         onPaymentSuccess();
//       }
  
//     } catch (error) {
//       toast({
//         title: "Upgrade Processing",
//         description: error.message,
//         variant: "destructive",
//       });
//     } finally {
//       setIsUpgrading(false);
//     }
//   };

//   // Initial check on component mount
//   useEffect(() => {
//     checkPremiumStatus();
//   }, [user]);

//   // Real-time status polling
//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (!isPremium) checkPremiumStatus();
//     }, 15000); // Check every 15 seconds if not premium

//     return () => clearInterval(interval);
//   }, [isPremium, user]);
//   const benefits = [
//     {
//       icon: <Ban className="h-8 w-8 text-eco" />,
//       title: "No Ads",
//       description: "Enjoy an uninterrupted experience"
//     },
//     {
//       icon: <BadgeCheck className="h-8 w-8 text-eco" />,
//       title: "2× Eco Points",
//       description: "Earn double rewards for eco-friendly rides"
//     },
//     {
//       icon: <Zap className="h-8 w-8 text-eco" />,
//       title: "Priority Matching",
//       description: "Faster matches with preferred routes"
//     },
//     {
//       icon: <Crown className="h-8 w-8 text-eco" />,
//       title: "Exclusive Badge",
//       description: "Show your premium status"
//     }
//   ];

//   if (isLoading) {
//     return (
//       <section 
//         id="premium-section" 
//         className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-black to-gray-900 py-32"
//       >
//         <div className="text-center space-y-4">
//           <Loader2 className="h-12 w-12 animate-spin text-eco mx-auto" />
//           <p className="text-gray-400">Checking premium status...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section 
//       id="premium-section" 
//       className="bg-gradient-to-b from-black to-gray-900 text-white py-32"
//     >
//       <div className="container mx-auto px-4">
//         <div className="text-center mb-16">
//           <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-eco to-green-300">
//             HitchRide Premium
//           </h2>
//           <p className="text-gray-400 max-w-3xl mx-auto text-lg">
//             Enhance your ride-sharing with exclusive benefits
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
//           {benefits.map((benefit, index) => (
//             <Card 
//               key={index}
//               className="bg-gray-900/50 border border-gray-800 hover:border-eco/40 transition-all hover:scale-[1.02]"
//             >
//               <CardContent className="p-8 text-center h-full flex flex-col">
//                 <div className="bg-eco/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
//                   {benefit.icon}
//                 </div>
//                 <h3 className="text-xl font-semibold mb-3 text-eco">{benefit.title}</h3>
//                 <p className="text-gray-400 flex-grow">
//                   {benefit.description}
//                 </p>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         <div className="text-center">
//           {isPremium ? (
//             <div className="inline-flex items-center bg-gradient-to-r from-eco/20 to-green-800/20 text-eco px-8 py-4 rounded-full border border-eco/30 shadow-lg">
//               <CheckCircle className="mr-3 h-6 w-6" />
//               <span className="font-semibold text-lg">You're a Premium Member!</span>
//             </div>
//           ) : (
//             <div className="space-y-8 max-w-4xl mx-auto">
//               <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/50 p-8 rounded-2xl border border-gray-700 shadow-xl">
//                 <h3 className="text-2xl font-bold mb-4">Start Your Premium Journey</h3>
                
//                 <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-6">
//                   <div className="bg-gray-800/50 p-6 rounded-xl border border-eco/20">
//                     <h4 className="text-lg font-semibold mb-2">Monthly Plan</h4>
//                     <p className="text-3xl font-bold text-eco mb-2">₹199</p>
//                     <p className="text-gray-400 text-sm">per month</p>
//                   </div>
                  
//                   <div className="text-gray-400">OR</div>
                  
//                   <div className="bg-gray-800/50 p-6 rounded-xl border border-amber-400/20">
//                     <h4 className="text-lg font-semibold mb-2">Yearly Plan</h4>
//                     <p className="text-3xl font-bold text-amber-400 mb-2">₹1999</p>
//                     <p className="text-gray-400 text-sm">save 16% annually</p>
//                   </div>
//                 </div>

//                 <Button 
//                   onClick={() => setShowPaymentModal(true)}
//                   disabled={isUpgrading}
//                   className="bg-gradient-to-r from-eco to-green-500 hover:from-green-500 hover:to-eco text-white font-semibold py-7 px-10 text-lg rounded-full shadow-[0_0_30px_rgba(0,230,118,0.3)] hover:shadow-[0_0_40px_rgba(0,230,118,0.5)] transition-all duration-300 group"
//                   size="lg"
//                 >
//                   {isUpgrading ? (
//                     <>
//                       <Loader2 className="mr-2 h-5 w-5 animate-spin" />
//                       Processing...
//                     </>
//                   ) : (
//                     <>
//                       <Crown className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
//                       Get Premium Now
//                     </>
//                   )}
//                 </Button>
//               </div>
              
//               <p className="text-gray-500 text-sm">
//                 7-day money-back guarantee • Cancel anytime
//               </p>
//             </div>
//           )}
//         </div>
//       </div>

//       <FakeRazorpayModal
//         isOpen={showPaymentModal}
//         onClose={() => setShowPaymentModal(false)}
//         onSuccess={handlePaymentSuccess}
//         amount={19900}
//         description="HitchRide Premium Monthly Subscription"
//         userId={user?.id}
//       />
//     </section>
//   );
// };

// export default PremiumBenefits;




















import React, { useState } from 'react';
import { Ban, BadgeCheck, Zap, CheckCircle, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FakeRazorpayModal from '@/components/FakeRazorpayModal';
import { useUser } from '@clerk/clerk-react';
import { usePremium } from '@/context/premiumContext';

const PremiumBenefits = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { user } = useUser();
  const { isPremium, setPremiumStatus } = usePremium();

  const benefits = [
    {
      icon: <Ban className="h-8 w-8 text-eco" />,
      title: "No Ads",
      description: "Enjoy an uninterrupted experience"
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-eco" />,
      title: "2× Eco Points",
      description: "Earn double the rewards for every eco-friendly ride"
    },
    {
      icon: <Zap className="h-8 w-8 text-eco" />,
      title: "Priority Matching",
      description: "Get matched faster with preferred routes and verified riders"
    }
  ];

  const handlePaymentSuccess = async () => {
    // Update premium status in context
    setPremiumStatus(true);
    
    // In a real app, you would also:
    // 1. Make an API call to update the user's premium status in your database
    // 2. Maybe show a success toast
  };

  return (
    <section id="premium-section" className="container-section bg-black/95 text-white pt-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Premium Benefits</h2>
        <p className="text-gray-400 max-w-3xl mx-auto">
          Upgrade your ride-sharing experience with exclusive features
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {benefits.map((benefit, index) => (
          <Card key={index} 
                className="animate-on-scroll bg-black/40 border-eco/20 hover:border-eco/40 transition-all duration-300" 
                style={{ animationDelay: `${index * 0.1}s` }}>
            <CardContent className="p-6 text-center">
              <div className="bg-eco/10 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-eco">{benefit.title}</h3>
              <p className="text-gray-400">
                {benefit.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="text-center">
        {isPremium ? (
          <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
            <CheckCircle className="mr-2 h-5 w-5" />
            <span className="font-medium">You're a Premium Member!</span>
          </div>
        ) : (
          <Button 
            onClick={() => setShowPaymentModal(true)}
            className="bg-eco hover:bg-eco-dark text-white font-semibold py-6 px-8 text-lg rounded-full 
                       shadow-[0_0_20px_rgba(0,230,118,0.3)] hover:shadow-[0_0_30px_rgba(0,230,118,0.5)] 
                       transition-all duration-300 group"
          >
            <span className="group-hover:scale-105 transition-transform">Get Premium - ₹199/month</span>
            <Crown className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
          </Button>
        )}
      </div>

      {!isPremium && (
        <FakeRazorpayModal
          isOpen={showPaymentModal}
          onClose={() => setShowPaymentModal(false)}
          onSuccess={handlePaymentSuccess}
          amount={19900}
          description="HitchRide Premium Monthly Subscription"
          userId={user?.id}
        />
      )}
    </section>
  );
};

export default PremiumBenefits;
