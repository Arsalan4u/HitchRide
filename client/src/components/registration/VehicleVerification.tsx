// import { useForm } from 'react-hook-form';
// import { X } from 'lucide-react';

// interface VehicleVerificationProps {
//   onSubmit: (data: any) => void;
//   onSkip: () => void;
//   onClose?: () => void;
// }

// interface VehicleFormData {
//   vehicleType: string;
//   vehicleNumber: string;
//   vehicleModel: string;
//   vehiclePhoto: FileList | null;
//   rcNumber: string;
//   drivingLicence: FileList | null;
//   dashcamPhoto: FileList | null;
// }

// export const VehicleVerification = ({ onSubmit, onSkip, onClose }: VehicleVerificationProps) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isValid },
//     watch,
//   } = useForm<VehicleFormData>({
//     defaultValues: {
//       vehicleType: 'car',
//     },
//     mode: 'onChange'
//   });

//   const vehicleType = watch('vehicleType');

//   return (
//     <div className="relative bg-[#F5F6F5] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
//       {/* Close button */}
//       <button
//         onClick={onClose}
//         className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//         aria-label="Close verification form"
//       >
//         <X size={20} />
//       </button>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <h3 className="text-2xl font-bold text-[#1B5E20] mb-6">Vehicle Verification</h3>
        
//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">Vehicle Type</label>
//           <select
//             {...register('vehicleType')}
//             className="w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0]"
//           >
//             <option value="car">Car</option>
//             <option value="bike">Bike</option>
//             <option value="suv">SUV</option>
//             <option value="truck">Truck</option>
//           </select>
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             Vehicle Number <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             {...register('vehicleNumber', { 
//               required: 'Vehicle number is required',
//               pattern: {
//                 value: /^[A-Z]{2}[0-9]{1,2}[A-Z]{1,2}[0-9]{4}$/,
//                 message: 'Enter valid vehicle number (e.g. MH01AB1234)'
//               }
//             })}
//             className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
//               errors.vehicleNumber ? 'border-red-500' : ''
//             }`}
//             placeholder="e.g. MH01AB1234"
//           />
//           {errors.vehicleNumber && (
//             <p className="text-red-500 text-sm mt-1">{errors.vehicleNumber.message}</p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             Vehicle Model <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             {...register('vehicleModel', { 
//               required: 'Vehicle model is required',
//               minLength: {
//                 value: 2,
//                 message: 'Model name should be at least 2 characters'
//               }
//             })}
//             className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
//               errors.vehicleModel ? 'border-red-500' : ''
//             }`}
//             placeholder="e.g. Swift Dzire"
//           />
//           {errors.vehicleModel && (
//             <p className="text-red-500 text-sm mt-1">{errors.vehicleModel.message}</p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             RC Number <span className="text-red-500">*</span>
//           </label>
//           <input
//             type="text"
//             {...register('rcNumber', { 
//               required: 'RC number is required',
//               pattern: {
//                 value: /^[A-Z]{2}[0-9]{2}[A-Z]{1,2}[0-9]{4}$/,
//                 message: 'Enter valid RC number'
//               }
//             })}
//             className={`w-full p-3 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] ${
//               errors.rcNumber ? 'border-red-500' : ''
//             }`}
//             placeholder="Enter RC number"
//           />
//           {errors.rcNumber && (
//             <p className="text-red-500 text-sm mt-1">{errors.rcNumber.message}</p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             Vehicle Photo <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*"
//               {...register('vehiclePhoto', { 
//                 required: 'Vehicle photo is required'
//               })}
//               className={`w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4] ${
//                 errors.vehiclePhoto ? 'border-red-500' : ''
//               }`}
//             />
//           </div>
//           {errors.vehiclePhoto && (
//             <p className="text-red-500 text-sm mt-1">{errors.vehiclePhoto.message}</p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             Driving Licence <span className="text-red-500">*</span>
//           </label>
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*,.pdf"
//               {...register('drivingLicence', { 
//                 required: 'Driving licence is required'
//               })}
//               className={`w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4] ${
//                 errors.drivingLicence ? 'border-red-500' : ''
//               }`}
//             />
//           </div>
//           {errors.drivingLicence && (
//             <p className="text-red-500 text-sm mt-1">{errors.drivingLicence.message}</p>
//           )}
//         </div>

//         <div className="space-y-3">
//           <label className="block text-sm font-medium text-[#1B5E20]">
//             Dashcam Photo (Optional)
//           </label>
//           <div className="relative">
//             <input
//               type="file"
//               accept="image/*"
//               {...register('dashcamPhoto')}
//               className="w-full p-2 border border-[#2E7D32] rounded-lg focus:ring-2 focus:ring-[#4CAF50] focus:border-[#4CAF50] bg-[#E0E0E0] file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-[#4FC3F7] file:text-white hover:file:bg-[#03A9F4]"
//             />
//           </div>
//         </div>

//         <div className="flex gap-4 pt-6">
//           <button
//             type="button"
//             onClick={onSkip}
//             className="flex-1 py-3 bg-[#FFCA28] text-[#1B5E20] font-medium rounded-lg hover:bg-[#FFD54F] transition-colors shadow-md"
//           >
//             Skip for now
//           </button>
//           <button
//             type="submit"
//             disabled={!isValid}
//             className={`flex-1 py-3 bg-[#4FC3F7] text-white font-medium rounded-lg hover:bg-[#03A9F4] transition-colors shadow-md ${
//               !isValid ? 'opacity-70 cursor-not-allowed' : ''
//             }`}
//           >
//             Complete Registration
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };


//------------------------------------------------------------------------------------------------------------------

// import { useState } from 'react';
// import { useAuth } from '@clerk/clerk-react';

// export const VehicleVerification = ({ onSubmit, onClose, onSkip }: any) => {
//   const { userId } = useAuth();

//   const [formData, setFormData] = useState({
//     vehicleType: '',
//     vehicleNumber: '',
//     vehicleModel: '',
//     rcNumber: '',
//   });

//   const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
//   const [drivingLicence, setDrivingLicence] = useState<File | null>(null);
//   const [dashcamPhoto, setDashcamPhoto] = useState<File | null>(null);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleChange = (e: any) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleFileChange = (e: any, setter: any) => {
//     if (e.target.files && e.target.files[0]) {
//       setter(e.target.files[0]);
//     }
//   };

//   const handleSubmit = async (e: any) => {
//     e.preventDefault();

//     if (!userId) return setError('User not authenticated');

//     if (!formData.vehicleType || !formData.vehicleNumber || !formData.vehicleModel || !formData.rcNumber) {
//       return setError('Please fill all text fields');
//     }

//     if (!vehiclePhoto || !drivingLicence || !dashcamPhoto) {
//       return setError('All 3 files are required');
//     }

//     setLoading(true);
//     setError('');

//     try {
//       const submission = new FormData();
//       submission.append('userId', userId);
//       submission.append('vehicleType', formData.vehicleType);
//       submission.append('vehicleNumber', formData.vehicleNumber);
//       submission.append('vehicleModel', formData.vehicleModel);
//       submission.append('rcNumber', formData.rcNumber);
//       submission.append('vehiclePhoto', vehiclePhoto);
//       submission.append('drivingLicence', drivingLicence);
//       submission.append('dashcamPhoto', dashcamPhoto);

//       const res = await fetch('http://localhost:5000/api/vehicle/verify', {
//         method: 'POST',
//         body: submission,
//       });

//       const data = await res.json();

//       if (!res.ok) throw new Error(data.message || 'Submission failed');

//       onSubmit(data); // success
//     } catch (err: any) {
//       setError(err.message || 'Something went wrong');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4">
//       <div>
//         <label>Vehicle Type</label>
//         <select name="vehicleType" onChange={handleChange} value={formData.vehicleType} required className="w-full p-2 border rounded">
//           <option value="">Select</option>
//           <option value="car">Car</option>
//           <option value="bike">Bike</option>
//           <option value="auto">Auto</option>
//         </select>
//       </div>

//       <div>
//         <label>Vehicle Number</label>
//         <input name="vehicleNumber" type="text" value={formData.vehicleNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
//       </div>

//       <div>
//         <label>Vehicle Model</label>
//         <input name="vehicleModel" type="text" value={formData.vehicleModel} onChange={handleChange} required className="w-full p-2 border rounded" />
//       </div>

//       <div>
//         <label>RC Number</label>
//         <input name="rcNumber" type="text" value={formData.rcNumber} onChange={handleChange} required className="w-full p-2 border rounded" />
//       </div>

//       <div>
//         <label>Vehicle Photo</label>
//         <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setVehiclePhoto)} required className="w-full" />
//       </div>

//       <div>
//         <label>Driving Licence</label>
//         <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDrivingLicence)} required className="w-full" />
//       </div>

//       <div>
//         <label>Dashcam Photo</label>
//         <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, setDashcamPhoto)} required className="w-full" />
//       </div>

//       {error && <p className="text-red-600">{error}</p>}

//       <div className="flex gap-4">
//         <button type="submit" disabled={loading} className="bg-green-700 text-white py-2 px-4 rounded hover:bg-green-800">
//           {loading ? 'Submitting...' : 'Submit'}
//         </button>
//         {onSkip && (
//           <button type="button" onClick={onSkip} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400">
//             Skip
//           </button>
//         )}
//         {onClose && (
//           <button type="button" onClick={onClose} className="text-gray-600 underline">
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };




//----------------------------------------------------------------------------------------------------------------------------


import { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';

export const VehicleVerification = ({ onSubmit, onClose, onSkip }: any) => {
  const { userId } = useAuth();

  const [formData, setFormData] = useState({
    vehicleType: '',
    vehicleNumber: '',
    vehicleModel: '',
    rcNumber: '',
  });

  const [vehiclePhoto, setVehiclePhoto] = useState<File | null>(null);
  const [drivingLicence, setDrivingLicence] = useState<File | null>(null);
  const [dashcamPhoto, setDashcamPhoto] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: any, setter: any) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!userId) return setError('User not authenticated');

    if (!formData.vehicleType || !formData.vehicleNumber || !formData.vehicleModel || !formData.rcNumber) {
      return setError('Please fill all text fields');
    }

    if (!vehiclePhoto || !drivingLicence || !dashcamPhoto) {
      return setError('All 3 files are required');
    }

    setLoading(true);
    setError('');

    try {
      const submission = new FormData();
      submission.append('userId', userId);
      submission.append('vehicleType', formData.vehicleType);
      submission.append('vehicleNumber', formData.vehicleNumber);
      submission.append('vehicleModel', formData.vehicleModel);
      submission.append('rcNumber', formData.rcNumber);
      submission.append('vehiclePhoto', vehiclePhoto);
      submission.append('drivingLicence', drivingLicence);
      submission.append('dashcamPhoto', dashcamPhoto);

      const res = await fetch('http://localhost:5000/api/vehicle/verify', {
        method: 'POST',
        body: submission,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || 'Submission failed');

      onSubmit(data); // success
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
<form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
  <h2 className="text-xl font-semibold text-gray-800">Vehicle Verification</h2>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
    <select
      name="vehicleType"
      onChange={handleChange}
      value={formData.vehicleType}
      required
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      <option value="">Select vehicle type</option>
      <option value="car">Car</option>
      <option value="bike">Bike</option>
      <option value="auto">Auto</option>
    </select>
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Number</label>
    <input
      name="vehicleNumber"
      type="text"
      value={formData.vehicleNumber}
      onChange={handleChange}
      required
      minLength={5}
      maxLength={15}
      pattern="[A-Za-z0-9\s\-]+"
      placeholder="e.g. DL8CAF5032"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Model</label>
    <input
      name="vehicleModel"
      type="text"
      value={formData.vehicleModel}
      onChange={handleChange}
      required
      placeholder="e.g. Swift VXI"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">RC Number</label>
    <input
      name="rcNumber"
      type="text"
      value={formData.rcNumber}
      onChange={handleChange}
      required
      placeholder="e.g. RC1234567890"
      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Photo</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, setVehiclePhoto)}
      required
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Driving Licence</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, setDrivingLicence)}
      required
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Dashcam Photo</label>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleFileChange(e, setDashcamPhoto)}
      required
      className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
    />
  </div>

  {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

  <div className="flex gap-3">
    <button
      type="submit"
      disabled={loading}
      className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 disabled:opacity-50"
    >
      {loading ? 'Submitting...' : 'Submit'}
    </button>
    {onSkip && (
      <button
        type="button"
        onClick={onSkip}
        className="bg-gray-100 px-4 py-2 rounded-md text-gray-700 hover:bg-gray-200"
      >
        Skip
      </button>
    )}
    {onClose && (
      <button
        type="button"
        onClick={onClose}
        className="text-gray-600 underline"
      >
        Cancel
      </button>
    )}
</div>
</form>
);
};
