// import { useForm } from 'react-hook-form';
// import { X } from 'lucide-react';
// import { useState, useEffect } from 'react';
// import { useAuth } from '@clerk/clerk-react';

// interface UserVerificationProps {
//   onSubmit: (data: any) => void;
//   onClose?: () => void;
//   onNext?: () => void;
// }

// interface FormData {
//   fullName: string;
//   phone: string;
//   aadharNumber: string;
//   gender: string;
//   dob: string;
// emergencyContacts: {
//     priority1: { name: string, number: number },
//     priority2: { name: string, number: number },
//     priority3: { name: string, number: number }
// }
// }

// export const UserVerification = ({ onSubmit, onClose, onNext }: UserVerificationProps) => {
//   const { userId, getToken } = useAuth();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>({ mode: 'onChange' });

//   const [isVerified, setIsVerified] = useState(false);
//   const [isVerifying, setIsVerifying] = useState(false);
//   const [verificationError, setVerificationError] = useState('');

//   useEffect(() => {
//     if (userId) {
//       const stored = localStorage.getItem(`isVerified_${userId}`);
//       setIsVerified(stored === 'true');
//     }
//   }, [userId]);

//   const handleVerify = async (data: FormData) => {
//     setIsVerifying(true);
//     setVerificationError('');

//     try {
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/verification/verify-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId,
//           ...data,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Verification failed');
//       }

//       if (userId) {
//         localStorage.setItem(`isVerified_${userId}`, 'true');
//       }

//       setIsVerified(true);
//       onSubmit(data);
//       if (onNext) onNext();
//     } catch (error: any) {
//       console.error('Verification error:', error);
//       setVerificationError(error.message || 'An unexpected error occurred.');
//     } finally {
//       setIsVerifying(false);
//     }
//   };

//   const handleFormSubmit = (data: FormData) => {
//     if (!isVerified) {
//       handleVerify(data);
//     } else if (onNext) {
//       onNext();
//     }
//   };

//   if (isVerified) return null;

//   return (
//     <div className="relative bg-[#F5F6F5] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
//       {onClose && (
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
//           aria-label="Close verification form"
//         >
//           <X size={20} />
//         </button>
//       )}

//       <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
//         <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">User Verification</h3>

//         {/* Full Name */}
//         <div>
//           <label className="block text-sm font-medium text-[#1B5E20]">Full Name</label>
//           <input
//             type="text"
//             {...register('fullName', {
//               required: 'Full name is required',
//               pattern: {
//                 value: /^[a-zA-Z ]+$/,
//                 message: 'Name should contain only letters and spaces',
//               },
//             })}
//             className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           />
//           {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
//         </div>

//         {/* Phone */}
//         <div>
//           <label className="block text-sm font-medium text-[#1B5E20]">Phone Number</label>
//           <input
//             type="tel"
//             {...register('phone', {
//               required: 'Phone number is required',
//               pattern: {
//                 value: /^[0-9]{10}$/,
//                 message: 'Phone number must be 10 digits',
//               },
//             })}
//             className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           />
//           {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
//         </div>

//         {/* Aadhar Number */}
//         <div>
//           <label className="block text-sm font-medium text-[#1B5E20]">Aadhar Number</label>
//           <input
//             type="text"
//             {...register('aadharNumber', {
//               required: 'Aadhar number is required',
//               pattern: {
//                 value: /^[0-9]{12}$/,
//                 message: 'Aadhar number must be 12 digits',
//               },
//             })}
//             className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           />
//           {errors.aadharNumber && <p className="text-red-600 text-sm">{errors.aadharNumber.message}</p>}
//         </div>

//         {/* Gender */}
//         <div>
//           <label className="block text-sm font-medium text-[#1B5E20]">Gender</label>
//           <select
//             {...register('gender', { required: 'Gender is required' })}
//             className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           >
//             <option value="">Select</option>
//             <option value="Male">Male</option>
//             <option value="Female">Female</option>
//             <option value="Other">Other</option>
//           </select>
//           {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
//         </div>

//         {/* DOB */}
//         <div>
//           <label className="block text-sm font-medium text-[#1B5E20]">Date of Birth</label>
//           <input
//             type="date"
//             {...register('dob', { required: 'Date of birth is required' })}
//             className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
//           />
//           {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
//         </div>

//                     {/* Emergency Contacts */}
//                     <div className="space-y-4">
//   <h3 className="text-lg font-semibold">Emergency Contacts</h3>
//   {(['priority1', 'priority2', 'priority3'] as const).map((priority) => (
//     <div key={priority} className="space-y-2">
//       <Label htmlFor={`${priority}-name`}>
//         {`Emergency Contact ${priority.slice(-1)}`}
//       </Label>
//       <div className="grid grid-cols-2 gap-3">
//         <Input
//           id={`${priority}-name`}
//           placeholder="Name"
//           value={formData.emergencyContacts[priority].name}
//           onChange={(e) => 
//             handleEmergencyContactChange(priority, 'name', e.target.value)
//           }
//           required
//           className="w-full"
//         />
//         <Input
//           id={`${priority}-number`}
//           placeholder="Phone Number"
//           type="tel"
//           value={formData.emergencyContacts[priority].number}
//           onChange={(e) => 
//             handleEmergencyContactChange(priority, 'number', e.target.value)
//           }
//           required
//           pattern="[0-9]{10}"
//           title="10 digit phone number required"
//           className="w-full"
//         />
//       </div>
//     </div>
//   ))}
// </div>

//         {/* Submit Button */}
//         <button
//           type="submit"
//           disabled={isVerifying}
//           className="w-full py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors"
//         >
//           {isVerifying ? 'Verifying...' : 'Verify'}
//         </button>

//         {/* Error Message */}
//         {verificationError && (
//           <p className="text-red-600 text-center text-sm mt-2">{verificationError}</p>
//         )}
//       </form>
//     </div>
//   );
// };



























// import React, { useState } from 'react';
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { format } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Calendar } from "@/components/ui/calendar";
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { useAuth } from "@clerk/clerk-react";
// import { toast } from "sonner";

// interface UserVerificationProps {
//     onNext: (data: any) => void;
//     onBack: () => void;
// }

// export const UserVerification: React.FC<UserVerificationProps> = ({ onNext, onBack }) => {
//     const { userId, getToken } = useAuth();
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formData, setFormData] = useState({
//         fullName: "",
//         phone: "",
//         aadharNumber: "",
//         gender: "",
//         dob: new Date(),
//         emergencyContacts: {
//             priority1: { name: "", number: "" },
//             priority2: { name: "", number: "" },
//             priority3: { name: "", number: "" }
//         }
//     });

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData(prev => ({ ...prev, [name]: value }));
//     };

//     const handleEmergencyContactChange = (priority: string, field: string, value: string) => {
//         setFormData(prev => ({
//             ...prev,
//             emergencyContacts: {
//                 ...prev.emergencyContacts,
//                 [priority]: {
//                     ...prev.emergencyContacts[priority as keyof typeof prev.emergencyContacts],
//                     [field]: value
//                 }
//             }
//         }));
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         setIsSubmitting(true);

//     try {
//       const token = await getToken();
//       const response = await fetch('http://localhost:5000/api/verification/verify-user', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           userId,
//                     ...formData,
//                     dob: format(formData.dob, 'yyyy-MM-dd')
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Verification failed');
//       }

//             const data = await response.json();
//             if (data.success) {
//                 toast.success('User verification completed successfully');
//                 onNext(formData);
//             } else {
//                 throw new Error(data.message || 'Verification failed');
//             }
//     } catch (error: any) {
//       console.error('Verification error:', error);
//             toast.error(error.message || 'An error occurred during verification');
//     } finally {
//             setIsSubmitting(false);
//         }
//     };

//   return (
//         <Card className="w-full">
//             <CardHeader>
//                 <CardTitle className="text-2xl font-bold text-[#1B5E20]">User Verification</CardTitle>
//             </CardHeader>
//             <CardContent>
//                 <form onSubmit={handleSubmit} className="space-y-4">
//                     {/* Personal Information */}
//                     <div className="space-y-4">
//         <div>
//                             <Label htmlFor="fullName">Full Name</Label>
//                             <Input
//                                 id="fullName"
//                                 name="fullName"
//                                 value={formData.fullName}
//                                 onChange={handleChange}
//                                 required
//                                 pattern="^[a-zA-Z ]+$"
//                                 title="Name should contain only letters and spaces"
//                             />
//         </div>

//         <div>
//                             <Label htmlFor="phone">Phone Number</Label>
//                             <Input
//                                 id="phone"
//                                 name="phone"
//             type="tel"
//                                 value={formData.phone}
//                                 onChange={handleChange}
//                                 required
//                                 pattern="^[0-9]{10}$"
//                                 title="Phone number must be 10 digits"
//                             />
//         </div>

//         <div>
//                             <Label htmlFor="aadharNumber">Aadhar Number</Label>
//                             <Input
//                                 id="aadharNumber"
//                                 name="aadharNumber"
//                                 value={formData.aadharNumber}
//                                 onChange={handleChange}
//                                 required
//                                 pattern="^[0-9]{12}$"
//                                 title="Aadhar number must be 12 digits"
//                             />
//         </div>

//         <div>
//                             <Label htmlFor="gender">Gender</Label>
//                             <Select
//                                 value={formData.gender}
//                                 onValueChange={(value) => setFormData(prev => ({ ...prev, gender: value }))}
//                             >
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select gender" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="Male">Male</SelectItem>
//                                     <SelectItem value="Female">Female</SelectItem>
//                                     <SelectItem value="Other">Other</SelectItem>
//                                 </SelectContent>
//                             </Select>
//         </div>

//         <div>
//                             <Label>Date of Birth</Label>
//                             <Popover>
//                                 <PopoverTrigger asChild>
//                                     <Button
//                                         variant={"outline"}
//                                         className={cn(
//                                             "w-full justify-start text-left font-normal",
//                                             !formData.dob && "text-muted-foreground"
//                                         )}
//                                     >
//                                         <CalendarIcon className="mr-2 h-4 w-4" />
//                                         {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
//                                     </Button>
//                                 </PopoverTrigger>
//                                 <PopoverContent className="w-auto p-0">
//                                     <Calendar
//                                         mode="single"
//                                         selected={formData.dob}
//                                         onSelect={(date) => date && setFormData(prev => ({ ...prev, dob: date }))}
//                                         initialFocus
//                                     />
//                                 </PopoverContent>
//                             </Popover>
//                         </div>
//         </div>

//                     {/* Emergency Contacts */}
//                     <div className="space-y-4">
//                         <h3 className="text-lg font-semibold">Emergency Contacts</h3>
//                         {['priority1', 'priority2', 'priority3'].map((priority) => (
//                             <div key={priority} className="space-y-2">
//                                 <Label>{`Emergency Contact ${priority.slice(-1)}`}</Label>
//                                 <div className="grid grid-cols-2 gap-2">
//                                     <Input
//                                         placeholder="Name"
//                                         value={formData.emergencyContacts[priority as keyof typeof formData.emergencyContacts].name}
//                                         onChange={(e) => handleEmergencyContactChange(priority, 'name', e.target.value)}
//                                         required
//                                     />
//                                     <Input
//                                         placeholder="Phone Number"
//                                         type="tel"
//                                         value={formData.emergencyContacts[priority as keyof typeof formData.emergencyContacts].number}
//                                         onChange={(e) => handleEmergencyContactChange(priority, 'number', e.target.value)}
//                                         required
//                                         pattern="^[0-9]{10}$"
//                                         title="Phone number must be 10 digits"
//                                     />
//                                 </div>
//                             </div>
//                         ))}
//                     </div>

//                     <div className="flex justify-between pt-4">
//                         <Button type="button" variant="outline" onClick={onBack}>
//                             Back
//                         </Button>
//                         <Button type="submit" disabled={isSubmitting}>
//                             {isSubmitting ? 'Verifying...' : 'Verify'}
//                         </Button>
//                     </div>
//       </form>
//             </CardContent>
//         </Card>
//     );
// };











import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
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
  emergencyContacts: {
    priority1: { name: string; number: string }; // Changed from number to string
    priority2: { name: string; number: string };
    priority3: { name: string; number: string };
  };
}

export const UserVerification = ({ onSubmit, onClose, onNext }: UserVerificationProps) => {
  const { userId, getToken } = useAuth();
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    phone: '',
    aadharNumber: '',
    gender: '',
    dob: '',
    emergencyContacts: {
      priority1: { name: '', number: '' },
      priority2: { name: '', number: '' },
      priority3: { name: '', number: '' }
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ mode: 'onChange' });

  const [isVerified, setIsVerified] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationError, setVerificationError] = useState('');

  useEffect(() => {
    if (userId) {
      const stored = localStorage.getItem(`isVerified_${userId}`);
      setIsVerified(stored === 'true');
    }
  }, [userId]);

  const handleEmergencyContactChange = (
    priority: 'priority1' | 'priority2' | 'priority3',
    field: 'name' | 'number',
    value: string
  ) => {
    setFormData(prev => ({
      ...prev,
      emergencyContacts: {
        ...prev.emergencyContacts,
        [priority]: {
          ...prev.emergencyContacts[priority],
          [field]: value
        }
      }
    }));
  };

  const handleVerify = async (data: FormData) => {
    setIsVerifying(true);
    setVerificationError('');

    try {
      const token = await getToken();
      const response = await fetch('http://localhost:5000/api/verification/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId,
          ...data,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Verification failed');
      }

      if (userId) {
        localStorage.setItem(`isVerified_${userId}`, 'true');
      }

      setIsVerified(true);
      onSubmit(data);
      if (onNext) onNext();
    } catch (error: any) {
      console.error('Verification error:', error);
      setVerificationError(error.message || 'An unexpected error occurred.');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleFormSubmit = (data: FormData) => {
    if (!isVerified) {
      handleVerify(data);
    } else if (onNext) {
      onNext();
    }
  };

  if (isVerified) return null;

  return (
    <div className="relative bg-[#F5F6F5] rounded-lg shadow-lg p-6 w-full max-w-md mx-auto">
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close verification form"
        >
          <X size={20} />
        </button>
      )}

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        <h3 className="text-2xl font-bold text-[#1B5E20] mb-4">User Verification</h3>

        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-[#1B5E20]">Full Name</label>
          <input
            type="text"
            {...register('fullName', {
              required: 'Full name is required',
              pattern: {
                value: /^[a-zA-Z ]+$/,
                message: 'Name should contain only letters and spaces',
              },
            })}
            className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
          {errors.fullName && <p className="text-red-600 text-sm">{errors.fullName.message}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#1B5E20]">Phone Number</label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            })}
            className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
          {errors.phone && <p className="text-red-600 text-sm">{errors.phone.message}</p>}
        </div>

        {/* Aadhar Number */}
        <div>
          <label className="block text-sm font-medium text-[#1B5E20]">Aadhar Number</label>
          <input
            type="text"
            {...register('aadharNumber', {
              required: 'Aadhar number is required',
              pattern: {
                value: /^[0-9]{12}$/,
                message: 'Aadhar number must be 12 digits',
              },
            })}
            className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
          {errors.aadharNumber && <p className="text-red-600 text-sm">{errors.aadharNumber.message}</p>}
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-[#1B5E20]">Gender</label>
          <select
            {...register('gender', { required: 'Gender is required' })}
            className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          {errors.gender && <p className="text-red-600 text-sm">{errors.gender.message}</p>}
        </div>

        {/* DOB */}
        <div>
          <label className="block text-sm font-medium text-[#1B5E20]">Date of Birth</label>
          <input
            type="date"
            {...register('dob', { required: 'Date of birth is required' })}
            className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
          />
          {errors.dob && <p className="text-red-600 text-sm">{errors.dob.message}</p>}
        </div>

        {/* Emergency Contacts */}

<div className="space-y-4">
  <h3 className="text-lg font-semibold">Emergency Contacts</h3>
  {(['priority1', 'priority2', 'priority3'] as const).map((priority) => (
    <div key={priority} className="space-y-2">
      <label className="block text-sm font-medium text-[#1B5E20]">
        {`Emergency Contact ${priority.slice(-1)}`}
      </label>
      <div className="grid grid-cols-2 gap-3">
        <input
          {...register(`emergencyContacts.${priority}.name`, { required: "Name is required" })}
          placeholder="Name"
          className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
        />
        <input
          {...register(`emergencyContacts.${priority}.number`, {
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          })}
          placeholder="Phone Number"
          type="tel"
          className="w-full p-3 border rounded-lg bg-[#E0E0E0] focus:outline-none focus:ring-2 focus:ring-[#1B5E20]"
        />
      </div>
      {/* Optional: Display errors for each field */}
      <div className="grid grid-cols-2 gap-3 text-sm text-red-600">
        <p>{errors?.emergencyContacts?.[priority]?.name?.message}</p>
        <p>{errors?.emergencyContacts?.[priority]?.number?.message}</p>
      </div>
    </div>
  ))}
</div>


        {/* Submit Button */}
        <button
          type="submit"
          disabled={isVerifying}
          className="w-full py-3 bg-[#1B5E20] text-white rounded-lg hover:bg-[#2E7D32] transition-colors"
        >
          {isVerifying ? 'Verifying...' : 'Verify'}
        </button>

        {/* Error Message */}
        {verificationError && (
          <p className="text-red-600 text-center text-sm mt-2">{verificationError}</p>
        )}
      </form>
    </div>
  );
};



