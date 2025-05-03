
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Expanded list of Nigerian banks including microfinance banks
const nigerianBanks = [
  "Access Bank",
  "Citibank Nigeria",
  "Ecobank Nigeria",
  "Fidelity Bank",
  "First Bank of Nigeria",
  "First City Monument Bank",
  "Guaranty Trust Bank",
  "Heritage Bank",
  "Jaiz Bank",
  "Keystone Bank",
  "NOVA Bank",
  "Polaris Bank",
  "Providus Bank",
  "Stanbic IBTC Bank",
  "Standard Chartered Bank",
  "Sterling Bank",
  "SunTrust Bank",
  "TAJ Bank",
  "Titan Trust Bank",
  "Union Bank of Nigeria",
  "United Bank for Africa",
  "Unity Bank",
  "Wema Bank",
  "Zenith Bank",
  // Microfinance Banks
  "Abbey Mortgage Bank",
  "ACCION Microfinance Bank",
  "Amju Unique Microfinance Bank",
  "ASIFU Microfinance Bank",
  "BC Kash Microfinance Bank",
  "Bowen Microfinance Bank",
  "Carbon Microfinance Bank",
  "Cellulant Microfinance Bank",
  "Creditville Microfinance Bank",
  "Ekondo Microfinance Bank",
  "Empire Trust Microfinance Bank",
  "FINCA Microfinance Bank",
  "FINEX Microfinance Bank",
  "FirstTrust Mortgage Bank",
  "Fortis Microfinance Bank",
  "Goodnews Microfinance Bank",
  "Grooming Centre Microfinance Bank",
  "Hasal Microfinance Bank",
  "Infinity Microfinance Bank",
  "Kuda Microfinance Bank",
  "Lagos Building Investment Company",
  "Lapo Microfinance Bank",
  "LBIC Mortgage Bank",
  "Mainstreet Microfinance Bank",
  "NPF Microfinance Bank",
  "Opay Microfinance Bank",
  "Page Financials Microfinance Bank",
  "PalmPay Microfinance Bank",
  "Parallex Bank",
  "Peace Microfinance Bank",
  "Petra Microfinance Bank",
  "Platinum Mortgage Bank",
  "Rephidim Microfinance Bank",
  "Seed Capital Microfinance Bank",
  "Sparkle Microfinance Bank",
  "Trustfund Microfinance Bank",
  "VFD Microfinance Bank"
];

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useAuth();
  const [accountNumber, setAccountNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

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
    
    // Store withdrawal info in session storage
    sessionStorage.setItem("withdrawal_info", JSON.stringify({
      accountNumber,
      bankName,
      accountName,
      amount: amountValue
    }));
    
    // Navigate to activation code page
    navigate("/withdraw/activation");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-black" />
        </button>
        <h1 className="text-xl font-medium">Withdraw To Bank Account</h1>
      </div>

      <div className="p-4">
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-gray-600 mb-2">Account Number</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg"
                placeholder="Account Number"
                maxLength={10}
                pattern="\d{10}"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Bank Name</label>
              <Select onValueChange={setBankName} value={bankName}>
                <SelectTrigger className="w-full p-4 h-14 bg-gray-100">
                  <SelectValue placeholder="Select Bank" />
                </SelectTrigger>
                <SelectContent className="max-h-[45vh]">
                  {nigerianBanks.map((bank) => (
                    <SelectItem key={bank} value={bank}>
                      {bank}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Account Name</label>
              <input
                type="text"
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg"
                placeholder="Account Name"
              />
            </div>
            
            <div>
              <label className="block text-gray-600 mb-2">Amount</label>
              <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-4 bg-gray-100 rounded-lg"
                placeholder="Amount"
              />
            </div>
          </div>
          
          <div className="mt-6 mb-6">
            <p className="text-gray-800">
              Available Balance: 
              <span className="font-bold text-green-800"> ₦{user?.balance.toFixed(2) || "0.00"}</span>
            </p>
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-4 rounded-lg font-medium"
          >
            Proceed
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
