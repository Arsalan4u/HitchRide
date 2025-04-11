import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';

interface VehicleVerificationProps {
  onSubmit: (data: any) => void;
  onSkip: () => void;
  onClose?: () => void;
}

interface VehicleFormData {
  vehicleType: string;
  vehicleNumber: string;
  vehicleModel: string;
  vehiclePhoto: FileList | null;
  rcNumber: string;
  drivingLicence: FileList | null;
  dashcamPhoto: FileList | null;
}

export const VehicleVerification = ({ onSubmit, onSkip, onClose }: VehicleVerificationProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<VehicleFormData>({
    defaultValues: {
      vehicleType: 'car',
    },
    mode: 'onChange'
  });

  const vehicleType = watch('vehicleType');

  return (
    <div className="relative bg-[#F5F6F5] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        aria-label="Close verification form"
      >
        <X size={20} />
      </button>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h3 className="text-2xl font-bold text-[#1B5E20] mb-6">Vehicle Verification</h3>
        
        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">Vehicle Type</label>
          <select
            {...register('vehicleType')}
            className="w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0]"
          >
            <option value="car">Car</option>
            <option value="bike">Bike</option>
            <option value="suv">SUV</option>
            <option value="truck">Truck</option>
          </select>
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            Vehicle Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('vehicleNumber', { 
              required: 'Vehicle number is required',
              pattern: {
                value: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
                message: 'Enter valid vehicle number (e.g. MH01AB1234)'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.vehicleNumber ? 'border-red-500' : ''
            }`}
            placeholder="e.g. MH01AB1234"
          />
          {errors.vehicleNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            Vehicle Model <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('vehicleModel', { 
              required: 'Vehicle model is required',
              minLength: {
                value: 2,
                message: 'Model name should be at least 2 characters'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.vehicleModel ? 'border-red-500' : ''
            }`}
            placeholder="e.g. Swift Dzire"
          />
          {errors.vehicleModel && (
            <p className="text-red-500 text-sm mt-1">{errors.vehicleModel.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            RC Number <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register('rcNumber', { 
              required: 'RC number is required',
              pattern: {
                value: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
                message: 'Enter valid RC number'
              }
            })}
            className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
              errors.rcNumber ? 'border-red-500' : ''
            }`}
            placeholder="Enter RC number"
          />
          {errors.rcNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.rcNumber.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            Vehicle Photo <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              {...register('vehiclePhoto', { 
                required: 'Vehicle photo is required'
              })}
              className={`w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4] ${
                errors.vehiclePhoto ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.vehiclePhoto && (
            <p className="text-red-500 text-sm mt-1">{errors.vehiclePhoto.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            Driving Licence <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*,.pdf"
              {...register('drivingLicence', { 
                required: 'Driving licence is required'
              })}
              className={`w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4] ${
                errors.drivingLicence ? 'border-red-500' : ''
              }`}
            />
          </div>
          {errors.drivingLicence && (
            <p className="text-red-500 text-sm mt-1">{errors.drivingLicence.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label className="block text-sm font-medium text-[#1B5E20]">
            Dashcam Photo (Optional)
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              {...register('dashcamPhoto')}
              className="w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4]"
            />
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 py-3 bg-[#FFCA28] text-[#1B5E20] font-medium rounded-lg hover:bg-[#FFD54F] transition-colors shadow-md"
          >
            Skip for now
          </button>
          <button
            type="submit"
            disabled={!isValid}
            className={`flex-1 py-3 bg-[#4FC3F7] text-white font-medium rounded-lg hover:bg-[#03A9F4] transition-colors shadow-md ${
              !isValid ? 'opacity-70 cursor-not-allowed' : ''
            }`}
          >
            Complete Registration
          </button>
        </div>
      </form>
    </div>
  );
};