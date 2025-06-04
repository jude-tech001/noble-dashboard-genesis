
import React from "react";
import { Gift } from "lucide-react";
import { toast } from "sonner";

interface GiftBoxProps {
  giftClaimed: boolean;
  isProcessing: boolean;
  lastClaimTime: number;
  hasWithdrawn: boolean;
  onGiftClick: () => void;
}

const GiftBox: React.FC<GiftBoxProps> = ({
  giftClaimed,
  isProcessing,
  lastClaimTime,
  hasWithdrawn,
  onGiftClick
}) => {
  const isCooldownOver = () => {
    const now = Date.now();
    const hoursPassed = (now - lastClaimTime) / (1000 * 60 * 60);
    return hoursPassed >= 48;
  };

  const handleGiftClick = () => {
    if (!hasWithdrawn) {
      toast.error("Complete your first withdrawal to unlock rewards!");
      return;
    }
    
    if (giftClaimed && !isCooldownOver()) {
      toast.error("You can claim again after 48 hours!");
      return;
    }
    onGiftClick();
  };

  const canClaim = hasWithdrawn && (!giftClaimed || isCooldownOver());

  return (
    <div className="mt-4">
      <div className="flex justify-center">
        <button 
          onClick={handleGiftClick}
          className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center relative"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <div className="w-5 h-5 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <Gift 
              size={24} 
              className={`text-purple-600 ${canClaim ? 'animate-pulse' : 'opacity-50'}`}
            />
          )}
          {canClaim && !isProcessing && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">1</span>
            </div>
          )}
        </button>
      </div>

      {!hasWithdrawn && (
        <div className="text-center mt-2 text-xs text-gray-500">
          Complete first withdrawal to unlock
        </div>
      )}

      {hasWithdrawn && giftClaimed && !isCooldownOver() && (
        <div className="text-center mt-2 text-xs text-gray-500">
          Available again in 48 hours
        </div>
      )}
    </div>
  );
};

export default GiftBox;
