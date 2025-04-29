
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Withdraw: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountNumber, setAccountNumber] = useState("");
  const [bank, setBank] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState("");

  const formattedBalance = new Intl.NumberFormat().format(user?.balance || 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!accountNumber || !bank || !accountName || !amount) {
      toast.error("Please fill in all fields");
      return;
    }

    const withdrawAmount = parseFloat(amount);
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }

    if (withdrawAmount > (user?.balance || 0)) {
      toast.error("Insufficient balance");
      return;
    }

    toast.success("Withdrawal request submitted successfully");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-white px-4 py-6">
      <div className="flex items-center mb-4">
        <button 
          onClick={() => navigate("/dashboard")} 
          className="p-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-2xl font-bold ml-2">Withdraw To Bank Account</h1>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div>
          <label htmlFor="accountNumber" className="block text-gray-600 mb-2">
            Account Number
          </label>
          <Input
            id="accountNumber"
            type="text"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            placeholder="Enter account number"
            className="bg-gray-100 border-none"
          />
        </div>

        <div>
          <label htmlFor="bank" className="block text-gray-600 mb-2">
            Bank Name
          </label>
          <Select value={bank} onValueChange={setBank}>
            <SelectTrigger className="bg-gray-100 border-none">
              <SelectValue placeholder="Select Bank" />
            </SelectTrigger>
            <SelectContent className="max-h-72 overflow-y-auto">
              {/* Commercial Banks */}
              <SelectItem value="access">Access Bank</SelectItem>
              <SelectItem value="citibank">Citibank Nigeria</SelectItem>
              <SelectItem value="ecobank">Ecobank Nigeria</SelectItem>
              <SelectItem value="fidelity">Fidelity Bank</SelectItem>
              <SelectItem value="firstbank">First Bank of Nigeria</SelectItem>
              <SelectItem value="fcmb">First City Monument Bank</SelectItem>
              <SelectItem value="gtb">Guaranty Trust Bank</SelectItem>
              <SelectItem value="heritage">Heritage Bank</SelectItem>
              <SelectItem value="keystone">Keystone Bank</SelectItem>
              <SelectItem value="polaris">Polaris Bank</SelectItem>
              <SelectItem value="providus">Providus Bank</SelectItem>
              <SelectItem value="stanbic">Stanbic IBTC Bank</SelectItem>
              <SelectItem value="standard">Standard Chartered Bank</SelectItem>
              <SelectItem value="sterling">Sterling Bank</SelectItem>
              <SelectItem value="sunTrust">SunTrust Bank</SelectItem>
              <SelectItem value="titan">Titan Trust Bank</SelectItem>
              <SelectItem value="union">Union Bank</SelectItem>
              <SelectItem value="uba">United Bank for Africa</SelectItem>
              <SelectItem value="unity">Unity Bank</SelectItem>
              <SelectItem value="wema">Wema Bank</SelectItem>
              <SelectItem value="zenith">Zenith Bank</SelectItem>
              
              {/* Digital/Neo Banks */}
              <SelectItem value="kuda">Kuda Bank</SelectItem>
              <SelectItem value="vfd">VFD Microfinance Bank (V Bank)</SelectItem>
              <SelectItem value="moniepoint">Moniepoint Microfinance Bank</SelectItem>
              <SelectItem value="opay">OPay</SelectItem>
              <SelectItem value="palmpay">PalmPay</SelectItem>
              <SelectItem value="rubies">Rubies Bank</SelectItem>
              <SelectItem value="mintyn">Mintyn Bank</SelectItem>
              
              {/* Selected Microfinance Banks */}
              <SelectItem value="accion">Accion Microfinance Bank</SelectItem>
              <SelectItem value="addosser">Addosser Microfinance Bank</SelectItem>
              <SelectItem value="adeyemi">Adeyemi Microfinance Bank</SelectItem>
              <SelectItem value="amju">AMJU Unique Microfinance Bank</SelectItem>
              <SelectItem value="apex">Apex Microfinance Bank</SelectItem>
              <SelectItem value="baobab">Baobab Microfinance Bank</SelectItem>
              <SelectItem value="bowen">Bowen Microfinance Bank</SelectItem>
              <SelectItem value="bridgeway">Bridgeway Microfinance Bank</SelectItem>
              <SelectItem value="bromfield">Bromfield Microfinance Bank</SelectItem>
              <SelectItem value="fina">FINA Trust Microfinance Bank</SelectItem>
              <SelectItem value="finatrust">Finatrust Microfinance Bank</SelectItem>
              <SelectItem value="firmus">Firmus Microfinance Bank</SelectItem>
              <SelectItem value="firstoption">First Option Microfinance Bank</SelectItem>
              <SelectItem value="firstroyal">First Royal Microfinance Bank</SelectItem>
              <SelectItem value="hasal">Hasal Microfinance Bank</SelectItem>
              <SelectItem value="ikoyi">Ikoyi-Osun Microfinance Bank</SelectItem>
              <SelectItem value="infinity">Infinity Microfinance Bank</SelectItem>
              <SelectItem value="lapo">LAPO Microfinance Bank</SelectItem>
              <SelectItem value="mainstreet">Mainstreet Microfinance Bank</SelectItem>
              <SelectItem value="npmb">NPF Microfinance Bank</SelectItem>
              <SelectItem value="oya">Oya Microfinance Bank</SelectItem>
              <SelectItem value="peace">Peace Microfinance Bank</SelectItem>
              <SelectItem value="petra">Petra Microfinance Bank</SelectItem>
              <SelectItem value="platinum">Platinum Microfinance Bank</SelectItem>
              <SelectItem value="regent">Regent Microfinance Bank</SelectItem>
              <SelectItem value="renmoney">Renmoney Microfinance Bank</SelectItem>
              <SelectItem value="sparkle">Sparkle Microfinance Bank</SelectItem>
              <SelectItem value="tajbank">TAJBank</SelectItem>
              <SelectItem value="verite">Verite Microfinance Bank</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label htmlFor="accountName" className="block text-gray-600 mb-2">
            Account Name
          </label>
          <Input
            id="accountName"
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            placeholder="Account Name"
            className="bg-gray-100 border-none"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-gray-600 mb-2">
            Amount
          </label>
          <Input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="bg-gray-100 border-none"
          />
        </div>

        <div className="mt-4">
          <p className="text-green-700 text-lg font-medium">
            Available Balance: ₦{formattedBalance}
          </p>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="bg-green-700 text-white py-3 px-12 rounded-full w-full max-w-xs"
          >
            Proceed
          </button>
        </div>
      </form>
    </div>
  );
};

export default Withdraw;
