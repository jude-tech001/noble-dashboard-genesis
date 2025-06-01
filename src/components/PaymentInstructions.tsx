
import React from "react";

interface PaymentInstructionsProps {
  userName?: string;
}

const PaymentInstructions: React.FC<PaymentInstructionsProps> = ({ userName }) => {
  return (
    <div className="mt-4 bg-gray-100 p-3 rounded-lg">
      <p className="text-gray-700 text-xs">
        Hi, {userName || "James"}
      </p>
      <p className="text-gray-700 text-xs mt-1">
        Make A One Time Payment In Bank Details Above To Activate Your Account And Withdraw Instantly
      </p>
    </div>
  );
};

export default PaymentInstructions;
