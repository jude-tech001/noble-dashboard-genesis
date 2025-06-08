
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const FlutterwavePayment: React.FC = () => {
  const navigate = useNavigate();
  
  // Get amount from query params or localStorage
  const urlParams = new URLSearchParams(window.location.search);
  const amount = urlParams.get('amount') || localStorage.getItem('fundAmount') || '5000';

  useEffect(() => {
    // Auto-redirect to confirmation after 3 seconds to simulate payment processing
    const timer = setTimeout(() => {
      navigate("/flutterwave-confirmation");
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center border-b">
        <button onClick={() => navigate("/fund-wallet")} className="mr-4">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-medium">Flutterwave Payment</h1>
      </div>
      
      <div className="p-6">
        {/* Amount to Pay */}
        <div className="bg-white rounded-lg p-6 mb-6 text-center">
          <h2 className="text-lg font-medium text-gray-600 mb-2">Amount to Pay</h2>
          <p className="text-3xl font-bold text-green-800">₦{parseInt(amount).toLocaleString()}</p>
        </div>
        
        {/* Loading State */}
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-800 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium mb-2">Processing Payment</h3>
          <p className="text-gray-600">Redirecting to Flutterwave gateway...</p>
        </div>
        
        {/* Instructions */}
        <div className="bg-blue-50 rounded-lg p-4 mt-6">
          <h4 className="font-medium text-blue-800 mb-2">Payment Instructions</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• You will be redirected to Flutterwave payment gateway</li>
            <li>• Complete your payment using your preferred method</li>
            <li>• You will be redirected back after successful payment</li>
            <li>• Your account will be credited automatically</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FlutterwavePayment;
