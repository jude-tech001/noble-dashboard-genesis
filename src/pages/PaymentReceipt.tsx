
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface WithdrawalDetails {
  amount: number;
  accountNumber: string;
  accountName: string;
  bank: string;
}

const PaymentReceipt: React.FC = () => {
  const navigate = useNavigate();
  const [withdrawalDetails, setWithdrawalDetails] = useState<WithdrawalDetails | null>(null);
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString('en-US', { weekday: 'short' })}, ${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  
  // Generate a transaction reference with green color
  const transactionRef = "RS_" + Math.random().toString(36).substring(2, 15).toUpperCase();
  // Generate season ID
  const seasonId = "dce0db67b1f14bb0de6088eeb78b414-X";

  useEffect(() => {
    // Get withdrawal details from sessionStorage
    const details = sessionStorage.getItem('withdrawalDetails');
    if (details) {
      setWithdrawalDetails(JSON.parse(details));
      // Clear the sessionStorage after retrieving the data
      sessionStorage.removeItem('withdrawalDetails');
    } else {
      // If no withdrawal details found, redirect back to dashboard
      navigate("/dashboard");
    }
  }, [navigate]);

  if (!withdrawalDetails) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-medium text-gray-600">Loading receipt...</h1>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate("/dashboard")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Payment Receipt</h1>
      </div>
      
      <div className="p-6 max-w-md mx-auto">
        {/* Icon and Status */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 rounded-full bg-blue-600 flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-lg">💰</span>
            </div>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800">
            ₦{withdrawalDetails.amount.toLocaleString()}
          </h2>
          <p className="text-green-500 font-medium">Successful Transaction</p>
        </div>
        
        {/* Receipt Details */}
        <div className="space-y-6">
          <div>
            <p className="text-gray-500 text-sm">Recipient</p>
            <p className="text-gray-800 font-medium">Account Number</p>
            <p className="text-gray-800 font-semibold text-right">{withdrawalDetails.accountNumber}</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Biller Type</p>
            <p className="text-gray-800 font-medium">Transfer to Bank</p>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Transaction Reference</p>
            <p className="text-green-700 font-semibold text-sm">{transactionRef}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Amount</p>
              <p className="text-green-700 font-bold">₦{withdrawalDetails.amount.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Fee</p>
              <p className="text-green-700 font-bold">₦0</p>
            </div>
          </div>
          
          <div className="flex justify-between">
            <div>
              <p className="text-gray-500 text-sm">Account Type</p>
              <p className="text-green-700 font-medium">Wallet</p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Date / Time</p>
              <p className="text-gray-800 font-medium text-xs">{formattedDate}</p>
            </div>
          </div>
          
          <div>
            <p className="text-gray-500 text-sm">Season ID</p>
            <p className="text-gray-800 font-semibold text-sm">{seasonId}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
