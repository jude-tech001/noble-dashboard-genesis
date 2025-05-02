
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds
  const [paymentStatus, setPaymentStatus] = useState<"none" | "processing" | "failed">("none");
  
  // Format time to mins:secs
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} secs`;
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
      <div className="min-h-screen bg-gray-50 relative">
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
        <div className="bg-gray-100 p-4 flex items-center">
          <ArrowLeft size={24} onClick={handleBack} className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
      </div>
    );
  }
  
  // Failed payment modal
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-gray-50 relative">
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
        <div className="bg-gray-100 p-4 flex items-center">
          <ArrowLeft size={24} onClick={handleBack} className="mr-2 cursor-pointer" />
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
      </div>
    );
  }
  
  // Main page with account details
  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 p-4 flex items-center">
        <button onClick={handleBack} className="mr-2">
          <ArrowLeft size={24} className="text-black" />
        </button>
        <h1 className="text-xl font-bold">Bank Transfer</h1>
      </div>
      
      <div className="p-4">
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Fund Wallet via Bank Transfer</h2>
          <p className="text-gray-500 text-sm">
            Transfer To This Account Below Within 30mins And Get Activation Code Once Your Payment Got Confirmed
          </p>
        </div>
        
        <div className="mt-6 bg-gray-50 rounded-lg p-4">
          <div className="flex items-start mb-4 justify-between">
            <div className="flex items-start">
              <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded mr-3">
                <span className="text-green-600 text-xl">🏦</span>
              </div>
              <div>
                <p className="text-gray-500">Bank Name</p>
                <p className="text-green-800 font-bold text-xl">NOVA BANK</p>
              </div>
            </div>
            <div className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm">
              Active
            </div>
          </div>
          
          <div className="flex items-center mb-4 border-t border-gray-200 pt-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 mr-3">
              123
            </div>
            <div className="flex-grow">
              <p className="text-gray-500">Account Number</p>
              <p className="text-xl font-bold">1703005963</p>
            </div>
            <button 
              onClick={() => handleCopy("1703005963", "Account Number")}
              className="bg-green-700 text-white rounded-full px-4 py-2 flex items-center"
            >
              <Copy size={16} className="mr-1" /> Copy
            </button>
          </div>
          
          <div className="flex items-center mb-4 border-t border-gray-200 pt-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 mr-3">
              👤
            </div>
            <div>
              <p className="text-gray-500">Account Name</p>
              <p className="text-green-800 font-bold text-xl">Jude Samuel</p>
            </div>
          </div>
          
          <div className="flex items-center mb-4 border-t border-gray-200 pt-4">
            <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-gray-400 mr-3">
              💰
            </div>
            <div>
              <p className="text-gray-500">Amount</p>
              <p className="text-green-800 font-bold text-xl">₦6,200</p>
            </div>
          </div>
          
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 my-6">
            <h3 className="font-medium mb-1">Hi, {user?.firstName || "User"}</h3>
            <p className="text-sm text-gray-600">
              Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
            </p>
          </div>
          
          <p className="text-center text-green-800 text-sm mb-6">
            this one-time account expires in {formatTime(timeLeft)}
          </p>
          
          <button 
            onClick={handlePaymentConfirm} 
            className="w-full bg-green-700 text-white text-center py-4 rounded-md font-bold"
          >
            I Have Made Payment
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankTransferPayment;
