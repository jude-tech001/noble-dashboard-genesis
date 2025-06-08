
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Receipt, Check } from "lucide-react";
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
  
  // Generate a transaction reference
  const transactionRef = "RS_" + Math.random().toString(36).substring(2, 15).toUpperCase();

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
          <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center">
            <Check size={36} className="text-white" />
          </div>
        </div>
        
        {/* Amount */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-green-800">
            ₦{withdrawalDetails.amount.toLocaleString()}
          </h2>
          <p className="text-green-500 font-medium">Successful Withdrawal</p>
        </div>
        
        {/* Transaction Details Card */}
        <Card className="mt-6 border-green-100 shadow-md">
          <CardContent className="p-4">
            <h3 className="text-lg font-medium text-green-800 mb-4">Transaction Details</h3>
            
            <div className="space-y-4">
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Amount</p>
                <p className="font-semibold text-green-800">₦{withdrawalDetails.amount.toLocaleString()}</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Account Number</p>
                <p className="font-semibold">{withdrawalDetails.accountNumber}</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Account Name</p>
                <p className="font-semibold">{withdrawalDetails.accountName}</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Bank Name</p>
                <p className="font-semibold">{withdrawalDetails.bank}</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Transaction Reference</p>
                <p className="font-semibold text-green-800">{transactionRef}</p>
              </div>
              
              <div className="border-b border-gray-100 pb-3">
                <p className="text-sm text-gray-500">Transaction Type</p>
                <p className="font-semibold">Bank Withdrawal</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Date / Time</p>
                <p className="font-semibold">{formattedDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>

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
