
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
    toast.info(`${option} funding option selected. Feature coming soon.`);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-4">
          <ArrowLeft size={24} className="text-green-800" />
        </button>
        <h1 className="text-xl font-bold text-green-800">Fund Wallet</h1>
      </div>

      {/* Fund options */}
      <div className="mt-4 px-4">
        {/* Card option */}
        <div 
          className="border-t border-b py-3 flex justify-between items-center"
          onClick={() => handleFundOption("Card")}
        >
          <div>
            <h2 className="text-lg font-bold text-green-800">Fund with Card</h2>
            <p className="text-gray-500 text-sm">
              It's quick, hassle-free, and ensures your financial information is protected.
            </p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>

        {/* Bank Transfer option */}
        <div 
          className="border-b py-3 flex justify-between items-center"
          onClick={() => handleFundOption("Bank Transfer")}
        >
          <div>
            <h2 className="text-lg font-bold text-green-800">Fund with Bank Transfer</h2>
            <p className="text-gray-500 text-sm">
              Consider using bank transfer for your payment. It's a secure and reliable method.
            </p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>

        {/* Flutterwave option */}
        <div 
          className="border-b py-3 flex justify-between items-center"
          onClick={() => handleFundOption("Flutterwave")}
        >
          <div>
            <h2 className="text-lg font-bold text-green-800">Fund with Flutterwave</h2>
            <p className="text-gray-500 text-sm">
              You can conveniently make your payment using Flutterwave, a trusted payment gateway.
            </p>
          </div>
          <ChevronRight className="text-gray-400" size={20} />
        </div>
      </div>

      {/* Security message */}
      <div className="fixed bottom-8 w-full text-center">
        <p className="text-gray-500 text-sm">All payment method are highly secured</p>
      </div>
    </div>
  );
};

export default FundWallet;
