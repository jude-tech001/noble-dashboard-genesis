
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-200">
        <h1 className="text-xl font-bold">Bank Transfer</h1>
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
        
        <p className="text-center text-lg font-medium my-6">
          Proceed to your bank app to complete this Transfer
        </p>
        
        <div className="bg-white rounded-lg shadow-sm mt-4 p-4">
          {/* Bank Name */}
          <div className="border-b border-gray-100 py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded flex items-center justify-center mr-3">
                <span className="text-green-600">🏦</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bank Name</p>
                <p className="font-bold text-green-800">NOVA BANK</p>
              </div>
            </div>
          </div>
          
          {/* Account Number */}
          <div className="border-b border-gray-100 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 rounded flex items-center justify-center mr-3">
                  <span className="text-gray-600 text-sm">123</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Account Number</p>
                  <p className="font-bold">1703005963</p>
                </div>
              </div>
              <button 
                onClick={() => handleCopy("1703005963", "Account Number")}
                className="bg-green-700 text-white rounded-full px-3 py-1 text-xs flex items-center"
              >
                <Copy size={12} className="mr-1" /> Copy
              </button>
            </div>
          </div>
          
          {/* Account Name */}
          <div className="border-b border-gray-100 py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                <span className="text-gray-600">👤</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Account Name</p>
                <p className="font-bold text-green-800">Jude Samuel</p>
              </div>
            </div>
          </div>
          
          {/* Amount */}
          <div className="py-3">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center mr-3">
                <span className="text-blue-600">💰</span>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Amount</p>
                <p className="font-bold text-green-800">₦6,500</p>
              </div>
            </div>
          </div>
          
          {/* Timer */}
          <p className="text-green-800 text-center text-sm mt-2">
            This one-time account expires in {formatTime(timeLeft)}
          </p>
        </div>
        
        <button 
          onClick={handlePaymentConfirm} 
          className="w-full bg-green-800 text-white text-center py-3 rounded-lg mt-6 font-bold"
        >
          I Have Made Payment
        </button>
      </div>
    </div>
  );
};

export default BankTransferPayment;
