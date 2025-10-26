

// import React, { useState } from 'react';
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

//   // Function to handle ride button clicks
//   const handleRideButtonClick = async (forRider = true) => {
//     setIsForRider(forRider);
    
//     // Only check verification status when explicitly clicking a ride button
//     if (userId) {
//       try {
//         // Check local storage first for quick response
//         const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
//         const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
//         if (userVerified && vehicleVerified) {
//           // Both verifications complete, navigate to ride booking
//           navigateToRideBooking(forRider);
//           return;
//         }
        
//         // If not in localStorage, check with the server
//         const token = await getToken();
//         if (!token) {
//           console.error("No token available");
//           setShowRegistration(true);
//           return;
//         }
        
//         const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         const data = await response.json();
//         console.log("Verification status response:", data);
        
//         if (data.success && data.isUserVerified && data.isVehicleVerified) {
//           // Both verifications complete, navigate to ride booking
//           navigateToRideBooking(forRider);
//         } else {
//           // Verification incomplete, show registration modal
//           setShowRegistration(true);
//         }
//       } catch (error) {
//         console.error("Error checking verification status:", error);
//         setShowRegistration(true);
//       }
//     } else {
//       // No user ID, show registration modal
//       setShowRegistration(true);
//     }
//   };

//   const navigateToRideBooking = (forRider) => {
//     // Set a flag in sessionStorage to indicate this is an explicit navigation
//     // This can be used by other components to distinguish between explicit and automatic redirects
//     sessionStorage.setItem('explicitNavigation', 'true');
    
//     navigate("/ride-booking", {
//       state: {
//         navMode: "simplified",
//         user: "verified",
//         mode: forRider ? "rider" : "driver"
//       }
//     });
    
//     // Clear the flag after a short delay
//     setTimeout(() => {
//       sessionStorage.removeItem('explicitNavigation');
//     }, 1000);
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({
//       behavior: 'smooth'
//     });
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
//   const [isForRider, setIsForRider] = useState(true);
//   const navigate = useNavigate();
//   const { userId, getToken } = useAuth();

//   // Function to handle ride button clicks
//   const handleRideButtonClick = async (forRider = true) => {
//     setIsForRider(forRider);
    
//     // Only check verification status when explicitly clicking a ride button
//     if (userId) {
//       try {
//         // Check local storage first for quick response
//         const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
//         const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
//         if (forRider) {
//           // For "Find a Ride" (rider), only user verification is required
//           if (userVerified) {
//             navigateToRideBooking(forRider);
//             return;
//           }
//         } else {
//           // For "Share a Ride" (driver), both verifications are required
//           if (userVerified && vehicleVerified) {
//             navigateToRideBooking(forRider);
//             return;
//           }
//         }
        
//         // If not in localStorage, check with the server
//         const token = await getToken();
//         if (!token) {
//           console.error("No token available");
//           setShowRegistration(true);
//           return;
//         }
        
//         const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
        
//         const data = await response.json();
//         console.log("Verification status response:", data);
        
//         if (forRider) {
//           // For "Find a Ride" (rider), only user verification is required
//           if (data.success && data.isUserVerified) {
//             navigateToRideBooking(forRider);
//           } else {
//             setShowRegistration(true);
//           }
//         } else {
//           // For "Share a Ride" (driver), both verifications are required
//           if (data.success && data.isUserVerified && data.isVehicleVerified) {
//             navigateToRideBooking(forRider);
//           } else {
//             setShowRegistration(true);
//           }
//         }
//       } catch (error) {
//         console.error("Error checking verification status:", error);
//         setShowRegistration(true);
//       }
//     } else {
//       // No user ID, show registration modal
//       setShowRegistration(true);
//     }
//   };

//   const navigateToRideBooking = (forRider) => {
//     // Set a flag in sessionStorage to indicate this is an explicit navigation
//     sessionStorage.setItem('explicitNavigation', 'true');
    
//     navigate("/ride-booking", {
//       state: {
//         navMode: "simplified",
//         user: "verified",
//         mode: forRider ? "rider" : "driver"
//       }
//     });
    
//     // Clear the flag after a short delay
//     setTimeout(() => {
//       sessionStorage.removeItem('explicitNavigation');
//     }, 1000);
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({
//       behavior: 'smooth'
//     });
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

// const Hero = ({ isDriverView = false }) => {
//   const [showRegistration, setShowRegistration] = useState(false);
//   const [isForRider, setIsForRider] = useState(true);
//   const navigate = useNavigate();
//   const { userId, getToken } = useAuth();

//   const handleRideButtonClick = async (forRider = true) => {
//     setIsForRider(forRider);
    
//     if (userId) {
//       try {
//         const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
//         const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
//         if (forRider) {
//           // Rider flow - only user verification needed
//           if (userVerified) {
//             navigate("/ride-booking", { state: { mode: "rider" } });
//             return;
//           }
//         } else {
//           // Driver flow - both verifications needed
//           if (userVerified && vehicleVerified) {
//             navigate("/ride-booking", { state: { mode: "driver" } });
//             return;
//           }
//         }
        
//         const token = await getToken();
//         if (!token) {
//           setShowRegistration(true);
//           return;
//         }
        
//         const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//           headers: { Authorization: `Bearer ${token}` },
//         });
        
//         const data = await response.json();
        
//         if (forRider) {
//           if (data.success && data.isUserVerified) {
//             navigate("/ride-booking", { state: { mode: "rider" } });
//           } else {
//             setShowRegistration(true);
//           }
//         } else {
//           if (data.success && data.isUserVerified && data.isVehicleVerified) {
//             navigate("/ride-booking", { state: { mode: "driver" } });
//           } else {
//             setShowRegistration(true);
//           }
//         }
//       } catch (error) {
//         console.error("Error:", error);
//         setShowRegistration(true);
//       }
//     } else {
//       setShowRegistration(true);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowRegistration(false);
//   };

//   const scrollToHowItWorks = () => {
//     document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="hero-section">
//       {showRegistration && <RegistrationModal onClose={handleCloseModal} />}

//       <div className="hero-bg"></div>
      
//       <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
//           <div className="text-left">
//             <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
//               {isDriverView ? (
//                 <>
//                   <span className="block">Become a Hitch Ride Driver</span>
//                   <span className="text-eco block mt-2">Earn While You Commute</span>
//                 </>
//               ) : (
//                 <>
//                   <span className="block">Hitch Ride</span>
//                   <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
//                 </>
//               )}
//             </h1>
            
//             <p className="text-xl md:text-2xl text-gray-700 mb-12">
//               {isDriverView 
//                 ? "Share your ride and earn money while reducing traffic and pollution in Bengaluru"
//                 : "Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling"}
//             </p>
            
//             <div className="flex flex-col sm:flex-row items-center gap-4">
//               <div className="flex flex-col sm:flex-row gap-4 w-full">
//                 {!isDriverView && (
//                   <Button 
//                     onClick={() => handleRideButtonClick(true)}
//                     className="bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]
//                              text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                              transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
//                   >
//                     <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                       <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
//                     </svg>
//                     Find a Ride
//                   </Button>
//                 )}
                
//                 <Button 
//                   className={`${
//                     isDriverView 
//                       ? "bg-gradient-to-r from-[#FF9800] to-[#FB8C00] hover:from-[#FB8C00] hover:to-[#F57C00]"
//                       : "bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]"
//                   } text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
//                   transition-all duration-300 flex items-center justify-center w-full sm:w-auto`}
//                   onClick={() => handleRideButtonClick(false)}
//                 >
//                   <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
//                     <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
//                   </svg>
//                   {isDriverView ? "Start Driving Now" : "Share a Ride"}
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
//                 src={
//                   isDriverView 
//                     ? "/lovable-uploads/driver-hero-image.png" 
//                     : "/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png"
//                 } 
//                 alt={isDriverView ? "Hitch Ride Driver" : "Hitch Ride Carpooling"} 
//                 className="w-full h-full object-contain"
//               />

//               {!isDriverView && (
//                 <svg className="absolute inset-0 w-full h-full" viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
//                   <path 
//                     d="M200,180 C250,200 300,350 400,400 S550,480 640,320" 
//                     stroke="#00E676" 
//                     strokeWidth="4" 
//                     strokeLinecap="round" 
//                     strokeDasharray="1000"
//                     strokeDashoffset="1000"
//                     fill="none" 
//                     className="route-line animate" 
//                   />
//                 </svg>
//               )}
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

const Hero = ({ isDriverView = false }) => {
  const [showRegistration, setShowRegistration] = useState(false);
  const [isForRider, setIsForRider] = useState(true);
  const navigate = useNavigate();
  const { userId, getToken } = useAuth();

  const handleRideButtonClick = async (forRider = true) => {
    setIsForRider(forRider);
    
    if (userId) {
      try {
        const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
        const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
        
        if (forRider) {
          // Rider flow - only user verification needed
          if (userVerified) {
            navigate("/ride-booking", { state: { mode: "rider" } });
            return;
          }
        } else {
          // Driver flow - both verifications needed
          if (userVerified && vehicleVerified) {
            navigate("/ride-booking-driver"); // Updated to new driver route
            return;
          }
        }
        
        const token = await getToken();
        if (!token) {
          setShowRegistration(true);
          return;
        }
        
        const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = await response.json();
        
        if (forRider) {
          if (data.success && data.isUserVerified) {
            navigate("/ride-booking", { state: { mode: "rider" } });
          } else {
            setShowRegistration(true);
          }
        } else {
          if (data.success && data.isUserVerified && data.isVehicleVerified) {
            navigate("/ride-booking-driver"); // Updated to new driver route
          } else {
            setShowRegistration(true);
          }
        }
      } catch (error) {
        console.error("Error:", error);
        setShowRegistration(true);
      }
    } else {
      setShowRegistration(true);
    }
  };

  const handleCloseModal = () => {
    setShowRegistration(false);
  };

  const scrollToHowItWorks = () => {
    document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      {showRegistration && <RegistrationModal onClose={handleCloseModal} />}

      <div className="hero-bg"></div>
      
      <div className="relative z-10 container mx-auto px-4 pt-24 md:pt-32 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
              {isDriverView ? (
                <>
                  <span className="block">Become a Hitch Ride Driver</span>
                  <span className="text-eco block mt-2">Earn While You Commute</span>
                </>
              ) : (
                <>
                  <span className="block">Hitch Ride</span>
                  <span className="text-eco block mt-2">A Smarter Way to Share Rides</span>
                </>
              )}
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-700 mb-12">
              {isDriverView 
                ? "Share your ride and earn money while reducing traffic and pollution in Bengaluru"
                : "Reduce traffic, pollution, and costs in Bengaluru through intelligent carpooling"}
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex flex-col sm:flex-row gap-4 w-full">
                {!isDriverView && (
                  <Button 
                    onClick={() => handleRideButtonClick(true)}
                    className="bg-gradient-to-r from-[#00E676] to-[#00C853] hover:from-[#00C853] hover:to-[#00B84A]
                             text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                             transition-all duration-300 flex items-center justify-center w-full sm:w-auto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                    Find a Ride
                  </Button>
                )}
                
                <Button 
                  className={`${
                    isDriverView 
                      ? "bg-gradient-to-r from-[#FF9800] to-[#FB8C00] hover:from-[#FB8C00] hover:to-[#F57C00]"
                      : "bg-gradient-to-r from-[#4FC3F7] to-[#03A9F4] hover:from-[#03A9F4] hover:to-[#0288D1]"
                  } text-white text-lg font-medium py-3 px-6 rounded-full shadow-md hover:shadow-lg
                  transition-all duration-300 flex items-center justify-center w-full sm:w-auto`}
                  onClick={() => handleRideButtonClick(false)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6z" />
                  </svg>
                  {isDriverView ? "Start Driving Now" : "Share a Ride"}
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
                src={
                  isDriverView 
                    ? "/lovable-uploads/driver-hero-image.png" 
                    : "/lovable-uploads/13a1e940-3c32-4543-882f-2035b3eb24e0.png"
                } 
                alt={isDriverView ? "Hitch Ride Driver" : "Hitch Ride Carpooling"} 
                className="w-full h-full object-contain"
              />

              {!isDriverView && (
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
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;