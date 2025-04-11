import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

interface UserVerificationProps {
  onSubmit: (data: any) => void;
  onClose?: () => void;
  onNext?: () => void;
}

interface FormData {
  fullName: string;
  phone: string;
  aadharNumber: string;
  gender: string;
  dob: string;
}

export const UserVerification = ({ onSubmit, onClose, onNext }: UserVerificationProps) => {
  const { userId, getToken } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({ mode: 'onChange' });

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  const handleVerify = async (data: FormData) => {
    if (!userId) {
      setVerificationError('User not authenticated');
      return;
    }

    setIsVerifying(true);
    setVerificationError('');
    
    try {
      const sessionToken = await getToken();
      const response = await fetch('/api/verification', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${sessionToken}`
        },
        body: JSON.stringify({
          clerkUserId: userId,
          fullName: data.fullName,
          phone: data.phone,
          aadharNumber: data.aadharNumber,
          gender: data.gender,
          dob: data.dob
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
      }

      setIsVerified(true);
      onSubmit(data);
      localStorage.setItem('isVerified', 'true');
    } catch (error) {
      console.error('Verification error:', error);
      setVerificationError(error instanceof Error ? error.message : 'Verification failed');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    if (onNext && isVerified) {
      onNext();
    }
  };

  return (
    <div className="relative bg-[#F5F6F5] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close verification form"
      >
        <X size={20} />
      </button>
      
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <h3 className="text-2xl font-bold text-[#1B5E20] mb-6">User Verification</h3>
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Full Name</label>
          <input
            type="text"
            {...register('fullName', { 
              required: 'Full name is required',
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'Name should contain only letters and spaces'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.fullName ? 'border-red-500' : ''
            }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Phone Number</label>
          <input
            type="tel"
            {...register('phone', { 
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.phone ? 'border-red-500' : ''
            }`}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Aadhar Number</label>
          <input
            type="text"
            {...register('aadharNumber', { 
              required: 'Aadhar number is required',
              pattern: {
                value: /^[0-9]{12}$/,
                message: 'Aadhar number must be 12 digits'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.aadharNumber ? 'border-red-500' : ''
            }`}
            placeholder="Enter 12-digit Aadhar number"
          />
          {errors.aadharNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.aadharNumber.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.gender ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
            <option value="prefer-not-to-say">Prefer not to say</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Date of Birth</label>
          <input
            type="date"
            {...register('dob', { 
              required: 'Date of birth is required',
              validate: (value) => {
                const dob = new Date(value);
                const today = new Date();
                const age = today.getFullYear() - dob.getFullYear();
                if (age < 18) return 'You must be at least 18 years old';
                return true;
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.dob ? 'border-red-500' : ''
            }`}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob.message}</p>
          )}
        </div>

        <div className="pt-4 flex flex-col gap-4">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={handleSubmit(handleVerify)}
              disabled={!isValid || isVerifying}
              className={`flex-1 py-3 bg-[#00C853] text-white font-medium rounded-lg hover:bg-[#00B84A] transition-colors shadow-md ${
                (!isValid || isVerifying) ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isVerifying ? 'Verifying...' : 'Verify'}
            </button>
            <button
              type="submit"
              disabled={!isVerified}
              className={`flex-1 py-3 bg-[#4FC3F7] text-white font-medium rounded-lg hover:bg-[#03A9F4] transition-colors shadow-md ${
                !isVerified ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              Next: Vehicle Verification
            </button>
          </div>
          
          {verificationError && (
            <p className="text-red-500 text-sm text-center">{verificationError}</p>
          )}
        </div>
      </form>
    </div>
  );
};