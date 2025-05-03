
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Wallet, User2, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [buttonText, setButtonText] = useState("I Have Made Payment");
  
  const accountDetails = {
    bankName: "NOVA BANK",
    accountNumber: "1703005963",
    accountName: "JUDE SAMUEL",
    amount: "₦6,200"
  };
  
  // Load account details with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (!isLoading && timeLeft > 0) {
      const countdownTimer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(countdownTimer);
    }
  }, [isLoading, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} secs`;
  };

  const handleBack = () => {
    navigate(-1);
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
    // Show processing dialog
    setShowProcessingDialog(true);
    setButtonText("Pending....");
    
    // After 5 seconds, hide processing dialog and show failure dialog
    setTimeout(() => {
      setShowProcessingDialog(false);
      setShowFailureDialog(true);
    }, 5000);
  };

  const handleTryAgain = () => {
    setShowFailureDialog(false);
    setButtonText("I Have Made Payment");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={18} className="text-green-800" />
        </button>
        <h1 className="text-base font-medium text-gray-800">Bank Transfer</h1>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading account details...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Fund Wallet via Bank Transfer</h2>
              <p className="text-gray-500 text-sm mt-1">
                Transfer To This Account Below Within 30mins And Get Activation Code Once Your Payment Got Confirmed
              </p>
            </div>
            
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-md mr-4">
                      <Banknote size={24} className="text-green-800" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Bank Name</p>
                      <p className="font-bold text-green-800">{accountDetails.bankName}</p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center text-blue-600">
                  <span className="bg-green-100 px-3 py-1 rounded-md text-green-600 text-xs">Active</span>
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-8 h-8 flex items-center justify-center">
                    <span className="font-mono">123</span>
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Number</p>
                    <p className="font-bold text-gray-800">{accountDetails.accountNumber}</p>
                  </div>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="bg-green-800 text-white hover:bg-green-700"
                  onClick={() => handleCopyClick(accountDetails.accountNumber, "Account number")}
                >
                  <Copy size={16} className="mr-1" /> Copy
                </Button>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-8 h-8 flex items-center justify-center">
                    <User2 size={18} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Name</p>
                    <p className="font-bold text-gray-800">{accountDetails.accountName}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-8 h-8 flex items-center justify-center">
                    <Wallet size={18} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Amount</p>
                    <p className="font-bold text-green-800">{accountDetails.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700">
                Hi, {user?.firstName || "James"}
              </p>
              <p className="text-gray-700 mt-2">
                Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
              </p>
            </div>
              
            <div className="p-2 text-center text-green-800 text-sm mt-4">
              <p>this one-time account expires in {formatTime(timeLeft)}</p>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              className="w-full bg-green-800 text-white py-3 rounded-lg mt-4 font-medium"
              disabled={showProcessingDialog}
            >
              {buttonText}
            </button>
          </>
        )}
      </div>

      {/* Processing Dialog */}
      <Dialog open={showProcessingDialog} onOpenChange={setShowProcessingDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">Payment Processing</h2>
            <div className="flex items-center justify-center">
              <div className="w-2 h-2 bg-green-800 rounded-full mr-1 animate-pulse"></div>
              <p className="text-gray-500">Checking For Payment</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Payment Failure Dialog */}
      <Dialog open={showFailureDialog} onOpenChange={setShowFailureDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" stroke="#6A37FF" strokeWidth="2" />
                  <path d="M9 12L15 12" stroke="#6A37FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center">Payment Not Received</h2>
              <h2 className="text-xl font-bold text-center">Please Try Again</h2>
            </div>
            <p className="text-center mb-6">Invalid Payment Please Try Again</p>
            <button
              onClick={handleTryAgain}
              className="w-full bg-white text-green-800 py-2 border border-green-800 font-bold rounded-md"
            >
              TRY AGAIN
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankTransferPayment;
