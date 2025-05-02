
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup } from "@/components/ui/input-otp";
import { Check, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ActivationCode: React.FC = () => {
  const navigate = useNavigate();
  const [activationCode, setActivationCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [displayedCode, setDisplayedCode] = useState<string[]>(["⚪", "⚪", "⚪", "⚪", "⚪", "⚪"]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const validCode = "236589";
  
  // Add loading state when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000); // 5 seconds loading time
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleCodeComplete = (value: string) => {
    setActivationCode(value);
    
    // Check if code matches the valid code
    if (value.length === 6) {
      if (value === validCode) {
        setShowSuccessModal(true);
      } else {
        toast.error("Invalid activation code");
        setActivationCode("");
      }
    }
  };

  // Update displayed code when activation code changes
  useEffect(() => {
    const newDisplay = Array(6).fill("⚪");
    for (let i = 0; i < 6; i++) {
      if (i < activationCode.length) {
        newDisplay[i] = activationCode[i];
      }
    }
    setDisplayedCode(newDisplay);
  }, [activationCode]);
  
  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate("/payment-receipt");
  };

  // Keypad button click handler
  const handleKeyPress = (key: string) => {
    if (key === "check") {
      if (activationCode.length === 6) {
        handleCodeComplete(activationCode);
      } else {
        toast.error("Please enter a complete 6-digit code");
      }
    } else if (key === "clear") {
      setActivationCode("");
    } else if (key === "backspace") {
      setActivationCode(prev => prev.slice(0, -1));
    } else if (activationCode.length < 6) {
      setActivationCode(prev => prev + key);
    }
  };

  // If loading, show loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white">
        <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-lg text-green-800">Processing...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-white">
      {/* Header */}
      <h1 className="text-2xl font-bold text-green-800 mt-8 mb-16">
        Enter Activation PIN
      </h1>
      
      {/* OTP Input */}
      <div className="w-4/5 mx-auto mb-16">
        <InputOTP 
          maxLength={6}
          value={activationCode} 
          onChange={setActivationCode}
          pattern="^[0-9]{1,6}$"
          render={({ slots }) => (
            <InputOTPGroup className="w-full">
              <div className="w-full bg-gray-100 border border-green-800 rounded-full flex justify-center p-3">
                {displayedCode.map((digit, index) => (
                  <div key={index} className="mx-1 text-center text-xl font-bold">
                    {digit}
                  </div>
                ))}
              </div>
            </InputOTPGroup>
          )}
        />
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-4 w-full px-8">
        {[
          ["1", "2", "3"],
          ["4", "5", "6"],
          ["7", "8", "9"],
          ["backspace", "0", "check"]
        ].map((row, rowIndex) => (
          <React.Fragment key={`row-${rowIndex}`}>
            {row.map((key) => (
              <button
                key={key}
                className="rounded-full bg-green-800 text-white text-2xl h-16 w-full flex items-center justify-center"
                onClick={() => handleKeyPress(key)}
              >
                {key === "backspace" ? (
                  <X className="h-6 w-6" />
                ) : key === "check" ? (
                  <Check className="h-6 w-6" />
                ) : (
                  key
                )}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Buy Activation Code Button */}
      <button 
        className="mt-10 text-green-800 text-xl font-semibold"
        onClick={() => navigate("/fund-wallet")}
      >
        Buy Activation Code
      </button>
      
      {/* Success Dialog */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center">
            <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-4">
              <Check className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-2xl font-medium mb-4">Your Withdrawal was successful.</h2>
            <button 
              onClick={handleSuccessClose} 
              className="w-full bg-green-800 text-white py-4 px-8 rounded-md text-lg font-medium"
            >
              OKay
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ActivationCode;
