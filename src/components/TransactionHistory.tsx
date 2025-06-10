
import React from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface Transaction {
  id: string;
  type: "credit" | "debit";
  amount: number;
  date: string;
  description: string;
  status: "completed" | "pending" | "failed";
}

const TransactionHistory: React.FC = () => {
  const { user } = useAuth();
  
  // Check if user has claimed the reward to show welcome bonus transaction
  const rewardClaimed = localStorage.getItem("rewardClaimed") === "true";
  
  const transactions: Transaction[] = rewardClaimed ? [
    {
      id: "tr-001",
      type: "credit",
      amount: 150000,
      date: new Date().toISOString().split('T')[0],
      description: "Welcome Bonus",
      status: "completed"
    }
  ] : [];
  
  if (transactions.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No transaction yet</p>
      </div>
    );
  }
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Transaction History</h2>
      
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <div key={transaction.id} className="bg-white p-4 rounded-lg shadow-sm flex justify-between items-center">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                transaction.type === "credit" ? "bg-green-100" : "bg-red-100"
              }`}>
                {transaction.type === "credit" ? (
                  <ArrowDown size={18} className="text-green-600" />
                ) : (
                  <ArrowUp size={18} className="text-red-600" />
                )}
              </div>
              <div className="ml-3">
                <p className="font-medium">{transaction.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <p className={`font-bold ${
                transaction.type === "credit" ? "text-green-600" : "text-red-600"
              }`}>
                {transaction.type === "credit" ? "+" : "-"}₦{transaction.amount.toLocaleString()}
              </p>
              <p className={`text-xs ${
                transaction.status === "completed" ? "text-green-600" : 
                transaction.status === "pending" ? "text-yellow-600" : "text-red-600"
              }`}>
                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
