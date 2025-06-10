
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Copy, Wallet, User2, Banknote } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import OpayWarningModal from "@/components/OpayWarningModal";

const FundWallet: React.FC = () => {
  const navigate = useNavigate();
  const [showOpayWarning, setShowOpayWarning] = useState(false);

  const accountDetails = {
    bankName: "Stella MFB",
    accountNumber: "1100892582",
    accountName: "NOBLE EARN (AGENT)",
    amount: "₦6,200"
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleFundOption = (option: string) => {
    if (option === "Bank Transfer") {
      navigate("/fund-wallet/bank-transfer");
    } else if (option === "Flutterwave") {
      // Show Opay warning before navigating to Flutterwave
      setShowOpayWarning(true);
    }
  };

  const handleOpayWarningClose = () => {
    setShowOpayWarning(false);
    navigate("/fund-wallet/flutterwave");
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

  return (
    <div className="min-h-screen bg-white">
      <OpayWarningModal 
        isOpen={showOpayWarning} 
        onClose={handleOpayWarningClose} 
      />

      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-green-800" />
        </button>
        <h1 className="text-lg font-bold text-green-800">Fund Wallet</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
        {/* Account Details Section */}
        <div className="mb-6">
          <h2 className="text-lg font-bold mb-4">Validation Account Details</h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">
            <p className="text-red-700 text-sm text-center">
              Do not use Opay bank for payments
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
        </div>

        {/* Fund options */}
        <div className="space-y-3">
          <div 
            className="border rounded-lg p-4 flex justify-between items-center cursor-pointer shadow-sm"
            onClick={() => handleFundOption("Bank Transfer")}
          >
            <h2 className="font-bold text-base text-green-800">Fund with Bank Transfer</h2>
            <ChevronRight className="text-gray-400" size={18} />
          </div>

          <div 
            className="border rounded-lg p-4 flex justify-between items-center cursor-pointer shadow-sm"
            onClick={() => handleFundOption("Flutterwave")}
          >
            <h2 className="font-bold text-base text-green-800">Fund with Flutterwave</h2>
            <ChevronRight className="text-gray-400" size={18} />
          </div>
        </div>

        {/* Security message */}
        <div className="mt-8 text-center">
          <p className="text-gray-500 text-xs">All payment methods are highly secured</p>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
