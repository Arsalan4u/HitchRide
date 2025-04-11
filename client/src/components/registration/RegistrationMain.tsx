import { useState } from 'react';
import { X } from 'lucide-react';
import { UserVerification } from './UserVerification';
import { VehicleVerification } from './VehicleVerification';

export const RegistrationMain = () => {
  const [step, setStep] = useState<number>(1);
  const [userData, setUserData] = useState<any>(null);
  const [showModal, setShowModal] = useState(true);

  const handleUserSubmit = (data: any) => {
    setUserData(data);
    setStep(2);
  };

  const handleVehicleSubmit = (data: any) => {
    const completeData = { ...userData, ...data };
    console.log('Registration complete:', completeData);
    setShowModal(false);
    // TODO: Add success notification if needed
  };

  const handleSkipVehicle = () => {
    console.log('Vehicle verification skipped:', userData);
    setShowModal(false);
    // TODO: Handle skip logic
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Blurred background overlay */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={handleCloseModal}
        aria-hidden="true"
      />

      {/* Modal content */}
      <div className="relative z-60 w-full max-w-md bg-[#F5F6F5] rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
        {/* Sticky header for step indicator and close button */}
        <div className="sticky top-0 z-10 bg-[#F5F6F5] p-6 border-b border-gray-200">
          <button
            onClick={handleCloseModal}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close registration modal"
          >
            <X size={24} />
          </button>

          {/* Step indicator */}
          <div className="flex justify-center gap-8 mb-6">
            <span
              className={`font-medium text-sm ${
                step >= 1 ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              Step 1: User
            </span>
            <span
              className={`font-medium text-sm ${
                step === 2 ? 'text-[#1B5E20]' : 'text-gray-400'
              }`}
            >
              Step 2: Vehicle
            </span>
          </div>
        </div>

        {/* Form content */}
        <div className="p-6">
          {step === 1 && (
            <UserVerification
              onSubmit={handleUserSubmit}
              onClose={handleCloseModal}
              onNext={() => setStep(2)}
            />
          )}
          {step === 2 && (
            <VehicleVerification
              onSubmit={handleVehicleSubmit}
              onSkip={handleSkipVehicle}
              onClose={handleCloseModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};