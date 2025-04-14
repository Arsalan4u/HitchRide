// import { useState } from "react";

// interface FakeRazorpayModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     onSuccess: () => void;
// }

// export default function FakeRazorpayModal({
//     isOpen,
//     onClose,
//     onSuccess,
// }: FakeRazorpayModalProps) {
//     const [isPaying, setIsPaying] = useState(false);
//     const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
//     const [expiry, setExpiry] = useState("12/25");
//     const [cvv, setCvv] = useState("123");

//     const handlePayment = () => {
//         setIsPaying(true);
//         setTimeout(() => {
//             setIsPaying(false);
//             onSuccess();
//             onClose();
//         }, 2000);
//     };

//     if (!isOpen) return null;

//     return (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
//             <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">
//                 <div className="mb-5 flex items-center justify-between">
//                     <h2 className="text-lg font-semibold text-gray-800">Payment Gateway</h2>
//                     <button
//                         onClick={onClose}
//                         className="text-xl text-gray-400 hover:text-gray-600"
//                     >
//                         &times;
//                     </button>
//                 </div>

//                 <div className="space-y-5">
//                     <div className="rounded-lg bg-gray-800 p-4 text-white">
//                         <p className="font-medium">HitchRide Premium</p>
//                         <p className="text-2xl font-bold">
//                             ₹199 <span className="text-sm font-normal text-gray-300">/month</span>
//                         </p>
//                     </div>

//                     <div className="space-y-4">
//                         <div>
//                             <label className="mb-1 block text-sm font-medium text-gray-700">
//                                 Card Number
//                             </label>
//                             <input
//                                 type="text"
//                                 value={cardNumber}
//                                 onChange={(e) => setCardNumber(e.target.value)}
//                                 className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                 placeholder="1234 1234 1234 1234"
//                             />
//                         </div>

//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                                     Expiry Date
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={expiry}
//                                     onChange={(e) => setExpiry(e.target.value)}
//                                     className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     placeholder="MM/YY"
//                                 />
//                             </div>
//                             <div>
//                                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                                     CVV
//                                 </label>
//                                 <input
//                                     type="text"
//                                     value={cvv}
//                                     onChange={(e) => {
//                                         const input = e.target.value;
//                                         // Allow only digits and max 3 characters
//                                         if (/^\d{0,3}$/.test(input)) {
//                                             setCvv(input);
//                                         }
//                                     }}
//                                     className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
//                                     placeholder="123"
//                                 />
//                             </div>
//                         </div>
//                     </div>

//                     <div>
//                         <button
//                             onClick={handlePayment}
//                             disabled={isPaying}
//                             className={`w-full rounded-lg py-3 text-center font-medium text-white transition ${isPaying
//                                     ? "bg-blue-400 cursor-not-allowed"
//                                     : "bg-blue-600 hover:bg-blue-700"
//                                 }`}
//                         >
//                             {isPaying ? (
//                                 <span className="flex items-center justify-center">
//                                     <svg
//                                         className="mr-2 h-4 w-4 animate-spin text-white"
//                                         xmlns="http://www.w3.org/2000/svg"
//                                         fill="none"
//                                         viewBox="0 0 24 24"
//                                     >
//                                         <circle
//                                             className="opacity-25"
//                                             cx="12"
//                                             cy="12"
//                                             r="10"
//                                             stroke="currentColor"
//                                             strokeWidth="4"
//                                         ></circle>
//                                         <path
//                                             className="opacity-75"
//                                             fill="currentColor"
//                                             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                                         ></path>
//                                     </svg>
//                                     Processing...
//                                 </span>
//                             ) : (
//                                 "Pay ₹199"
//                             )}
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }


// import { useState, useEffect } from "react";
// import { CheckCircle, X } from "lucide-react";
// import { useToast } from "@/components/ui/use-toast";

// interface FakeRazorpayModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   onSuccess: () => Promise<void>; // Changed to async
//   amount: number;
//   description: string;
//   userId?: string; // Added for better tracking
// }

// export default function FakeRazorpayModal({
//   isOpen,
//   onClose,
//   onSuccess,
//   amount,
//   description,
//   userId
// }: FakeRazorpayModalProps) {
//   const [isPaying, setIsPaying] = useState(false);
//   const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
//   const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
//   const [expiry, setExpiry] = useState("12/25");
//   const [cvv, setCvv] = useState("123");
//   const { toast } = useToast();

//   const amountInRupees = (amount / 100).toFixed(2);

//   const handlePayment = async () => {
//     setIsPaying(true);
//     setPaymentStatus("processing");
    
//     try {
//       // Simulate API call delay
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Simulate 10% chance of payment failure for testing
//       const shouldFail = Math.random() < 0.1;
      
//       if (shouldFail) {
//         throw new Error("Payment declined by bank");
//       }

//       await onSuccess();
//       setPaymentStatus("success");
      
//       toast({
//         title: "Payment Successful",
//         description: `Your payment of ₹${amountInRupees} was processed`,
//         duration: 5000,
//       });

//       // Auto-close after success
//       setTimeout(onClose, 2000);
//     } catch (error) {
//       setPaymentStatus("failed");
//       toast({
//         title: "Payment Failed",
//         description: error instanceof Error ? error.message : "Payment could not be processed",
//         variant: "destructive",
//         duration: 5000,
//       });
//     } finally {
//       setIsPaying(false);
//     }
//   };

//   // Reset state when modal closes
//   useEffect(() => {
//     if (!isOpen) {
//       setPaymentStatus("idle");
//       setIsPaying(false);
//     }
//   }, [isOpen]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
//       <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
//         <div className="mb-5 flex items-center justify-between">
//           <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
//             Payment Gateway
//             {userId && <span className="text-sm text-gray-500"> (User: {userId})</span>}
//           </h2>
//           <button
//             onClick={onClose}
//             className="text-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//             disabled={isPaying}
//           >
//             &times;
//           </button>
//         </div>

//         {paymentStatus === "success" ? (
//           <div className="flex flex-col items-center justify-center space-y-4 p-8">
//             <CheckCircle className="h-16 w-16 text-green-500" />
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Successful!</h3>
//             <p className="text-gray-600 dark:text-gray-400">
//               You're now a premium member. Enjoy your benefits!
//             </p>
//           </div>
//         ) : paymentStatus === "failed" ? (
//           <div className="flex flex-col items-center justify-center space-y-4 p-8">
//             <X className="h-16 w-16 text-red-500" />
//             <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Failed</h3>
//             <button
//               onClick={() => setPaymentStatus("idle")}
//               className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
//             >
//               Try Again
//             </button>
//           </div>
//         ) : (
//           <div className="space-y-5">
//             <div className="rounded-lg bg-gradient-to-r from-blue-800 to-purple-800 p-4 text-white">
//               <p className="font-medium">{description}</p>
//               <p className="text-2xl font-bold">
//                 ₹{amountInRupees} <span className="text-sm font-normal text-blue-200">/month</span>
//               </p>
//             </div>

//             <div className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                   Card Number
//                 </label>
//                 <input
//                   type="text"
//                   value={cardNumber}
//                   onChange={(e) => {
//                     const value = e.target.value.replace(/\s/g, "");
//                     if (/^\d{0,16}$/.test(value)) {
//                       setCardNumber(value.replace(/(\d{4})/g, "$1 ").trim());
//                     }
//                   }}
//                   className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//                   placeholder="1234 1234 1234 1234"
//                   disabled={isPaying}
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     Expiry Date
//                   </label>
//                   <input
//                     type="text"
//                     value={expiry}
//                     onChange={(e) => {
//                       const value = e.target.value.replace(/\D/g, "");
//                       if (value.length <= 4) {
//                         setExpiry(value.replace(/(\d{2})(\d{0,2})/, "$1/$2"));
//                       }
//                     }}
//                     className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//                     placeholder="MM/YY"
//                     disabled={isPaying}
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
//                     CVV
//                   </label>
//                   <input
//                     type="password"
//                     value={cvv}
//                     onChange={(e) => {
//                       const input = e.target.value;
//                       if (/^\d{0,3}$/.test(input)) {
//                         setCvv(input);
//                       }
//                     }}
//                     className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
//                     placeholder="123"
//                     disabled={isPaying}
//                     maxLength={3}
//                   />
//                 </div>
//               </div>
//             </div>

//             <div>
//               <button
//                 onClick={handlePayment}
//                 disabled={isPaying}
//                 className={`flex w-full items-center justify-center rounded-lg py-3 font-medium text-white transition ${
//                   isPaying
//                     ? "bg-blue-400 cursor-not-allowed"
//                     : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {isPaying ? (
//                   <>
//                     <svg
//                       className="mr-2 h-4 w-4 animate-spin text-white"
//                       xmlns="http://www.w3.org/2000/svg"
//                       fill="none"
//                       viewBox="0 0 24 24"
//                     >
//                       <circle
//                         className="opacity-25"
//                         cx="12"
//                         cy="12"
//                         r="10"
//                         stroke="currentColor"
//                         strokeWidth="4"
//                       ></circle>
//                       <path
//                         className="opacity-75"
//                         fill="currentColor"
//                         d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                       ></path>
//                     </svg>
//                     Processing...
//                   </>
//                 ) : (
//                   `Pay ₹${amountInRupees}`
//                 )}
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
















import { useState, useEffect } from "react";
import { CheckCircle, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { usePremium } from "../context/premiumContext";

interface FakeRazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>; // Changed to async
  amount: number;
  description: string;
  userId?: string; // Added for better tracking
}

export default function FakeRazorpayModal({
  isOpen,
  onClose,
  onSuccess,
  amount,
  description,
  userId
}: FakeRazorpayModalProps) {
  const [isPaying, setIsPaying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "failed">("idle");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/25");
  const [cvv, setCvv] = useState("123");
  const { toast } = useToast();
  const { setPremiumStatus } = usePremium();
  const amountInRupees = (amount / 100).toFixed(2);

  const handlePayment = async () => {
    setIsPaying(true);
    setPaymentStatus("processing");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate 10% chance of payment failure for testing
      const shouldFail = Math.random() < 0.1;
      
      if (shouldFail) {
        throw new Error("Payment declined by bank");
      }

      // Update premium status in the context
      setPremiumStatus(true);
      
      // Call the onSuccess callback
      await onSuccess();
      
      setPaymentStatus("success");
      
      toast({
        title: "Payment Successful",
        description: `Your payment of ₹${amountInRupees} was processed`,
        duration: 5000,
      });
      
      // Auto-close after success
      setTimeout(onClose, 2000);
    } catch (error) {
      setPaymentStatus("failed");
      toast({
        title: "Payment Failed",
        description: error instanceof Error ? error.message : "Payment could not be processed",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsPaying(false);
    }
  };

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setPaymentStatus("idle");
      setIsPaying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl dark:bg-gray-900">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
            Payment Gateway
            {userId && <span className="text-sm text-gray-500"> (User: {userId})</span>}
          </h2>
          <button
            onClick={onClose}
            className="text-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            disabled={isPaying}
          >
            &times;
          </button>
        </div>
        {paymentStatus === "success" ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Successful!</h3>
            <p className="text-gray-600 dark:text-gray-400">
              You're now a premium member. Enjoy your benefits!
            </p>
          </div>
        ) : paymentStatus === "failed" ? (
          <div className="flex flex-col items-center justify-center space-y-4 p-8">
            <X className="h-16 w-16 text-red-500" />
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white">Payment Failed</h3>
            <button
              onClick={() => setPaymentStatus("idle")}
              className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            <div className="rounded-lg bg-gradient-to-r from-blue-800 to-purple-800 p-4 text-white">
              <p className="font-medium">{description}</p>
              <p className="text-2xl font-bold">
                ₹{amountInRupees} <span className="text-sm font-normal text-blue-200">/month</span>
              </p>
            </div>
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\s/g, "");
                    if (/^\d{0,16}$/.test(value)) {
                      setCardNumber(value.replace(/(\d{4})/g, "$1 ").trim());
                    }
                  }}
                  className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                  placeholder="1234 1234 1234 1234"
                  disabled={isPaying}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 4) {
                        setExpiry(value.replace(/(\d{2})(\d{0,2})/, "$1/$2"));
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="MM/YY"
                    disabled={isPaying}
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                    CVV
                  </label>
                  <input
                    type="password"
                    value={cvv}
                    onChange={(e) => {
                      const input = e.target.value;
                      if (/^\d{0,3}$/.test(input)) {
                        setCvv(input);
                      }
                    }}
                    className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm text-black shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    placeholder="123"
                    disabled={isPaying}
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
            <div>
              <button
                onClick={handlePayment}
                disabled={isPaying}
                className={`flex w-full items-center justify-center rounded-lg py-3 font-medium text-white transition ${
                  isPaying
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isPaying ? (
                  <>
                    <svg
                      className="mr-2 h-4 w-4 animate-spin text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Pay ₹${amountInRupees}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}




