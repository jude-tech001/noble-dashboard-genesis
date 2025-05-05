
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Receipt } from "lucide-react";
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
  const formattedDate = `${currentDate.toLocaleDateString('en-US', { weekday: 'short' })}, May 2 2025 ${currentDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`;
  
  // Generate a transaction reference
  const transactionRef = "RS_" + Math.random().toString(36).substring(2, 15).toUpperCase();

  useEffect(() => {
    // Get withdrawal details from sessionStorage
    const details = sessionStorage.getItem('withdrawalDetails');
    if (details) {
      setWithdrawalDetails(JSON.parse(details));
      // Clear the sessionStorage after retrieving the data
      sessionStorage.removeItem('withdrawalDetails');
    }
  }, []);
  
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-green-800 text-white p-4 flex items-center">
        <button onClick={() => navigate("/dashboard")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-medium">Withdrawal Receipt</h1>
      </div>
      
      <div className="p-6">
        {/* Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-purple-500 flex items-center justify-center">
            <Receipt size={36} className="text-white" />
          </div>
        </div>
        
        {/* Amount */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800">
            ₦{withdrawalDetails ? withdrawalDetails.amount.toLocaleString() : "0.00"}
          </h2>
          <p className="text-green-500 font-medium">Successful Withdrawal</p>
        </div>
        
        {/* Transaction Details */}
        <div className="mt-8 space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Recipient</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="font-medium text-green-800">Account Number</p>
              <p className="font-medium">{withdrawalDetails ? withdrawalDetails.accountNumber : ''}</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Bank Name</p>
            </div>
            <div className="flex justify-between mt-1">
              <p className="font-medium text-green-800">{withdrawalDetails ? withdrawalDetails.bank : ''}</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <p className="text-gray-500">Transaction Reference</p>
            </div>
            <div className="mt-1">
              <p className="font-medium text-green-800">{transactionRef}</p>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Withdrawal Amount</p>
                <p className="font-medium text-green-800">₦{withdrawalDetails ? withdrawalDetails.amount.toLocaleString() : "0.00"}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Fee</p>
                <p className="font-medium text-green-500">₦0.00</p>
              </div>
            </div>
          </div>
          
          <div className="border-b border-gray-200 pb-4">
            <div className="flex justify-between">
              <div>
                <p className="text-gray-500">Transaction Type</p>
                <p className="font-medium text-green-800">Bank Withdrawal</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500">Date / Time</p>
                <p className="font-medium">{formattedDate}</p>
              </div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between">
              <p className="text-gray-500">Account Name</p>
            </div>
            <div className="mt-1">
              <p className="font-medium">{withdrawalDetails ? withdrawalDetails.accountName : ''}</p>
            </div>
          </div>
        </div>

        {/* Return to Dashboard Button */}
        <div className="mt-8">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-full bg-green-800 text-white py-3 rounded-lg font-medium"
          >
            Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentReceipt;
