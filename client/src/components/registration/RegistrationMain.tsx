import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { UserVerification } from './UserVerification';
import {VehicleVerification} from './VehicleVerification';
import { useAuth } from '@clerk/clerk-react';

export const RegistrationMain = () => {
  const { userId } = useAuth();
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isUserVerified, setIsUserVerified] = useState(false);
  const [isVehicleVerified, setIsVehicleVerified] = useState(false);

  // Function to handle register button click
  const handleRegisterClick = () => {
    setShowModal(true);
    checkVerificationStatus();
  };

  // Check verification status from backend and localStorage
  const checkVerificationStatus = async () => {
    if (!userId) return;
    
    try {
      // First check local storage
      const storedUserVerified = localStorage.getItem(`isVerified_${userId}`) === 'true';
      const storedVehicleVerified = localStorage.getItem(`vehicleVerified_${userId}`) === 'true';
      
      // Then fetch from backend to confirm
      const response = await fetch(`http://localhost:5000/api/verification/check-status?userId=${userId}`);
      const data = await response.json();
      
      // Set verification status
      const userVerified = storedUserVerified || (data && data.isUserVerified);
      const vehicleVerified = storedVehicleVerified || (data && data.isVehicleVerified);
      
      setIsUserVerified(userVerified);
      setIsVehicleVerified(vehicleVerified);
      
      // If user is already verified, show vehicle form directly
      if (userVerified && !vehicleVerified) {
        setStep(2);
      } else {
        setStep(1);
      }
    } catch (error) {
      console.error('Error checking verification:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Initial check when component mounts
    if (userId) {
      checkVerificationStatus();
    } else {
      setLoading(false);
    }
  }, [userId]);

  const handleUserSubmit = (data: any) => {
    setUserData(data);
    setIsUserVerified(true);
    localStorage.setItem(`isVerified_${userId}`, 'true');
    setStep(2);
  };

  const handleVehicleSubmit = (data: any) => {
    const completeData = { ...userData, ...data };
    console.log('Registration complete:', completeData);
    localStorage.setItem(`vehicleVerified_${userId}`, 'true');
    setIsVehicleVerified(true);
    setShowModal(false);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleSkipVehicle = () => {
    console.log("Vehicle verification skipped.");
    setShowModal(false);
  };

  // Check if both verifications are complete
  useEffect(() => {
    if (isUserVerified && isVehicleVerified) {
      // Both verifications complete, maybe show a success message or close modal
      setShowModal(false);
    }
  }, [isUserVerified, isVehicleVerified]);

  // Register button component
  const RegisterButton = () => (
    <button 
      onClick={handleRegisterClick}
      className="bg-[#1B5E20] text-white py-2 px-6 rounded-lg hover:bg-[#2E7D32] transition-all"
    >
      Register
    </button>
  );

  // Modal component
  const VerificationModal = () => {
    if (!showModal) return null;
    if (loading) return <div>Loading verification status...</div>;
    
    return (
      <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" onClick={handleCloseModal} />
        
        <div className="relative z-60 w-full max-w-md bg-[#F5F6F5] rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 z-10 bg-[#F5F6F5] p-6 border-b border-gray-200">
            <button onClick={handleCloseModal} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
              <X size={24} />
            </button>
            <div className="flex justify-center gap-8 mb-6">
              <span className={`font-medium text-sm ${step >= 1 ? 'text-[#1B5E20]' : 'text-gray-400'}`}>
                Step 1: User
              </span>
              <span className={`font-medium text-sm ${step === 2 ? 'text-[#1B5E20]' : 'text-gray-400'}`}>
                Step 2: Vehicle
              </span>
            </div>
          </div>
          <div className="p-6">
            {step === 1 ? (
              <UserVerification
                onSubmit={handleUserSubmit}
                onClose={handleCloseModal}
                onNext={() => setStep(2)}
              />
            ) : (
              <VehicleVerification
                onSubmit={handleVehicleSubmit}
                onClose={handleCloseModal}
                onSkip={handleSkipVehicle}
              />
            )}
          </div>
        </div>
      </div>
      </>
    
    );
  };


}



//------------------------------------------------------------------------------

