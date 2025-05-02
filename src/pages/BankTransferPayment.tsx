
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [accountDetails, setAccountDetails] = useState({
    bankName: "",
    accountNumber: "",
    accountName: ""
  });
  
  // Load account details with delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setAccountDetails({
        bankName: "Guaranty Trust Bank",
        accountNumber: "0123456789",
        accountName: "NOBLE EARN LTD"
      });
      setIsLoading(false);
    }, 4000);
    
    return () => clearTimeout(timer);
  }, []);

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

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={18} className="text-green-800" />
        </button>
        <h1 className="text-base font-bold text-green-800">Bank Transfer</h1>
      </div>

      <div className="p-4">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-60">
            <div className="w-12 h-12 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-600">Loading account details...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <p className="text-sm text-gray-500 mb-1">Transfer Amount</p>
              <h2 className="text-2xl font-bold">₦6,200</h2>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Bank Name</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-medium">{accountDetails.bankName}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyClick(accountDetails.bankName, "Bank name")}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Number</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-medium">{accountDetails.accountNumber}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyClick(accountDetails.accountNumber, "Account number")}
                    >
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500">Account Name</p>
                  <div className="flex justify-between items-center mt-1">
                    <p className="font-medium">{accountDetails.accountName}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleCopyClick(accountDetails.accountName, "Account name")}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <p className="text-center text-sm text-gray-500">
                After making the transfer, send the payment receipt to our WhatsApp support for quicker confirmation.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default BankTransferPayment;
