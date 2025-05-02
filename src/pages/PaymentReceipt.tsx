
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PaymentReceipt: React.FC = () => {
  const navigate = useNavigate();
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString('en-US', { weekday: 'short' })}, May 2 2025 ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-800 text-white p-4 flex items-center">
        <button onClick={() => navigate("/dashboard")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Payment Receipt</h1>
      </div>
      
      <div className="p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center">
            <span className="text-3xl">🐷</span>
          </div>
        </div>
        
        {/* Amount */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800">₦15,000</h2>
          <p className="text-green-500 font-medium">Successful Transaction</p>
        </div>
        
        {/* Transaction Details */}
        <div className="mt-8 space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Recipient</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="font-medium text-green-800">Account Number</p>
              <p className="font-medium">9168474213</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Biller Type</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="font-medium text-green-800">Transfer to Bank</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Transaction Reference</p>
            </div>
            <div className="mt-1">
              <p className="font-medium text-green-800">RS_F6A1A971C57937634D6B618CF6DF29B5</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="font-medium text-green-800">₦15,000</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Fee</p>
                <p className="font-medium text-green-500">₦6,200</p>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Account Type</p>
                <p className="font-medium text-green-800">Wallet</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Date / Time</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <p className="text-gray-500">Season ID</p>
            </div>
            <div className="mt-1">
              <p className="font-medium">dce0db67b1f14bb0de6088eeb78b414-X</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
