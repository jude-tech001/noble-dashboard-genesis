
import React from "react";
import { Copy, Wallet, User2, Banknote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface AccountDetails {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: string;
}

interface AccountDetailsCardProps {
  accountDetails: AccountDetails;
}

const AccountDetailsCard: React.FC<AccountDetailsCardProps> = ({ accountDetails }) => {
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
    <div className="bg-gray-50 rounded-lg overflow-hidden text-sm">
      <div className="p-3 flex justify-between items-center">
        <div className="flex-1">
          <div className="flex items-center">
            <div className="bg-gray-100 p-1.5 rounded-md mr-3">
              <Banknote size={20} className="text-green-800" />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Bank Name</p>
              <p className="font-bold text-green-800 text-sm">{accountDetails.bankName}</p>
            </div>
          </div>
        </div>
        <div className="flex items-center text-blue-600">
          <span className="bg-green-100 px-2 py-0.5 rounded-md text-green-600 text-xs">Active</span>
        </div>
      </div>
      
      <div className="border-t p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
            <span className="font-mono text-xs">123</span>
          </div>
          <div>
            <p className="text-gray-500 text-xs">Account Number</p>
            <p className="font-bold text-gray-800 text-sm">{accountDetails.accountNumber}</p>
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="bg-green-800 text-white hover:bg-green-700 text-xs px-2 py-1 h-7"
          onClick={() => handleCopyClick(accountDetails.accountNumber, "Account number")}
        >
          <Copy size={14} className="mr-1" /> Copy
        </Button>
      </div>
      
      <div className="border-t p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
            <User2 size={16} className="text-gray-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Account Name</p>
            <p className="font-bold text-gray-800 text-sm">{accountDetails.accountName}</p>
          </div>
        </div>
      </div>
      
      <div className="border-t p-3 flex justify-between items-center">
        <div className="flex items-center">
          <div className="bg-gray-200 p-1.5 rounded-md mr-3 w-7 h-7 flex items-center justify-center">
            <Wallet size={16} className="text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-xs">Amount</p>
            <p className="font-bold text-green-800 text-sm">{accountDetails.amount}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetailsCard;
