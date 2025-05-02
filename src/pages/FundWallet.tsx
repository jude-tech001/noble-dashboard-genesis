
import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";

const FundWallet: React.FC = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleFundOption = (option: string) => {
    if (option === "Card") {
      toast.info("Card funding option selected. Feature coming soon.");
    } else if (option === "Bank Transfer") {
      navigate("/fund-wallet/bank-transfer");
    } else if (option === "Flutterwave") {
      navigate("/fund-wallet/flutterwave");
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={18} className="text-green-800" />
        </button>
        <h1 className="text-base font-bold text-green-800">Fund Wallet</h1>
      </div>

      {/* Fund options - More compact */}
      <div className="mt-2 px-3">
        {/* Card option */}
        <div 
          className="border-t border-b py-2 flex justify-between items-center cursor-pointer"
          onClick={() => handleFundOption("Card")}
        >
          <h2 className="font-bold text-sm text-green-800">Fund with Card</h2>
          <ChevronRight className="text-gray-400" size={14} />
        </div>

        {/* Bank Transfer option */}
        <div 
          className="border-b py-2 flex justify-between items-center cursor-pointer"
          onClick={() => handleFundOption("Bank Transfer")}
        >
          <h2 className="font-bold text-sm text-green-800">Fund with Bank Transfer</h2>
          <ChevronRight className="text-gray-400" size={14} />
        </div>

        {/* Flutterwave option */}
        <div 
          className="border-b py-2 flex justify-between items-center cursor-pointer"
          onClick={() => handleFundOption("Flutterwave")}
        >
          <h2 className="font-bold text-sm text-green-800">Fund with Flutterwave</h2>
          <ChevronRight className="text-gray-400" size={14} />
        </div>
      </div>

      {/* Security message */}
      <div className="fixed bottom-4 w-full text-center">
        <p className="text-gray-500 text-xs">All payment methods are highly secured</p>
      </div>
    </div>
  );
};

export default FundWallet;
