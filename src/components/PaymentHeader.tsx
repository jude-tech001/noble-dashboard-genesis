
import React from "react";
import { ArrowLeft } from "lucide-react";

interface PaymentHeaderProps {
  onBack: () => void;
  title: string;
}

const PaymentHeader: React.FC<PaymentHeaderProps> = ({ onBack, title }) => {
  return (
    <div className="flex items-center p-2 border-b">
      <button onClick={onBack} className="mr-2">
        <ArrowLeft size={16} className="text-green-800" />
      </button>
      <h1 className="text-sm font-medium text-gray-800">{title}</h1>
    </div>
  );
};

export default PaymentHeader;
