
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MenuIcon, X, LogIn, UserPlus, Shield, Crown } from "lucide-react";
import {
  useUser,
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  SignUpButton,
} from '@clerk/clerk-react';
import { RegistrationModal } from './registration/RegistrationModal';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showRegistration, setShowRegistration] = useState(false);
  const { user } = useUser();
  const [isVehicleVerified, setIsVehicleVerified] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Fetch vehicle verification status from backend using Clerk userId
  useEffect(() => {
    const checkVehicleVerification = async () => {
      if (!user?.id) return;

      try {
        const res = await fetch(`http://localhost:5000/api/vehicle/verify?userId=${user.id}`);
        const data = await res.json();
        setIsVehicleVerified(data?.isVehicleVerified || false);
      } catch (error) {
        console.error("Error checking vehicle verification status:", error);
      }
    };

    checkVehicleVerification();
  }, [user]);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <a href="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-[#2E7D32] font-extrabold">Hitch</span>
            <span className="font-light">Ride</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">How It Works</button>
          <button onClick={() => scrollToSection('eco-points')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Eco Points</button>
          <button onClick={() => scrollToSection('safety')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Safety</button>
          <button onClick={() => scrollToSection('map')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Live Map</button>

          <div className="flex items-center space-x-4 ml-4">
            <SignedIn>
              <button
                onClick={() => scrollToSection('premium-section')}
                className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                           text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                           flex items-center justify-center gap-2 group"
              >
                <Crown className="h-4 w-4 group-hover:rotate-12 transition-transform" />
                <span>Go Premium</span>
              </button>

              {!isVehicleVerified && (
                <button
                  onClick={() => setShowRegistration(true)}
                  className="px-5 py-2.5 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                             text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                             flex items-center justify-center gap-2"
                >
                  <Shield className="h-4 w-4" />
                  <span>Register</span>
                </button>
              )}

              <div className="ml-2">
                <UserButton 
                  afterSignOutUrl="/" 
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 border-2 border-[#2E7D32]",
                    }
                  }}
                />
              </div>
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <Button variant="outline" className="flex items-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
                  <LogIn className="h-4 w-4" />
                  <span>Sign In</span>
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                             text-white flex items-center gap-2 shadow-md hover:shadow-lg">
                  <UserPlus className="h-4 w-4" />
                  <span>Sign Up</span>
                </Button>
              </SignUpButton>
            </SignedOut>
          </div>
        </nav>

        {/* Mobile Menu Button - Hamburger */}
        <button
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-[#2E7D32]" />
          ) : (
            <MenuIcon className="h-6 w-6 text-gray-800" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-xl animate-slideDown origin-top">
          <div className="container mx-auto px-4 py-6 space-y-4">
            <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">How It Works</button>
            <button onClick={() => scrollToSection('eco-points')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Eco Points</button>
            <button onClick={() => scrollToSection('safety')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Safety</button>
            <button onClick={() => scrollToSection('map')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Live Map</button>

            <div className="pt-4 space-y-3">
              <SignedIn>
                <button
                  onClick={() => scrollToSection('premium-section')}
                  className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
                             text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                             flex items-center justify-center gap-2"
                >
                  <Crown className="h-4 w-4" />
                  <span>Go Premium</span>
                </button>

                {!isVehicleVerified && (
                  <button
                    onClick={() => {
                      setShowRegistration(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full py-3 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                               text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
                               flex items-center justify-center gap-2"
                  >
                    <Shield className="h-4 w-4" />
                    <span>Register Vehicle</span>
                  </button>
                )}

                <div className="flex justify-center pt-2">
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>

              <SignedOut>
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
                    <LogIn className="h-4 w-4" />
                    <span>Sign In</span>
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                               text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    <UserPlus className="h-4 w-4" />
                    <span>Sign Up</span>
                  </Button>
                </SignUpButton>
              </SignedOut>
            </div>
          </div>
        </div>
      )}

      {/* Registration Modal */}
      {showRegistration && (
        <RegistrationModal onClose={() => setShowRegistration(false)} />
      )}
    </header>
  );
};

export default Navbar;


// -----------------------------------------------------------------------------------------

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { MenuIcon, X, LogIn, UserPlus, Shield, Crown } from "lucide-react";
// import {
//   useUser,
//   SignedIn,
//   SignedOut,
//   UserButton,
//   SignInButton,
//   SignUpButton,
// } from '@clerk/clerk-react';
// import { RegistrationModal } from './registration/RegistrationModal';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showRegistration, setShowRegistration] = useState(false);
//   const { user } = useUser();
//   const [isVehicleVerified, setIsVehicleVerified] = useState(false);
//   const [isPremium, setIsPremium] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setIsScrolled(window.scrollY > 10);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Fetch verification and premium status
//   useEffect(() => {
//     const fetchUserStatus = async () => {
//       if (!user?.id) return;

//       try {
//         // Fetch vehicle verification status
//         const verifyRes = await fetch(`http://localhost:5000/api/vehicle/verify?userId=${user.id}`);
//         const verifyData = await verifyRes.json();
//         setIsVehicleVerified(verifyData?.isVehicleVerified || false);

//         // Fetch premium status
//         const premiumRes = await fetch(`http://localhost:5000/api/user/premium?userId=${user.id}`);
//         const premiumData = await premiumRes.json();
//         setIsPremium(premiumData?.isPremium || false);
//       } catch (error) {
//         console.error("Error fetching user status:", error);
//       }
//     };

//     fetchUserStatus();
//   }, [user]);

//   const scrollToSection = (sectionId) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({
//         behavior: 'smooth',
//         block: 'start'
//       });
//     }
//     setIsMenuOpen(false);
//   };

//   // Update premium status globally when payment succeeds
//   const handlePremiumSuccess = () => {
//     setIsPremium(true);
//   };

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <a href="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
//             <span className="text-[#2E7D32] font-extrabold">Hitch</span>
//             <span className="font-light">Ride</span>
//           </a>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-8">
//           <button onClick={() => scrollToSection('how-it-works')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">How It Works</button>
//           <button onClick={() => scrollToSection('eco-points')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Eco Points</button>
//           <button onClick={() => scrollToSection('safety')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Safety</button>
//           <button onClick={() => scrollToSection('map')} className="text-gray-700 hover:text-[#2E7D32] transition-colors font-medium text-sm uppercase tracking-wider">Live Map</button>

//           <div className="flex items-center space-x-4 ml-4">
//             <SignedIn>
//               {/* Premium Button - Only shows if user is NOT premium */}
//               {!isPremium && (
//                 <button
//                   onClick={() => scrollToSection('premium-section')}
//                   className="px-5 py-2.5 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
//                            text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
//                            flex items-center justify-center gap-2 group"
//                 >
//                   <Crown className="h-4 w-4 group-hover:rotate-12 transition-transform" />
//                   <span>Go Premium</span>
//                 </button>
//               )}

//               {!isVehicleVerified && (
//                 <button
//                   onClick={() => setShowRegistration(true)}
//                   className="px-5 py-2.5 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                              text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
//                              flex items-center justify-center gap-2"
//                 >
//                   <Shield className="h-4 w-4" />
//                   <span>Register</span>
//                 </button>
//               )}

//               <div className="ml-2 relative">
//                 <UserButton 
//                   afterSignOutUrl="/" 
//                   appearance={{
//                     elements: {
//                       avatarBox: "w-10 h-10 border-2 border-[#2E7D32]",
//                     }
//                   }}
//                 />
//                 {/* Crown badge for premium users */}
//                 {isPremium && (
//                   <div className="absolute -top-1 -right-1 bg-yellow-400 rounded-full p-1">
//                     <Crown className="h-3 w-3 text-[#1B5E20]" />
//                   </div>
//                 )}
//               </div>
//             </SignedIn>

//             <SignedOut>
//               <SignInButton mode="modal">
//                 <Button variant="outline" className="flex items-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
//                   <LogIn className="h-4 w-4" />
//                   <span>Sign In</span>
//                 </Button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <Button className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                              text-white flex items-center gap-2 shadow-md hover:shadow-lg">
//                   <UserPlus className="h-4 w-4" />
//                   <span>Sign Up</span>
//                 </Button>
//               </SignUpButton>
//             </SignedOut>
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           {isMenuOpen ? (
//             <X className="h-6 w-6 text-[#2E7D32]" />
//           ) : (
//             <MenuIcon className="h-6 w-6 text-gray-800" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white shadow-xl animate-slideDown origin-top">
//           <div className="container mx-auto px-4 py-6 space-y-4">
//             <button onClick={() => scrollToSection('how-it-works')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">How It Works</button>
//             <button onClick={() => scrollToSection('eco-points')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Eco Points</button>
//             <button onClick={() => scrollToSection('safety')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Safety</button>
//             <button onClick={() => scrollToSection('map')} className="block w-full text-left py-3 border-b border-gray-100 text-gray-700 hover:text-[#2E7D32] transition-colors">Live Map</button>

//             <div className="pt-4 space-y-3">
//               <SignedIn>
//                 {/* Mobile Premium Button - Only shows if user is NOT premium */}
//                 {!isPremium && (
//                   <button
//                     onClick={() => scrollToSection('premium-section')}
//                     className="w-full py-3 bg-gradient-to-r from-[#FFD700] to-[#FFC000] hover:from-[#FFC000] hover:to-[#FFB000]
//                              text-[#1B5E20] font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
//                              flex items-center justify-center gap-2"
//                   >
//                     <Crown className="h-4 w-4" />
//                     <span>Go Premium</span>
//                   </button>
//                 )}

//                 {!isVehicleVerified && (
//                   <button
//                     onClick={() => {
//                       setShowRegistration(true);
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full py-3 bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                                text-white font-semibold rounded-full shadow-md hover:shadow-lg transition-all duration-300
//                                flex items-center justify-center gap-2"
//                   >
//                     <Shield className="h-4 w-4" />
//                     <span>Register Vehicle</span>
//                   </button>
//                 )}

//                 <div className="flex justify-center pt-2 relative">
//                   <UserButton afterSignOutUrl="/" />
//                   {/* Mobile crown badge for premium users */}
//                   {isPremium && (
//                     <div className="absolute top-1 right-[calc(50%-28px)] bg-yellow-400 rounded-full p-1">
//                       <Crown className="h-3 w-3 text-[#1B5E20]" />
//                     </div>
//                   )}
//                 </div>
//               </SignedIn>

//               <SignedOut>
//                 <SignInButton mode="modal">
//                   <Button variant="outline" className="w-full flex items-center justify-center gap-2 border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10">
//                     <LogIn className="h-4 w-4" />
//                     <span>Sign In</span>
//                   </Button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <Button className="w-full bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                                text-white flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
//                     <UserPlus className="h-4 w-4" />
//                     <span>Sign Up</span>
//                   </Button>
//                 </SignUpButton>
//               </SignedOut>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Registration Modal */}
//       {showRegistration && (
//         <RegistrationModal onClose={() => setShowRegistration(false)} />
//       )}
//     </header>
//   );
// };

// export default Navbar;

// import { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { MenuIcon, X, LogIn, UserPlus, Shield, Crown, Loader2 } from "lucide-react";
// import { useUser, SignedIn, SignedOut, UserButton, SignInButton, SignUpButton, useAuth } from '@clerk/clerk-react'; // Added useAuth
// import { RegistrationModal } from './registration/RegistrationModal';
// import { useToast } from "@/components/ui/use-toast";
// import { usePremiumStatus } from '@/hooks/usePremiumStatus';

// const Navbar = () => {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [showRegistration, setShowRegistration] = useState(false);
//   const { user, isLoaded: isUserLoaded } = useUser();
//   const { getToken } = useAuth(); // Get the auth token function
//   const { toast } = useToast();
  
//   const { isPremium, isLoading: isPremiumLoading } = usePremiumStatus();
//   const [isVehicleVerified, setIsVehicleVerified] = useState(false);
//   const [isStatusLoading, setIsStatusLoading] = useState(true);

//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 10);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   useEffect(() => {
//     const fetchToken = async () => {
//       const token = await getToken();
//       console.log("JWT Token:", token);
//     };
  
//     fetchToken();
//   }, [getToken]);
  

//   // Check vehicle verification status
//   useEffect(() => {
//     const checkVehicleStatus = async () => {
//       if (!isUserLoaded || !user?.id) {
//         setIsStatusLoading(false);
//         return;
//       }

//       setIsStatusLoading(true);
//       try {
//         const token = await getToken(); // Use getToken from useAuth
//         const res = await fetch(`http://localhost:5000/api/vehicle/verify?userId=${user.id}`, {
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
        
//         if (!res.ok) throw new Error('Failed to verify vehicle');
        
//         const data = await res.json();
//         setIsVehicleVerified(data?.isVehicleVerified || false);
//       } catch (error) {
//         console.error("Vehicle verification check failed:", error);
//         toast({
//           title: "Connection Error",
//           description: "Could not verify vehicle status",
//           variant: "destructive",
//         });
//       } finally {
//         setIsStatusLoading(false);
//       }
//     };

//     checkVehicleStatus();
//   }, [user, isUserLoaded, toast, getToken]);

//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId);
//     if (section) {
//       section.scrollIntoView({ behavior: 'smooth', block: 'start' });
//     }
//     setIsMenuOpen(false);
//   };

//   const showRegisterButton = 
//     isUserLoaded && 
//     !isStatusLoading && 
//     !isPremium && 
//     !isVehicleVerified;

//   return (
//     <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg py-2' : 'bg-transparent py-4'}`}>
//       <div className="container mx-auto px-4 flex justify-between items-center">
//         {/* Logo */}
//         <div className="flex items-center">
//           <a href="/" className="text-2xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
//             <span className="text-[#2E7D32] dark:text-green-400 font-extrabold">Hitch</span>
//             <span className="font-light">Ride</span>
//           </a>
//         </div>

//         {/* Desktop Navigation */}
//         <nav className="hidden md:flex items-center space-x-8">
//           <button 
//             onClick={() => scrollToSection('how-it-works')} 
//             className="nav-link"
//           >
//             How It Works
//           </button>
//           <button 
//             onClick={() => scrollToSection('eco-points')} 
//             className="nav-link"
//           >
//             Eco Points
//           </button>
//           <button 
//             onClick={() => scrollToSection('safety')} 
//             className="nav-link"
//           >
//             Safety
//           </button>
//           <button 
//             onClick={() => scrollToSection('map')} 
//             className="nav-link"
//           >
//             Live Map
//           </button>

//           <div className="flex items-center space-x-4 ml-4">
//             <SignedIn>
//               {(isStatusLoading || isPremiumLoading) ? (
//                 <Loader2 className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
//               ) : (
//                 <>
//                   {!isPremium && (
//                     <button
//                       onClick={() => scrollToSection('premium-section')}
//                       className="premium-button"
//                     >
//                       <Crown className="h-4 w-4 group-hover:rotate-12 transition-transform" />
//                       <span>Go Premium</span>
//                     </button>
//                   )}

//                   {showRegisterButton && (
//                     <button
//                       onClick={() => setShowRegistration(true)}
//                       className="register-button"
//                     >
//                       <Shield className="h-4 w-4" />
//                       <span>Register Vehicle</span>
//                     </button>
//                   )}

//                   <div className="ml-2 relative">
//                     <UserButton 
//                       afterSignOutUrl="/" 
//                       appearance={{
//                         elements: {
//                           avatarBox: "w-10 h-10 border-2 border-[#2E7D32] dark:border-green-400",
//                         }
//                       }} 
//                     />
//                     {isPremium && (
//                       <div className="premium-badge">
//                         <Crown className="h-3 w-3 text-[#1B5E20] dark:text-green-900" />
//                       </div>
//                     )}
//                   </div>
//                 </>
//               )}
//             </SignedIn>

//             <SignedOut>
//               <SignInButton mode="modal">
//                 <Button variant="outline" className="signin-button">
//                   <LogIn className="h-4 w-4" />
//                   <span>Sign In</span>
//                 </Button>
//               </SignInButton>
//               <SignUpButton mode="modal">
//                 <Button className="signup-button">
//                   <UserPlus className="h-4 w-4" />
//                   <span>Sign Up</span>
//                 </Button>
//               </SignUpButton>
//             </SignedOut>
//           </div>
//         </nav>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           {isMenuOpen ? (
//             <X className="h-6 w-6 text-[#2E7D32] dark:text-green-400" />
//           ) : (
//             <MenuIcon className="h-6 w-6 text-gray-800 dark:text-white" />
//           )}
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden bg-white dark:bg-gray-900 shadow-xl animate-slideDown origin-top">
//           <div className="container mx-auto px-4 py-6 space-y-4">
//             <button 
//               onClick={() => scrollToSection('how-it-works')} 
//               className="mobile-nav-link"
//             >
//               How It Works
//             </button>
//             <button 
//               onClick={() => scrollToSection('eco-points')} 
//               className="mobile-nav-link"
//             >
//               Eco Points
//             </button>
//             <button 
//               onClick={() => scrollToSection('safety')} 
//               className="mobile-nav-link"
//             >
//               Safety
//             </button>
//             <button 
//               onClick={() => scrollToSection('map')} 
//               className="mobile-nav-link"
//             >
//               Live Map
//             </button>

//             <div className="pt-4 space-y-3">
//               <SignedIn>
//                 {(isStatusLoading || isPremiumLoading) ? (
//                   <div className="flex justify-center">
//                     <Loader2 className="h-5 w-5 animate-spin text-gray-500 dark:text-gray-400" />
//                   </div>
//                 ) : (
//                   <>
//                     {!isPremium && (
//                       <button
//                         onClick={() => {
//                           scrollToSection('premium-section');
//                           setIsMenuOpen(false);
//                         }}
//                         className="mobile-premium-button"
//                       >
//                         <Crown className="h-4 w-4" />
//                         <span>Go Premium</span>
//                       </button>
//                     )}

//                     {showRegisterButton && (
//                       <button
//                         onClick={() => {
//                           setShowRegistration(true);
//                           setIsMenuOpen(false);
//                         }}
//                         className="mobile-register-button"
//                       >
//                         <Shield className="h-4 w-4" />
//                         <span>Register Vehicle</span>
//                       </button>
//                     )}

//                     <div className="flex justify-center pt-2 relative">
//                       <UserButton afterSignOutUrl="/" />
//                       {isPremium && (
//                         <div className="mobile-premium-badge">
//                           <Crown className="h-3 w-3 text-[#1B5E20] dark:text-green-900" />
//                         </div>
//                       )}
//                     </div>
//                   </>
//                 )}
//               </SignedIn>

//               <SignedOut>
//                 <SignInButton mode="modal">
//                   <Button variant="outline" className="mobile-signin-button">
//                     <LogIn className="h-4 w-4" />
//                     <span>Sign In</span>
//                   </Button>
//                 </SignInButton>
//                 <SignUpButton mode="modal">
//                   <Button className="mobile-signup-button">
//                     <UserPlus className="h-4 w-4" />
//                     <span>Sign Up</span>
//                   </Button>
//                 </SignUpButton>
//               </SignedOut>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Registration Modal */}
//       {showRegistration && (
//         <RegistrationModal onClose={() => setShowRegistration(false)} />
//       )}
//     </header>
//   );
// };

// export default Navbar;

// // CSS classes (should be in your global CSS file)
// /*

// */