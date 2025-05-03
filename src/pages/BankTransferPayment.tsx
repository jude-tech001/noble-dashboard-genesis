
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Wallet, User2, Bank } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(1800); // 30 mins in seconds
  
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
    }, 4000);
    
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
    toast.success("Payment confirmation sent! Your activation code will be sent shortly.");
    setTimeout(() => {
      navigate("/dashboard");
    }, 2000);
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
            <h2 className="text-xl font-medium text-gray-800 mb-2">Fund Wallet via Bank Transfer</h2>
            <p className="text-gray-500 text-sm mb-6">
              Transfer To This Account Below Within 30mins And Get Activation Code Once Your Payment Got Confirmed
            </p>

            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <div className="p-4 flex justify-between items-center">
                <div className="flex-1">
                  <div className="flex items-center">
                    <div className="bg-gray-100 p-2 rounded-md mr-4">
                      <Bank size={24} className="text-green-800" />
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
                    <p className="font-bold text-gray-800">{accountDetails.accountName.toLowerCase()}</p>
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
              
              <div className="bg-yellow-50 p-4">
                <p className="text-xl font-medium mb-2">Hi, {user?.firstName || "User"}</p>
                <p className="text-gray-600">
                  Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
                </p>
              </div>
              
              <div className="p-4 text-center text-green-800">
                <p>this one-time account expires in {formatTime(timeLeft)}</p>
              </div>
            </div>

            <button
              onClick={handlePaymentConfirmation}
              className="w-full bg-green-800 text-white py-4 rounded-lg mt-6 font-medium"
            >
              I Have Made Payment
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BankTransferPayment;
