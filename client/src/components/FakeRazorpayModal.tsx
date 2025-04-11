import { useState } from "react";

interface FakeRazorpayModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export default function FakeRazorpayModal({
    isOpen,
    onClose,
    onSuccess,
}: FakeRazorpayModalProps) {
    const [isPaying, setIsPaying] = useState(false);
    const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
    const [expiry, setExpiry] = useState("12/25");
    const [cvv, setCvv] = useState("123");

    const handlePayment = () => {
        setIsPaying(true);
        setTimeout(() => {
            setIsPaying(false);
            onSuccess();
            onClose();
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
            <div className="w-[90%] max-w-md rounded-xl bg-white p-6 shadow-2xl">
                <div className="mb-5 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-800">Payment Gateway</h2>
                    <button
                        onClick={onClose}
                        className="text-xl text-gray-400 hover:text-gray-600"
                    >
                        &times;
                    </button>
                </div>

                <div className="space-y-5">
                    <div className="rounded-lg bg-gray-800 p-4 text-white">
                        <p className="font-medium">HitchRide Premium</p>
                        <p className="text-2xl font-bold">
                            ₹199 <span className="text-sm font-normal text-gray-300">/month</span>
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-1 block text-sm font-medium text-gray-700">
                                Card Number
                            </label>
                            <input
                                type="text"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                placeholder="1234 1234 1234 1234"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    Expiry Date
                                </label>
                                <input
                                    type="text"
                                    value={expiry}
                                    onChange={(e) => setExpiry(e.target.value)}
                                    className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="MM/YY"
                                />
                            </div>
                            <div>
                                <label className="mb-1 block text-sm font-medium text-gray-700">
                                    CVV
                                </label>
                                <input
                                    type="text"
                                    value={cvv}
                                    onChange={(e) => {
                                        const input = e.target.value;
                                        // Allow only digits and max 3 characters
                                        if (/^\d{0,3}$/.test(input)) {
                                            setCvv(input);
                                        }
                                    }}
                                    className="text-black w-full rounded-md border border-gray-300 px-4 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                                    placeholder="123"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <button
                            onClick={handlePayment}
                            disabled={isPaying}
                            className={`w-full rounded-lg py-3 text-center font-medium text-white transition ${isPaying
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700"
                                }`}
                        >
                            {isPaying ? (
                                <span className="flex items-center justify-center">
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
                                </span>
                            ) : (
                                "Pay ₹199"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
