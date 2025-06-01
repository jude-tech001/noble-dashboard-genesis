
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleActivateNow = () => {
    setIsProcessing(true);
    
    // 6 seconds loading
    setTimeout(() => {
      setIsProcessing(false);
      navigate("/buy-activation-code");
    }, 6000);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-green-800 font-medium">Processing activation...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-green-800" />
        </button>
        <h1 className="text-lg font-bold text-green-800">Account Activation</h1>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Activate Your Account</h2>
          <p className="text-gray-600">Review your details and activate your account</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Account Details</h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">First Name:</span>
              <span className="font-medium">{user?.firstName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Last Name:</span>
              <span className="font-medium">{user?.lastName}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{user?.email}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Account ID:</span>
              <span className="font-medium">{user?.id}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="text-red-500 font-medium">Not Activated</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleActivateNow}
          className="w-full bg-green-800 text-white py-4 rounded-lg font-medium text-lg"
        >
          Activate Now
        </button>
      </div>
    </div>
  );
};

export default ActivateAccount;
