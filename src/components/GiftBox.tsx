
import React from "react";
import { Gift } from "lucide-react";
import { toast } from "sonner";

interface GiftBoxProps {
  giftClaimed: boolean;
  isProcessing: boolean;
  lastClaimTime: number;
  onGiftClick: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({
  giftClaimed,
  isProcessing,
  lastClaimTime,
  onGiftClick
}) => {
  const isCooldownOver = () => {
    const now = Date.now();
    const hoursPassed = (now - lastClaimTime) / (1000 * 60 * 60);
    return hoursPassed >= 48;
  };

  const handleGiftClick = () => {
    if (giftClaimed && !isCooldownOver()) {
      toast.error("You can claim again after 48 hours!");
      return;
    }
    onGiftClick();
  };

  return (
    <div className="mt-6">
      <div className="flex justify-center">
        <button 
          onClick={handleGiftClick}
          className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center relative"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Gift 
              size={28} 
              className={`text-purple-600 ${giftClaimed && !isCooldownOver() ? 'opacity-50' : 'animate-pulse'}`}
            />
          )}
          {(!giftClaimed || isCooldownOver()) && !isProcessing && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          )}
        </button>
      </div>

      {giftClaimed && !isCooldownOver() && (
        <div className="text-center mt-2 text-sm text-gray-500">
          Available again in 48 hours
        </div>
      )}
    </div>
  );
};

export default GiftBox;
