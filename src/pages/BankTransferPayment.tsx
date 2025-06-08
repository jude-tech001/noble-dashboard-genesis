
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";

const BankTransferPayment: React.FC = () => {
  const navigate = useNavigate();
  const { updateUserInfo, user } = useAuth();
  const [copied, setCopied] = useState<string | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  // Get amount from query params or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount') || localStorage.getItem('fundAmount') || '5000';
  
  // Bank account details
  const bankDetails = {
    accountNumber: "6056570413",
    accountName: "CHUKWUEMEKA AMADI JAMES",
    bankName: "Moniepoint MFB"
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(type);
      toast.success(`${type} copied to clipboard`);
      setTimeout(() => setCopied(null), 2000);
    });
  };

  const handleConfirmPayment = () => {
    setShowConfirmation(true);
    setIsProcessing(true);
    setProgress(0);
    
    // Progress animation over 7 seconds
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsProcessing(false);
          
          // Update user balance
          if (user) {
            const newBalance = user.balance + parseInt(amount);
            updateUserInfo({ balance: newBalance });
            
            // Store funding transaction
            const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
            const newTransaction = {
              id: `tr-${Date.now()}`,
              type: "credit",
              amount: parseInt(amount),
              date: new Date().toISOString().split('T')[0],
              description: "Bank Transfer Funding",
              status: "completed"
            };
            existingTransactions.push(newTransaction);
            localStorage.setItem('transactions', JSON.stringify(existingTransactions));
          }
          
          // Generate 6-digit confirmation code
          const confirmationCode = Math.floor(100000 + Math.random() * 900000);
          localStorage.setItem('bankTransferCode', confirmationCode.toString());
          
          setTimeout(() => {
            navigate("/dashboard");
            toast.success("Payment confirmed successfully!");
          }, 1000);
          
          return 100;
        }
        return prev + (100 / 70); // 7 seconds = 70 intervals of 100ms
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate("/fund-wallet")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Bank Transfer</h1>
      </div>
      
      <div className="p-6">
        {/* Amount to Pay */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Amount to Pay</h2>
          <p className="text-3xl font-bold text-green-800">₦{parseInt(amount).toLocaleString()}</p>
        </div>
        
        {/* Bank Details */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h3 className="text-lg font-medium mb-4">Transfer to this account</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Account Number</p>
                <p className="font-medium text-lg">{bankDetails.accountNumber}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountNumber, "Account Number")}
                className="text-green-800"
              >
                {copied === "Account Number" ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Account Name</p>
                <p className="font-medium">{bankDetails.accountName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.accountName, "Account Name")}
                className="text-green-800"
              >
                {copied === "Account Name" ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
            
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600">Bank Name</p>
                <p className="font-medium">{bankDetails.bankName}</p>
              </div>
              <button
                onClick={() => copyToClipboard(bankDetails.bankName, "Bank Name")}
                className="text-green-800"
              >
                {copied === "Bank Name" ? <CheckCircle size={20} /> : <Copy size={20} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-blue-800 mb-2">Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Transfer exactly ₦{parseInt(amount).toLocaleString()} to the account above</li>
            <li>• Use your registered name as the transfer description</li>
            <li>• Click "I have sent the money" after completing the transfer</li>
            <li>• Your account will be credited within 5-10 minutes</li>
          </ul>
        </div>
        
        {/* Confirm Button */}
        <button
          onClick={handleConfirmPayment}
          className="w-full bg-green-800 text-white py-4 rounded-lg font-medium text-lg"
          disabled={isProcessing}
        >
          I have sent the money
        </button>
      </div>

      {/* Processing Dialog */}
      <Dialog open={showConfirmation} onOpenChange={() => {}}>
        <DialogContent className="w-full h-full max-w-none max-h-none m-0 rounded-none flex items-center justify-center bg-white">
          <div className="text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="w-24 h-24 border-4 border-gray-200 rounded-full"></div>
              <div 
                className="absolute top-0 left-0 w-24 h-24 border-4 border-green-600 rounded-full border-t-transparent animate-spin"
                style={{
                  animation: `spin 1s linear infinite`
                }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-sm font-medium text-green-600">{Math.round(progress)}%</span>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Confirming Payment</h2>
            <p className="text-gray-600">Please wait while we verify your payment...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BankTransferPayment;
