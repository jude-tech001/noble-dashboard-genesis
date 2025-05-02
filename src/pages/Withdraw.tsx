
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!accountNumber || !bankName || !accountName || !amount) {
      toast.error("Please fill all fields");
      return;
    }
    
    if (!/^\d{10}$/.test(accountNumber)) {
      toast.error("Account number must be 10 digits");
      return;
    }
    
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    if (user && amountValue > user.balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    // Start processing with loading
    setIsProcessing(true);
    
    // Add 4-second delay before showing success
    setTimeout(() => {
      // Debit the amount from user's balance
      if (user) {
        const newBalance = user.balance - amountValue;
        updateUserInfo({ balance: newBalance });
      }
      
      setIsProcessing(false);
      setShowSuccessModal(true);
    }, 4000);
  };
  
  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    navigate('/payment-receipt');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={18} className="text-green-800" />
        </button>
        <h1 className="text-base font-bold text-green-800">Withdraw</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter account number"
              maxLength={10}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Bank Name</label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter bank name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Account Name</label>
            <input
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter account name"
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="Enter amount"
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-md mt-6"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Processing...
              </div>
            ) : (
              "Withdraw"
            )}
          </button>
        </form>
      </div>
      
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-11/12 max-w-sm">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-2">Withdrawal Successful</h2>
              <p className="text-gray-600 text-center mb-6">Your withdrawal has been processed successfully</p>
              <button 
                onClick={handleCloseSuccessModal}
                className="w-full bg-green-800 text-white py-2 rounded-md"
              >
                Okay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Withdraw;
