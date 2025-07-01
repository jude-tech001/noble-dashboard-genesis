
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";

const FundWallet: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFundOption = (option: string) => {
    if (option === "Bank Transfer") {
      navigate("/fund-wallet/bank-transfer");
    } else if (option === "Flutterwave") {
      navigate("/fund-wallet/flutterwave");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-green-800" />
        </button>
        <h1 className="text-lg font-bold text-green-800">Fund Wallet</h1>
      </div>

      <div className="p-4 max-w-md mx-auto">
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
