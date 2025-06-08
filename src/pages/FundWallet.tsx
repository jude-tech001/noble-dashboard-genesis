
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import OpayWarningModal from "@/components/OpayWarningModal";

const FundWallet: React.FC = () => {
  const navigate = useNavigate();
  const [showOpayWarning, setShowOpayWarning] = useState(false);

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
        {/* Fund options */}
        <div className="space-y-4 mt-8">
          <div 
            className="border rounded-lg p-6 flex justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleFundOption("Bank Transfer")}
          >
            <h2 className="font-bold text-lg text-green-800">Fund with Bank Transfer</h2>
            <ChevronRight className="text-gray-400" size={20} />
          </div>

          <div 
            className="border rounded-lg p-6 flex justify-between items-center cursor-pointer shadow-sm hover:shadow-md transition-shadow"
            onClick={() => handleFundOption("Flutterwave")}
          >
            <h2 className="font-bold text-lg text-green-800">Fund with Flutterwave</h2>
            <ChevronRight className="text-gray-400" size={20} />
          </div>
        </div>

        {/* Security message */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 text-sm">All payment methods are highly secured</p>
        </div>
      </div>
    </div>
  );
};

export default FundWallet;
