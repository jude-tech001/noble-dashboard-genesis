
import React from "react";
import { useNavigate } from "react-router-dom";
import { Copy } from "lucide-react";
import { toast } from "sonner";

const FlutterwaveConfirmation: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };
  
  const handlePaymentConfirm = () => {
    toast.success("Payment confirmation sent!");
    navigate("/dashboard");
  };
  
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-gray-200 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Bank Transfer</h1>
        <button 
          onClick={() => navigate(-1)}
          className="text-red-500 font-medium"
        >
          Cancel
        </button>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-center my-6">
          <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center">
            <span className="text-white">🔄</span>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">NGN 6,200</h2>
            <p className="text-sm text-gray-500">chukwuemekajames562@gmail.com</p>
          </div>
        </div>
        
        <p className="text-center text-lg font-medium my-6">
          Proceed to your bank app to complete this Transfer
        </p>
        
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Amount</p>
                <p className="text-xl font-bold">NGN 6200</p>
              </div>
              <button 
                onClick={() => handleCopy("6200", "Amount")}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Account Number</p>
                <p className="text-xl font-bold">8060695932</p>
              </div>
              <button 
                onClick={() => handleCopy("8060695932", "Account Number")}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div>
              <p className="text-gray-600">Bank Name</p>
              <p className="text-xl font-bold">MONIEPOINT</p>
            </div>
          </div>
          
          <div>
            <div>
              <p className="text-gray-600">Account Name</p>
              <p className="text-xl font-bold">EMMANUEL AKOMA</p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 border rounded-lg p-4 mb-6">
          <p className="text-center mb-4">
            Pay to this specific account and get your account your account code
          </p>
          
          <button
            onClick={handlePaymentConfirm}
            className="w-full bg-yellow-500 text-black text-center py-4 rounded font-bold"
          >
            I have made this bank Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlutterwaveConfirmation;
