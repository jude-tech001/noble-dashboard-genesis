
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const BuyActivationCode: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleBack = () => {
    navigate("/activate-account");
  };

  const handleProceedToPayment = () => {
    navigate("/fund-wallet");
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-green-800" />
        </button>
        <h1 className="text-lg font-bold text-green-800">Buy Activation Code</h1>
      </div>

      <div className="p-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-green-800 mb-2">Account Activation Code</h2>
          <p className="text-gray-600">Purchase activation code to activate your account</p>
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
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Activation Code</h3>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Amount:</span>
            <span className="text-2xl font-bold text-green-800">₦15,000</span>
          </div>
        </div>

        <button
          onClick={handleProceedToPayment}
          className="w-full bg-green-800 text-white py-4 rounded-lg font-medium text-lg"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default BuyActivationCode;
