// import { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { UserVerification } from './UserVerification';
// import { VehicleVerification } from './VehicleVerification';
// import { useAuth } from '@clerk/clerk-react';

// interface RegistrationModalProps {
//   onClose: () => void;
//   onComplete: () => void;
// }

// export const RegistrationModal = ({ onClose,onComplete }: RegistrationModalProps) => {
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



// // //------------------------------------------------------------------------------------------------------------------



// import { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import { UserVerification } from './UserVerification';
// import { VehicleVerification } from './VehicleVerification';
// import { useAuth } from '@clerk/clerk-react';

// interface RegistrationModalProps {
//   onClose: () => void;
//   onComplete: () => void;
// }

// export const RegistrationModal = ({ onClose, onComplete }: RegistrationModalProps) => {
//   const { userId, getToken } = useAuth();
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

//   // Check verification status when modal opens
//   useEffect(() => {
//     const checkVerificationStatus = async () => {
//       try {
//         if (userId) {
//           const token = await getToken();
//           const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           });

//           if (!response.ok) {
//             throw new Error('Failed to check verification status');
//           }

//           const data = await response.json();

//           if (data.success) {
//             setIsUserVerified(data.isUserVerified);
//             setIsVehicleVerified(data.isVehicleVerified);

//             // If user is verified but vehicle is not, show vehicle form
//             if (data.isUserVerified && !data.isVehicleVerified) {
//               setStep(2);
//             }
//             // If both are verified, close the modal
//             else if (data.isUserVerified && data.isVehicleVerified) {
//               onComplete();
//             }
//           }
//         }
//       } catch (error) {
//         console.error('Error checking verification status:', error);
//       } finally {
//         setModalReady(true);
//       }
//     };

//     checkVerificationStatus();
//   }, [userId, getToken, onComplete]);

//   const handleUserSubmit = (data: any) => {
//     setUserData(data);
//     setIsUserVerified(true);
//     setStep(2);
//   };

//   const handleVehicleSubmit = (data: any) => {
//     const completeData = { ...userData, ...data };
//     console.log('Full Registration Data:', completeData);
//     setIsVehicleVerified(true);
//     onComplete();
//   };

//   const handleSkipVehicle = () => {
//     console.log('Skipped Vehicle Verification for:', userData);
//     onComplete();
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
//             {step === 1 && !isUserVerified && <UserVerification onNext={handleUserSubmit} onBack={onClose} />}
//             {(step === 2 || isUserVerified) && !isVehicleVerified && (
//               <VehicleVerification onSubmit={handleVehicleSubmit} onSkip={handleSkipVehicle} />
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };



// // //------------------------------------------------------------------------------------------------------------------





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


import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { UserVerification } from './UserVerification';
import { VehicleVerification } from './VehicleVerification';
import { useAuth } from '@clerk/clerk-react';

interface RegistrationModalProps {
  onClose: () => void;
}

export const RegistrationModal = ({ onClose }: RegistrationModalProps) => {
  const { userId, getToken } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>(null);
  const [modalReady, setModalReady] = useState(false);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isVehicleVerified, setIsVehicleVerified] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const checkVerificationStatus = async () => {
      // First check local storage
      if (userId) {
        const userVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
        const vehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';

        setIsUserVerified(userVerified);
        setIsVehicleVerified(vehicleVerified);

        // If user is already verified, show vehicle form directly
        if (userVerified && !vehicleVerified) {
          setStep(2);
        } else {
          setStep(1);
        }
      }

      // You can also check with backend if needed
      try {
        if (userId) {
          const token = await getToken();  // Use getToken directly from useAuth

          if (!token) {
            console.error('No token available');
            return;
          }

          const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,  // Add the Bearer token here
            },
          });

          const data = await response.json();

          if (data.isUserVerified) {
            setIsUserVerified(true);
            if (!data.isVehicleVerified) {
              setStep(2);
            }
          }

          if (data.isVehicleVerified) {
            setIsVehicleVerified(true);
          }
        }
      } catch (error) {
        console.error('Error checking verification status:', error);
      }

      setModalReady(true);
    };

    checkVerificationStatus();
  }, [userId, getToken]);

  // Check if both verifications are complete
  useEffect(() => {
    if (isUserVerified && isVehicleVerified) {
      // Both verifications complete, close modal or show success
      onClose();
    }
  }, [isUserVerified, isVehicleVerified, onClose]);

  const handleUserSubmit = (data: any) => {
    setUserData(data);
    const userIdentifier = data.email || data.userId || userId;

    // Save verification status
    if (userIdentifier) {
      localStorage.setItem(`isVerified_${userIdentifier}`, 'true');
      if (userId) {
        localStorage.setItem(`isVerified_${userId}`, 'true');
      }
    }

    setIsUserVerified(true);
    setStep(2);
  };

  const handleVehicleSubmit = (data: any) => {
    const completeData = { ...userData, ...data };
    console.log('Full Registration Data:', completeData);

    // Save vehicle verification status
    if (userId) {
      localStorage.setItem(`vehicleVerified_${userId}`, 'true');
    }

    setIsVehicleVerified(true);
    onClose();
  };

  const handleSkipVehicle = () => {
    console.log('Skipped Vehicle Verification for:', userData);
    onClose();
  };

  // Show loading while checking verification status
  if (!modalReady) return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" />
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 h-screen w-full">
        <div className="bg-white p-6 rounded-lg shadow-xl">
          Loading verification status...
        </div>
      </div>
    </>
  );

  // If both verifications are complete, don't show anything
  if (isUserVerified && isVehicleVerified) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose} />
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 h-screen w-full overflow-y-auto">
        <div
          className="relative w-full max-w-md rounded-lg shadow-xl bg-[#F5F6F5] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-10 p-6 bg-[#C8E6C9] rounded-t-lg">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              aria-label="Close registration modal"
            >
              <X size={24} />
            </button>

            {/* Stepper */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                {/* Step 1 */}
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'}`}
                  >
                    <span className="font-medium">1</span>
                  </div>
                  <span className="mt-2 font-medium text-sm">USER</span>
                </div>

                {/* Line */}
                <div className={`w-16 h-1 mx-2 ${step >= 2 ? 'bg-[#1B5E20]' : 'bg-gray-300'}`} />

                {/* Step 2 */}
                <div className={`flex flex-col items-center ${step === 2 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'}`}
                  >
                    <span className="font-medium">2</span>
                  </div>
                  <span className="mt-2 font-medium text-sm text-center">VEHICLE</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {step === 1 && !isUserVerified && <UserVerification onSubmit={handleUserSubmit} />}
            {(step === 2 || isUserVerified) && !isVehicleVerified && (
              <VehicleVerification onSubmit={handleVehicleSubmit} onSkip={handleSkipVehicle} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};