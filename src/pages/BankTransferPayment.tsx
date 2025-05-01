
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds
  const [paymentStatus, setPaymentStatus] = useState<"none" | "processing" | "failed">("none");
  
  // Format time to mins:secs
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `-${mins} mins ${secs} secs`;
  };
  
  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };
  
  const handlePaymentConfirm = () => {
    setPaymentStatus("processing");
    
    // Simulate processing and then failure after 4 seconds
    setTimeout(() => {
      setPaymentStatus("failed");
    }, 4000);
  };

  // Processing payment modal
  if (paymentStatus === "processing") {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-[85%] max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">Payment Processing</h2>
            <div className="flex justify-center my-8">
              <div className="w-16 h-1 bg-green-600 animate-pulse rounded-full"></div>
            </div>
            <p className="text-center text-lg mb-6">Checking For Payment</p>
          </div>
        </div>
        
        {/* Background content */}
        <div className="bg-gray-200 p-4 flex items-center">
          <ArrowLeft size={24} onClick={handleBack} className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
      </div>
    );
  }
  
  // Failed payment modal
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-100 relative">
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-3xl">🐷</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center">Payment Not Received</h2>
            <h2 className="text-2xl font-bold text-center mb-4">Please Try Again</h2>
            <p className="text-center text-lg mb-6">Invalid Payment Please Try Again</p>
            
            <button
              onClick={() => setPaymentStatus("none")}
              className="w-full bg-white border border-green-700 text-green-700 py-3 rounded-md font-bold text-lg"
            >
              TRY AGAIN
            </button>
          </div>
        </div>
        
        {/* Background content */}
        <div className="bg-gray-200 p-4 flex items-center">
          <ArrowLeft size={24} onClick={handleBack} className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center">
          <ArrowLeft size={24} onClick={handleBack} className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
        <button 
          onClick={handleBack} 
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center my-6">
          <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center">
            <span className="text-white">🔄</span>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">NGN 6,500</h2>
            <p className="text-sm text-gray-500">chukwuemekajames562@gmail.com</p>
          </div>
        </div>
        
        <p className="text-center text-lg font-medium my-8">
          Proceed to your bank app to complete this Transfer
        </p>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          {/* Amount */}
          <div className="mb-5">
            <p className="text-gray-600 mb-1">Amount</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">NGN 6500</p>
              <button 
                onClick={() => handleCopy("6500", "Amount")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Account Number */}
          <div className="mb-5">
            <p className="text-gray-600 mb-1">Account Number</p>
            <div className="flex justify-between items-center">
              <p className="text-xl font-bold">1703005963</p>
              <button 
                onClick={() => handleCopy("1703005963", "Account Number")}
                className="bg-yellow-500 text-white px-4 py-2 rounded-md"
              >
                Copy
              </button>
            </div>
          </div>
          
          {/* Bank Name */}
          <div className="mb-5">
            <p className="text-gray-600 mb-1">Bank Name</p>
            <p className="text-xl font-bold">NOVA BANK</p>
          </div>
          
          {/* Account Name */}
          <div className="mb-2">
            <p className="text-gray-600 mb-1">Account Name</p>
            <p className="text-xl font-bold">JUDE SAMUEL</p>
          </div>
        </div>
        
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <p className="text-center mb-4">
            Pay to this specific account and get your account code
          </p>
          
          <button 
            onClick={handlePaymentConfirm} 
            className="w-full bg-yellow-500 text-black text-center py-4 rounded-md font-bold"
          >
            I have made this bank Transfer
          </button>
        </div>
        
        <p className="text-green-800 text-center text-sm mt-4">
          this one-time account expires in {formatTime(timeLeft)}
        </p>
      </div>
    </div>
  );
};

export default BankTransferPayment;
