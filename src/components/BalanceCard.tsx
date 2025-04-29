
import React from "react";
import { Eye, EyeOff } from "lucide-react";

interface BalanceCardProps {
  balance: number;
  isActivated: boolean;
}

const BalanceCard: React.FC<BalanceCardProps> = ({ balance, isActivated }) => {
  const [hideBalance, setHideBalance] = React.useState(false);

  const formattedBalance = new Intl.NumberFormat().format(balance);

  return (
    <div className="bg-noble rounded-lg p-4 text-white">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium mb-2">Available Balance</p>
          <h2 className="text-3xl font-bold flex items-center">
            ₦{hideBalance ? "•••••" : formattedBalance}
          </h2>
        </div>
        <div className="flex flex-col items-end">
          <p className="text-sm mb-2">
            {isActivated ? "Account Activated" : "Account Not Activated"}
          </p>
          <button
            onClick={() => setHideBalance(!hideBalance)}
            className="text-white"
          >
            {hideBalance ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
