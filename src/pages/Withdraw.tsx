
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Loader } from "lucide-react";

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useAuth();
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showProcessing, setShowProcessing] = useState(false);

  const nigerianBanks = [
    // Traditional banks
    { name: "Access Bank", code: "044" },
    { name: "Citibank", code: "023" },
    { name: "Diamond Bank", code: "063" },
    { name: "Dynamic Standard Bank", code: "" },
    { name: "Ecobank Nigeria", code: "050" },
    { name: "Fidelity Bank Nigeria", code: "070" },
    { name: "First Bank of Nigeria", code: "011" },
    { name: "First City Monument Bank", code: "214" },
    { name: "Guaranty Trust Bank", code: "058" },
    { name: "Heritage Bank Plc", code: "030" },
    { name: "Jaiz Bank", code: "301" },
    { name: "Keystone Bank Limited", code: "082" },
    { name: "Providus Bank Plc", code: "101" },
    { name: "Polaris Bank", code: "076" },
    { name: "Stanbic IBTC Bank Nigeria Limited", code: "221" },
    { name: "Standard Chartered Bank", code: "068" },
    { name: "Sterling Bank", code: "232" },
    { name: "Suntrust Bank Nigeria Limited", code: "100" },
    { name: "Union Bank of Nigeria", code: "032" },
    { name: "United Bank for Africa", code: "033" },
    { name: "Unity Bank Plc", code: "215" },
    { name: "Wema Bank", code: "035" },
    { name: "Zenith Bank", code: "057" },
    // Digital banks
    { name: "Kuda Bank", code: "090267" },
    { name: "Opay", code: "090040" },
    { name: "PalmPay", code: "090170" },
    { name: "Moniepoint", code: "100032" },
    { name: "FairMoney", code: "090107" },
    // Microfinance banks
    { name: "Accion Microfinance Bank", code: "120001" },
    { name: "Baobab Microfinance Bank", code: "090001" },
    { name: "Grassroots Microfinance Bank", code: "090002" },
    { name: "Infinity Microfinance Bank", code: "090003" },
    { name: "Mainstreet Microfinance Bank", code: "090004" },
    { name: "NPF Microfinance Bank", code: "070001" },
    { name: "Petra Microfinance Bank", code: "090005" },
    { name: "Unical Microfinance Bank", code: "090006" },
    { name: "VFD Microfinance Bank", code: "566" },
    { name: "Fortis Microfinance Bank", code: "070002" },
    { name: "Seed Capital Microfinance Bank", code: "090007" },
    { name: "Empire Trust Microfinance Bank", code: "090008" },
    { name: "TCF MFB", code: "090115" },
    { name: "Finca Microfinance Bank", code: "090143" },
    { name: "Fina Trust Microfinance Bank", code: "090111" },
    { name: "Ndiorah Microfinance Bank", code: "090128" },
    { name: "Regent Microfinance Bank", code: "090125" },
    { name: "Fidfund Microfinance Bank", code: "090126" },
    { name: "BC Kash Microfinance Bank", code: "090127" },
    { name: "NOVA Bank", code: "999999" },
  ];

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!amount.trim()) {
      toast.error("Please enter an amount");
      return;
    }
    
    if (!selectedBank) {
      toast.error("Please select a bank");
      return;
    }
    
    if (!accountNumber.trim() || accountNumber.length < 10) {
      toast.error("Please enter a valid account number");
      return;
    }
    
    if (!accountName.trim()) {
      toast.error("Please enter account name");
      return;
    }
    
    // Check if amount is valid
    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    
    // Check if user has enough balance
    if (user && withdrawAmount > user.balance) {
      toast.error("Insufficient balance");
      return;
    }
    
    setIsSubmitting(true);
    setShowProcessing(true);
    
    // Store withdrawal information in sessionStorage instead of trying to pass a function
    sessionStorage.setItem('withdrawalDetails', JSON.stringify({
      amount: withdrawAmount,
      accountNumber,
      accountName,
      bank: selectedBank,
    }));
    
    // Show loading for 4 seconds before redirecting
    setTimeout(() => {
      setShowProcessing(false);
      setIsSubmitting(false);
      
      // Navigate to activation page for code confirmation
      navigate("/withdraw/activation");
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6">Withdraw To Bank Account</h1>

      <form onSubmit={handleWithdraw} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Account Number</label>
          <Input
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
            maxLength={10}
            placeholder="Enter account number"
            className="h-14 bg-gray-100 border-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Bank Name</label>
          <Select
            value={selectedBank}
            onValueChange={setSelectedBank}
          >
            <SelectTrigger className="h-14 bg-gray-100 border-none">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent className="max-h-80">
              {nigerianBanks.map((bank) => (
                <SelectItem key={bank.code || bank.name} value={bank.name}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Account Name</label>
          <Input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account Name"
            className="h-14 bg-gray-100 border-none"
            required
          />
        </div>
        
        <div>
          <label className="block text-gray-700 mb-2">Amount</label>
          <Input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ''))}
            placeholder="Enter amount"
            className="h-14 bg-gray-100 border-none"
            required
          />
        </div>
        
        <div className="py-2">
          <p className="text-green-800 font-medium text-lg">
            Available Balance: ₦{user?.balance.toLocaleString() || "0.00"}
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-green-800 text-white py-4 rounded-full text-xl font-medium"
          disabled={isSubmitting}
        >
          Proceed
        </button>
      </form>

      {/* Processing Dialog */}
      <Dialog open={showProcessing} onOpenChange={setShowProcessing}>
        <DialogContent className="sm:max-w-md">
          <div className="flex flex-col items-center justify-center p-6">
            <Loader size={40} className="text-green-800 animate-spin mb-4" />
            <p className="text-lg text-green-800 font-medium">Processing your withdrawal...</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Withdraw;
