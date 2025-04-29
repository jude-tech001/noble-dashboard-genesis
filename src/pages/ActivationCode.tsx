
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Check, X } from "lucide-react";

const ActivationCode: React.FC = () => {
  const navigate = useNavigate();
  const [activationCode, setActivationCode] = useState("");
  
  const handleCodeComplete = (value: string) => {
    setActivationCode(value);
    
    // Simulate code verification (you can implement actual verification logic)
    if (value.length === 6) {
      setTimeout(() => {
        toast.success("Withdrawal request successful");
        navigate("/dashboard");
      }, 1000);
    }
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

  // Keypad render function
  const renderKeypad = () => {
    const keys = [
      ["1", "2", "3"],
      ["4", "5", "6"], 
      ["7", "8", "9"],
      ["backspace", "0", "check"]
    ];

    return (
      <div className="grid grid-cols-3 gap-4 mt-16">
        {keys.map((row, rowIndex) => 
          row.map((key, keyIndex) => (
            <button
              key={`${rowIndex}-${keyIndex}`}
              className="h-16 w-16 rounded-full bg-green-800 text-white text-2xl flex items-center justify-center"
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
          ))
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center pt-20 px-4">
      <h1 className="text-3xl font-bold text-green-800">Enter Activation PIN</h1>
      
      <div className="mt-32 w-full max-w-md">
        <InputOTP 
          maxLength={6}
          value={activationCode} 
          onChange={setActivationCode}
          render={({ slots }) => (
            <InputOTPGroup className="gap-2 w-full">
              {slots.map((slot, index) => (
                <InputOTPSlot 
                  key={index} 
                  {...slot} 
                  index={index}
                  className="rounded-xl h-14 w-full border-2 border-green-800 bg-gray-100"
                />
              ))}
            </InputOTPGroup>
          )}
        />
      </div>

      <div className="flex justify-center mt-12">
        {renderKeypad()}
      </div>

      <button 
        className="mt-12 text-green-800 text-xl font-semibold"
        onClick={() => toast.info("Activation code purchase feature coming soon")}
      >
        Buy Activation Code
      </button>
    </div>
  );
};

export default ActivationCode;
