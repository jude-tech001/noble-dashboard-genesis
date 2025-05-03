
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const Withdraw: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUserInfo } = useAuth();
  const [amount, setAmount] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const nigerianBanks = [
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

  const handleBack = () => {
    navigate(-1);
  };

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
    
    // Navigate to activation page for code confirmation
    navigate("/withdraw/activation", {
      state: {
        amount: withdrawAmount,
        accountNumber,
        accountName,
        bank: selectedBank,
        // Pass additional data needed for the withdrawal process
        onSuccess: () => {
          // This function will be called after successful activation
          if (user) {
            const newBalance = user.balance - withdrawAmount;
            // Update user's balance
            updateUserInfo({ balance: newBalance });
            toast.success(`Withdrawal of ₦${withdrawAmount.toLocaleString()} successful`);
          }
        }
      }
    });
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="flex items-center p-3 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={18} className="text-gray-800" />
        </button>
        <h1 className="text-base font-medium text-gray-800">Withdraw Funds</h1>
      </div>

      <div className="p-4">
        <div className="rounded-lg bg-gray-50 p-4 mb-6">
          <p className="text-sm text-gray-500 mb-1">Available Balance</p>
          <p className="text-3xl font-bold text-green-800">
            ₦{user?.balance.toLocaleString() || "0"}
          </p>
        </div>
        
        <form onSubmit={handleWithdraw} className="space-y-6">
          <div>
            <Label htmlFor="amount" className="text-gray-700 mb-1 block">
              Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₦</span>
              <Input
                id="amount"
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                placeholder="0.00"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="bank" className="text-gray-700 mb-1 block">
              Select Bank
            </Label>
            <Select
              value={selectedBank}
              onValueChange={setSelectedBank}
            >
              <SelectTrigger id="bank">
                <SelectValue placeholder="Select a bank" />
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
            <Label htmlFor="accountNumber" className="text-gray-700 mb-1 block">
              Account Number
            </Label>
            <Input
              id="accountNumber"
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value.replace(/\D/g, ''))}
              maxLength={10}
              placeholder="Enter account number"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="accountName" className="text-gray-700 mb-1 block">
              Account Name
            </Label>
            <Input
              id="accountName"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              placeholder="Enter account name"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-green-800 text-white py-3 rounded-lg font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Withdraw"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
