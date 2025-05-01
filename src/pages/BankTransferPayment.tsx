
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy } from "lucide-react";
import { toast } from "sonner";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 mins in seconds
  
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
    toast.success("Payment confirmation sent!");
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft size={24} className="text-black" />
          </button>
          <h1 className="text-xl font-bold">Bank Transfer</h1>
        </div>
      </div>
      
      <div className="p-4 mt-6">
        <h2 className="text-xl font-bold">Fund Wallet via Bank Transfer</h2>
        <p className="text-gray-500 mt-2">
          Transfer To This Account Below Within 30mins And Get Activation Code Once Your Payment Got Confirmed
        </p>
        
        <div className="bg-white rounded-lg mt-4 p-4">
          <div className="flex items-center justify-between">
            <div className="flex-1"></div>
            <div className="bg-green-100 px-3 py-1 rounded">
              <span className="text-green-600">Active</span>
            </div>
          </div>
          
          {/* Bank Name */}
          <div className="border-b border-gray-100 py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded flex items-center justify-center mr-3">
                <span className="text-green-600 text-xl">🏦</span>
              </div>
              <div>
                <p className="text-gray-500">Bank Name</p>
                <p className="font-bold text-green-800 text-lg flex items-center">
                  NOVA BANK 
                  <span className="ml-1 text-blue-500">🏦</span>
                </p>
              </div>
            </div>
          </div>
          
          {/* Account Number */}
          <div className="border-b border-gray-100 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center mr-3">
                  <span className="text-gray-600 text-lg">123</span>
                </div>
                <div>
                  <p className="text-gray-500">Account Number</p>
                  <p className="font-bold text-lg">1703005963</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy("1703005963", "Account Number")}
                className="bg-green-700 text-white rounded-full px-4 py-2 flex items-center"
              >
                <Copy size={16} className="mr-1" /> Copy
              </button>
            </div>
          </div>
          
          {/* Account Name */}
          <div className="border-b border-gray-100 py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600 text-xl">👤</span>
              </div>
              <div>
                <p className="text-gray-500">Account Name</p>
                <p className="font-bold text-green-800 text-lg">jude Samuel</p>
              </div>
            </div>
          </div>
          
          {/* Amount */}
          <div className="border-b border-gray-100 py-4">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded flex items-center justify-center mr-3">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-bold text-green-800 text-lg">₦6,200</p>
              </div>
            </div>
          </div>
          
          {/* Instructions */}
          <div className="bg-yellow-50 p-4 rounded-lg my-4">
            <h3 className="font-bold text-lg">Hi, James</h3>
            <p className="mt-1">
              Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
            </p>
          </div>
          
          <p className="text-green-800 text-center">
            this one-time account expires in {formatTime(timeLeft)}
          </p>
        </div>
        
        <button 
          onClick={handlePaymentConfirm} 
          className="w-full bg-green-800 text-white text-center py-4 rounded-lg mt-6 font-bold"
        >
          I Have Made Payment
        </button>
      </div>
    </div>
  );
};

export default BankTransferPayment;
