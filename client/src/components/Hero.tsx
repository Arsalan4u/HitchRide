// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowDown } from "lucide-react";
// import { RegistrationModal } from './registration/RegistrationModal';

// const Hero = () => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({
//       behavior: 'smooth'
//     });
//   };

//   const handleFindRideClick = () => {
//     setShowRegistration(true);
//   };

//   const handleRegistrationComplete = () => {
//     setIsVerified(true);
//     setShowRegistration(false);
//     // Redirect to find rides page or show available rides
//     console.log('User verified, proceed to find rides');
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   return (
//     <section className="hero-section">
//       {/* Registration Modal */}
//       {showRegistration && (
//         <RegistrationModal 
//           onClose={handleCloseModal}
//           // Note: Your current RegistrationModal doesn't have onComplete prop,
//           // so we'll use the existing onClose flow
//         />
//       )}

//       <div className="hero-bg"></div>
      
//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="block">Hitch Ride</span>
//               <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Button 
//                   onClick={handleFindRideClick}
//                   className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                   Find a Ride
//                 </Button>
                
//                 <Button 
//                   className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   onClick={scrollToHowItWorks}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   Share a Ride
//                 </Button>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <button 
//                 onClick={scrollToHowItWorks} 
//                 className="flex items-center text-gray-600 hover:text-eco transition-colors"
//               >
//                 Learn how it works
//                 <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
//               <img 
//                 src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
//                 alt="Hitch Ride Carpooling Service" 
//                 className="w-full h-full object-contain"
//               />

//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
//                 <path 
//                   d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
//                   stroke="#00E676" 
//                   strokeWidth="4" 
//                   strokeLinecap="round" 
//                   strokeDasharray="1000"
//                   strokeDashoffset="1000"
//                   fill="none" 
//                   className="route-line animate" 
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { useNavigate } from 'react-router-dom';
// import { ArrowDown } from "lucide-react";
// import { RegistrationModal } from './registration/RegistrationModal';
// import Navbar from './Navbar.tsx';
// import Index from '../../client2/src/App.tsx'; // Import the Index component from the client2 folder

// const Hero = () => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const [showClient2UI, setShowClient2UI] = useState(false); // State to control rendering of client2 UI
//   const navigate = useNavigate();

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({
//       behavior: 'smooth',
//     });
//   };

//   const handleFindRideClick = () => {
//     if (isVerified) {
//       setShowClient2UI(true); // Show the client2 UI if the user is verified
//     } else {
//       setShowRegistration(true); // Show the registration modal if the user is not verified
//     }
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   const handleRegistrationComplete = () => {
//     setIsVerified(true);
//     setShowRegistration(false);
//     console.log('User verified, proceed to find rides');
//     navigate("/ride-booking", {
//       state: {
//         navMode: "simplified",
//         user: "verified"
//       }
//     });
//   };

//   // Render the client2 UI if `showClient2UI` is true
//   if (showClient2UI) {
//     return (
//       <div>
//         <Navbar />
//         <main className="new-interface">
//           <Index /> {/* Render the Index component from the client2 folder */}
//         </main>
//       </div>
//     );
//   }

//   // Render the default Hero UI
//   return (
//     <section className="hero-section">
//       {showRegistration && (
//         <RegistrationModal
//           onClose={handleCloseModal}
//           onComplete={handleRegistrationComplete}
//         />
//       )}

//       <div className="hero-bg"></div>

//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="block">Hitch Ride</span>
//               <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//             </h1>

//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
//             </p>

//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Button
//                   onClick={handleFindRideClick}
//                   className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-2 h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path
//                       fillRule="evenodd"
//                       d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                       clipRule="evenodd"
//                     />
//                   </svg>
//                   Find a Ride
//                 </Button>

//                 <Button
//                   className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   onClick={handleFindRideClick}
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="mr-2 h-5 w-5"
//                     viewBox="0 0 20 20"
//                     fill="currentColor"
//                   >
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   Share a Ride
//                 </Button>
//               </div>
//             </div>

//             <div className="mt-8">
//               <button
//                 onClick={scrollToHowItWorks}
//                 className="flex items-center text-gray-600 hover:text-eco transition-colors"
//               >
//                 Learn how it works
//                 <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
//               <img
//                 src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png"
//                 alt="Hitch Ride Carpooling Service"
//                 className="w-full h-full object-contain"
//               />

//               <svg
//                 className="absolute inset-0 w-full h-full"
//                 viewBox="0 0 800 800"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M200,180 C250,200 300,350 400,400 S550,480 640,320"
//                   stroke="#00E676"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeDasharray="1000"
//                   strokeDashoffset="1000"
//                   fill="none"
//                   className="route-line animate"
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// export default Hero;



// import { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { UserVerification } from './UserVerification';
// import { VehicleVerification } from './VehicleVerification';
// import { useAuth } from '@clerk/clerk-react';

// interface RegistrationModalProps {
//   onClose: () => void;
// }

// export const RegistrationModal = ({ onClose }: RegistrationModalProps) => {
//   const { userId } = useAuth();
//   const [step, setStep] = useState<number>(1);
//   const [userData, setUserData] = useState<any>(null);
//   const [modalReady, setModalReady] = useState(false);
//   const [isUserVerified, setIsUserVerified] = useState(false);
//   const [isVehicleVerified, setIsVehicleVerified] = useState(false);

//   useEffect(() => {
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.body.style.overflow = '';
//     };
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   // Modified to check both user and vehicle verification status
//   useEffect(() => {
//     const checkVerificationStatus = async () => {
//       // First check local storage
//       if (userId) {
//         const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
//         const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
//         setIsUserVerified(userVerified);
//         setIsVehicleVerified(vehicleVerified);
        
//         // If user is already verified, show vehicle form directly
//         if (userVerified && !vehicleVerified) {
//           setStep(2);
//         } else {
//           setStep(1);
//         }
//       }
      
//       // You can also check with backend if needed
//       try {
//         if (userId) {
//           const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`);
//           const data = await response.json();
          
//           if (data.isUserVerified) {
//             setIsUserVerified(true);
//             if (!data.isVehicleVerified) {
//               setStep(2);
//             }
//           }
          
//           if (data.isVehicleVerified) {
//             setIsVehicleVerified(true);
//           }
//         }
//       } catch (error) {
//         console.error('Error checking verification status:', error);
//       }
      
//       setModalReady(true);
//     };
    
//     checkVerificationStatus();
//   }, [userId]);

//   // Check if both verifications are complete
//   useEffect(() => {
//     if (isUserVerified && isVehicleVerified) {
//       // Both verifications complete, close modal or show success
//       onClose();
//     }
//   }, [isUserVerified, isVehicleVerified, onClose]);

//   const handleUserSubmit = (data: any) => {
//     setUserData(data);
//     const userIdentifier = data.email || data.userId || userId;
    
//     // Save verification status
//     if (userIdentifier) {
//       localStorage.setItem(`isVerified_${userIdentifier}`, 'true');
//       if (userId) {
//         localStorage.setItem(`isVerified_${userId}`, 'true');
//       }
//     }
    
//     setIsUserVerified(true);
//     setStep(2);
//   };

//   const handleVehicleSubmit = (data: any) => {
//     const completeData = { ...userData, ...data };
//     console.log('Full Registration Data:', completeData);
    
//     // Save vehicle verification status
//     if (userId) {
//       localStorage.setItem(`vehicleVerified_${userId}`, 'true');
//     }
    
//     setIsVehicleVerified(true);
//     onClose();
//   };

//   const handleSkipVehicle = () => {
//     console.log('Skipped Vehicle Verification for:', userData);
//     onClose();
//   };

//   // Show loading while checking verification status
//   if (!modalReady) return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
//       <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 h-screen w-full">
//         <div className="bg-white p-6 rounded-lg shadow-xl">
//           Loading verification status...
//         </div>
//       </div>
//     </>
//   );

//   // If both verifications are complete, don't show anything
//   if (isUserVerified && isVehicleVerified) {
//     return null;
//   }

//   return (
//     <>
//       <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose} />
//       <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 h-screen w-full overflow-y-auto">
//         <div
//           className="relative w-full max-w-md rounded-lg shadow-xl bg-[#F5F6F5] max-h-[90vh] overflow-y-auto"
//           onClick={(e) => e.stopPropagation()}
//         >
//           {/* Header */}
//           <div className="sticky top-0 z-10 p-6 bg-[#C8E6C9] rounded-t-lg">
//             <button
//               onClick={onClose}
//               className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
//               aria-label="Close registration modal"
//             >
//               <X size={24} />
//             </button>

//             {/* Stepper */}
//             <div className="flex justify-center mb-6">
//               <div className="flex items-center">
//                 {/* Step 1 */}
//                 <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
//                   <div
//                     className={`flex items-center justify-center w-10 h-10 rounded-full ${
//                       step >= 1 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'
//                     }`}
//                   >
//                     <span className="font-medium">1</span>
//                   </div>
//                   <span className="mt-2 font-medium text-sm">USER</span>
//                 </div>

//                 {/* Line */}
//                 <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-[#1B5E20]' : 'bg-gray-300'}`} />

//                 {/* Step 2 */}
//                 <div className={`flex flex-col items-center ${step === 2 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
//                   <div
//                     className={`flex items-center justify-center w-10 h-10 rounded-full ${
//                       step === 2 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'
//                     }`}
//                   >
//                     <span className="font-medium">2</span>
//                   </div>
//                   <span className="mt-2 font-medium text-sm text-center">VEHICLE</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6">
//             {step === 1 && !isUserVerified && <UserVerification onSubmit={handleUserSubmit} />}
//             {(step === 2 || isUserVerified) && !isVehicleVerified && (
//               <VehicleVerification onSubmit={handleVehicleSubmit} onSkip={handleSkipVehicle} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



// //------------------------------------------------------------------------------------------------------------------


// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowDown } from "lucide-react";
// import { RegistrationModal } from './registration/RegistrationModal';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '@clerk/clerk-react';

// const Hero = () => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isVerified, setIsVerified] = useState(false);
//   const navigate = useNavigate(); // Initialize navigate

//   const handleRegistrationComplete = () => {
//     setIsVerified(true);
//     setShowRegistration(false);
//     // Redirect to Project B with navbar customization
//     navigate("/ride-booking", { 
//       state: { 
//         navMode: "simplified", 
//         user: "verified" // Optional: Pass user data
//       } 
//     });
//   };
//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({
//       behavior: 'smooth'
//     });
//   };

//   // const handleFindRideClick = () => {
//   //   setShowRegistration(true);
//   // };

//   const handleFindRideClick = async () => {
//     try {
//       const { getToken, userId } = useAuth(); // Optional: move this up into your component body if it's not already there
//       const token = await getToken();
  
//       if (!userId || !token) {
//         console.error("Missing userId or token");
//         return;
//       }
  
//       const res = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
  
//       const data = await res.json();
  
//       if (data.isUserVerified && data.isVehicleVerified) {
//         navigate("/ride-booking");
//       } else {
//         setShowRegistration(true);
//       }
//     } catch (err) {
//       console.error("Verification check failed:", err);
//       setShowRegistration(true); // fallback if error
//     }
//   };
  

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   return (
//     <section className="hero-section">
//       {/* Registration Modal */}
//       {showRegistration && (
//         <RegistrationModal 
//           onClose={handleCloseModal}
//           // Note: Your current RegistrationModal doesn't have onComplete prop,
//           // so we'll use the existing onClose flow
//         />
//       )}

//       <div className="hero-bg"></div>
      
//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="block">Hitch Ride</span>
//               <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Button 
//                   onClick={handleFindRideClick}
//                   className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                   Find a Ride
//                 </Button>
                
//                 <Button 
//                   className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   onClick={scrollToHowItWorks}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   Share a Ride
//                 </Button>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <button 
//                 onClick={scrollToHowItWorks} 
//                 className="flex items-center text-gray-600 hover:text-eco transition-colors"
//               >
//                 Learn how it works
//                 <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
//               <img 
//                 src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
//                 alt="Hitch Ride Carpooling Service" 
//                 className="w-full h-full object-contain"
//               />

//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
//                 <path 
//                   d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
//                   stroke="#00E676" 
//                   strokeWidth="4" 
//                   strokeLinecap="round" 
//                   strokeDasharray="1000"
//                   strokeDashoffset="1000"
//                   fill="none" 
//                   className="route-line animate" 
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowDown } from "lucide-react";
// import { RegistrationModal } from './registration/RegistrationModal';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '@clerk/clerk-react';

// const Hero = () => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isForRider, setIsForRider] = useState(true); // Track if user wants to find or share a ride
//   const navigate = useNavigate();
//   const { userId, getToken } = useAuth();

//   const checkVerificationAndProceed = async (forRider = true) => {
//     try {
//       if (!userId) {
//         console.error("No user ID available");
//         return;
//       }

//       const token = await getToken();
//       if (!token) {
//         console.error("No token available");
//         return;
//       }

//       // Set whether user is finding or sharing a ride
//       setIsForRider(forRider);

//       // Log the request for debugging
//       console.log(`Checking verification status for userId: ${userId}`);

//       const res = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       console.log("Verification status response:", data);

//       if (data.success && data.isUserVerified && data.isVehicleVerified) {
//         console.log("Verification complete, redirecting to /ride-booking");
//         // If the user and vehicle are both verified, navigate to /ride-booking
//         navigate("/ride-booking", {
//           state: {
//             navMode: "simplified",
//             user: "verified",
//             mode: forRider ? "rider" : "driver"
//           }
//         });
//       } else {
//         console.log("Verification incomplete, showing registration modal");
//         // Otherwise, show the registration modal
//         setShowRegistration(true);
//       }
//     } catch (err) {
//       console.error("Verification check failed:", err);
//       setShowRegistration(true); // fallback if error
//     }
//   };

//   const handleFindRideClick = () => {
//     checkVerificationAndProceed(true); // true for rider
//   };

//   const handleShareRideClick = () => {
//     checkVerificationAndProceed(false); // false for driver
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//     // After closing the modal, check verification status again
//     // This ensures we redirect if verification was completed
//     checkVerificationAndProceed(isForRider);
//   };

//   // This function will be called when registration is complete
//   const handleRegistrationComplete = () => {
//     setShowRegistration(false);
//     console.log("Registration complete, redirecting to /ride-booking");
//     navigate("/ride-booking", {
//       state: {
//         navMode: "simplified",
//         user: "verified",
//         mode: isForRider ? "rider" : "driver"
//       }
//     });
//   };

//   return (
//     <section className="hero-section">
//       {/* Registration Modal */}
//       {showRegistration && (
//         <RegistrationModal 
//           onClose={handleCloseModal}
//         />
//       )}

//       <div className="hero-bg"></div>
      
//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="block">Hitch Ride</span>
//               <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Button 
//                   onClick={handleFindRideClick}
//                   className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                   Find a Ride
//                 </Button>
                
//                 <Button 
//                   className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   onClick={handleShareRideClick}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   Share a Ride
//                 </Button>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <button 
//                 onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="flex items-center text-gray-600 hover:text-eco transition-colors"
//               >
//                 Learn how it works
//                 <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
//               <img 
//                 src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
//                 alt="Hitch Ride Carpooling Service" 
//                 className="w-full h-full object-contain"
//               />

//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
//                 <path 
//                   d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
//                   stroke="#00E676" 
//                   strokeWidth="4" 
//                   strokeLinecap="round" 
//                   strokeDasharray="1000"
//                   strokeDashoffset="1000"
//                   fill="none" 
//                   className="route-line animate" 
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };
// // export default Hero;


// import React, { useState, useEffect } from 'react';
// import { Button } from "@/components/ui/button";
// import { ArrowDown } from "lucide-react";
// import { RegistrationModal } from './registration/RegistrationModal';
// import { useNavigate } from "react-router-dom";
// import { useAuth } from '@clerk/clerk-react';

// const Hero = () => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isForRider, setIsForRider] = useState(true);
//   const navigate = useNavigate();
//   const { userId, getToken } = useAuth();
  
//   // Check verification status periodically after modal is closed
//   useEffect(() => {
//     let checkInterval: NodeJS.Timeout | null = null;
    
//     if (!showRegistration && userId) {
//       // Check immediately after modal closes
//       checkVerificationStatus();
      
//       // Then check every 2 seconds for a short period
//       let checkCount = 0;
//       checkInterval = setInterval(() => {
//         if (checkCount < 5) { // Check up to 5 times (10 seconds)
//           checkVerificationStatus();
//           checkCount++;
//         } else if (checkInterval) {
//           clearInterval(checkInterval);
//         }
//       }, 2000);
//     }
    
//     return () => {
//       if (checkInterval) {
//         clearInterval(checkInterval);
//       }
//     };
//   }, [showRegistration, userId]);

//   const checkVerificationStatus = async () => {
//     try {
//       if (!userId) return;
      
//       // First check local storage (same logic as in RegistrationModal)
//       const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
//       const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
      
//       if (userVerified && vehicleVerified) {
//         console.log("Both verifications complete from localStorage, navigating to ride booking");
//         navigateToRideBooking(isForRider);
//         return;
//       }
      
//       // Then check with backend
//       const token = await getToken();
//       if (!token) return;
      
//       const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
      
//       const data = await response.json();
//       console.log("Verification status response:", data);
      
//       if (data.success && data.isUserVerified && data.isVehicleVerified) {
//         console.log("Both verifications complete from API, navigating to ride booking");
//         navigateToRideBooking(isForRider);
//       }
//     } catch (error) {
//       console.error("Error checking verification status:", error);
//     }
//   };

//   const handleRideButtonClick = (forRider = true) => {
//     setIsForRider(forRider);
//     setShowRegistration(true);
//   };

//   const navigateToRideBooking = (forRider: boolean) => {
//     navigate("/ride-booking", {
//       state: {
//         navMode: "simplified",
//         user: "verified",
//         mode: forRider ? "rider" : "driver"
//       }
//     });
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//     // The useEffect will handle checking verification status after modal closes
//   };

//   return (
//     <section className="hero-section">
//       {showRegistration && (
//         <RegistrationModal onClose={handleCloseModal} />
//       )}

//       <div className="hero-bg"></div>
      
//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               <span className="block">Hitch Ride</span>
//               <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 <Button 
//                   onClick={() => handleRideButtonClick(true)}
//                   className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                   </svg>
//                   Find a Ride
//                 </Button>
                
//                 <Button 
//                   className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
//                            text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                            transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   onClick={() => handleRideButtonClick(false)}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   Share a Ride
//                 </Button>
//               </div>
//             </div>
            
//             <div className="mt-8">
//               <button 
//                 onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
//                 className="flex items-center text-gray-600 hover:text-eco transition-colors"
//               >
//                 Learn how it works
//                 <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
//               </button>
//             </div>
//           </div>

//           <div className="relative">
//             <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
//               <img 
//                 src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
//                 alt="Hitch Ride Carpooling Service" 
//                 className="w-full h-full object-contain"
//               />

//               <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
//                 <path 
//                   d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
//                   stroke="#00E676" 
//                   strokeWidth="4" 
//                   strokeLinecap="round" 
//                   strokeDasharray="1000"
//                   strokeDashoffset="1000"
//                   fill="none" 
//                   className="route-line animate" 
//                 />
//               </svg>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;



import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import { RegistrationModal } from './registration/RegistrationModal';
import { useNavigate } from "react-router-dom";
import { useAuth } from '@clerk/clerk-react';

const Hero = () => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isForRider, setIsForRider] = useState(true);
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();

  // Function to handle ride button clicks
  const handleRideButtonClick = async (forRider = true) => {
    setIsForRider(forRider);
    
    // Only check verification status when explicitly clicking a ride button
    if (userId) {
      try {
        // Check local storage first for quick response
        const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
        const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
        if (userVerified && vehicleVerified) {
          // Both verifications complete, navigate to ride booking
          navigateToRideBooking(forRider);
          return;
        }
        
        // If not in localStorage, check with the server
        const token = await getToken();
        if (!token) {
          console.error("No token available");
          setShowRegistration(true);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const data = await response.json();
        console.log("Verification status response:", data);
        
        if (data.success && data.isUserVerified && data.isVehicleVerified) {
          // Both verifications complete, navigate to ride booking
          navigateToRideBooking(forRider);
        } else {
          // Verification incomplete, show registration modal
          setShowRegistration(true);
        }
      } catch (error) {
        console.error("Error checking verification status:", error);
        setShowRegistration(true);
      }
    } else {
      // No user ID, show registration modal
      setShowRegistration(true);
    }
  };

  const navigateToRideBooking = (forRider) => {
    // Set a flag in sessionStorage to indicate this is an explicit navigation
    // This can be used by other components to distinguish between explicit and automatic redirects
    sessionStorage.setItem('explicitNavigation', 'true');
    
    navigate("/ride-booking", {
      state: {
        navMode: "simplified",
        user: "verified",
        mode: forRider ? "rider" : "driver"
      }
    });
    
    // Clear the flag after a short delay
    setTimeout(() => {
      sessionStorage.removeItem('explicitNavigation');
    }, 1000);
  };

  const handleCloseModal = () => {
    setShowRegistration(false);
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({
      behavior: 'smooth'
    });
  };

  return (
    <section className="hero-section">
      {showRegistration && (
        <RegistrationModal onClose={handleCloseModal} />
      )}

      <div className="hero-bg"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="block">Hitch Ride</span>
              <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12">
              Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                <Button 
                  onClick={() => handleRideButtonClick(true)}
                  className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
                           text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                           transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                  Find a Ride
                </Button>
                
                <Button 
                  className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
                           text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                           transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  onClick={() => handleRideButtonClick(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  Share a Ride
                </Button>
              </div>
            </div>
            
            <div className="mt-8">
              <button 
                onClick={scrollToHowItWorks}
                className="flex items-center text-gray-600 hover:text-eco transition-colors"
              >
                Learn how it works
                <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="relative w-full aspect-square md:aspect-auto md:h-[450px]">
              <img 
                src="/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png" 
                alt="Hitch Ride Carpooling Service" 
                className="w-full h-full object-contain"
              />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
                <path 
                  d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
                  stroke="#00E676" 
                  strokeWidth="4" 
                  strokeLinecap="round" 
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  fill="none" 
                  className="route-line animate" 
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
