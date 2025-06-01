
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import PaymentHeader from "@/components/PaymentHeader";
import AccountDetailsCard from "@/components/AccountDetailsCard";
import PaymentTimer from "@/components/PaymentTimer";
import PaymentInstructions from "@/components/PaymentInstructions";
import PaymentDialogs from "@/components/PaymentDialogs";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const [showProcessingDialog, setShowProcessingDialog] = useState(false);
  const [showFailureDialog, setShowFailureDialog] = useState(false);
  const [buttonText, setButtonText] = useState("I Have Made Payment");
  
  const accountDetails = {
    bankName: "Sterling Bank",
    accountNumber: "0118697498",
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

  const handleBack = () => {
    navigate(-1);
  };

  const handlePaymentConfirmation = () => {
    // Show processing dialog with circle loading
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
      <PaymentHeader onBack={handleBack} title="Bank Transfer" />

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
            
            <AccountDetailsCard accountDetails={accountDetails} />
            
            <PaymentInstructions userName={user?.firstName} />
              
            <PaymentTimer initialTime={1800} isLoading={isLoading} />

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

      <PaymentDialogs
        showProcessingDialog={showProcessingDialog}
        showFailureDialog={showFailureDialog}
        onProcessingDialogChange={setShowProcessingDialog}
        onFailureDialogChange={setShowFailureDialog}
        onTryAgain={handleTryAgain}
      />
    </div>
  );
};

export default BankTransferPayment;
