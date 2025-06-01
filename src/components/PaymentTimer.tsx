
import React, { useEffect, useState } from "react";

interface PaymentTimerProps {
  initialTime: number;
  isLoading: boolean;
}

const PaymentTimer: React.FC<PaymentTimerProps> = ({ initialTime, isLoading }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

  useEffect(() => {
    if (!isLoading && timeLeft > 0) {
      const countdownTimer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      
      return () => clearInterval(countdownTimer);
    }
  }, [isLoading, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins} mins ${secs} secs`;
  };

  return (
    <div className="p-2 text-center text-green-800 text-xs mt-3">
      <p>this one-time account expires in {formatTime(timeLeft)}</p>
    </div>
  );
};

export default PaymentTimer;
