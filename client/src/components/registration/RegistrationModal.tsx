import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { UserVerification } from './UserVerification';
import { VehicleVerification } from './VehicleVerification';

interface RegistrationModalProps {
  onClose: () => void;
}

export const RegistrationModal = ({ onClose }: RegistrationModalProps) => {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>(null);

  // Lock body scroll when modal opens and restore when closed
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  // Scroll to top when modal opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleUserSubmit = (data: any) => {
    setUserData(data);
    setStep(2);
  };

  const handleVehicleSubmit = (data: any) => {
    const completeData = { ...userData, ...data };
    console.log('Registration complete:', completeData);
    onClose();
  };

  const handleSkipVehicle = () => {
    console.log('Vehicle verification skipped:', userData);
    onClose();
  };

  return (
    <>
      {/* Non-interactive blurred background */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal container with forced top positioning */}
      <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center p-4 h-screen w-full overflow-y-auto">
        <div 
          className="relative w-full max-w-md rounded-lg shadow-xl bg-[#F5F6F5] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Rest of your existing modal content */}
          <div className="sticky top-0 z-10 p-6 bg-[#C8E6C9] rounded-t-lg">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close registration modal"
            >
              <X size={24} />
            </button>
            
            {/* Step indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex items-center">
                {/* Step 1 - User */}
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step >= 1 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'}`}>
                    <span className="font-medium">1</span>
                  </div>
                  <span className="mt-2 font-medium text-sm">USER</span>
                </div>
                
                {/* Connector line */}
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#1B5E20]' : 'bg-gray-200'}`} />
                
                {/* Step 2 - Vehicle */}
                <div className={`flex flex-col items-center ${step === 2 ? 'text-[#1B5E20]' : 'text-gray-500'}`}>
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${step === 2 ? 'bg-[#1B5E20] text-white' : 'bg-gray-200'}`}>
                    <span className="font-medium">2</span>
                  </div>
                  <span className="mt-2 font-medium text-sm">VEHICLE</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {step === 1 && (
              <UserVerification
                onSubmit={handleUserSubmit}
                onClose={onClose}
                onNext={() => setStep(2)}
              />
            )}
            {step === 2 && (
              <VehicleVerification
                onSubmit={handleVehicleSubmit}
                onSkip={handleSkipVehicle}
                onClose={onClose}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};