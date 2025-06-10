
import React from "react";
import { Gift } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

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
  const { user } = useAuth();
  
  const isCooldownOver = () => {
    const now = Date.now();
    const hoursPassed = (now - lastClaimTime) / (1000 * 60 * 60);
    return hoursPassed >= 48;
  };

  // Check if user has claimed reward specific to their email
  const userSpecificRewardClaimed = user ? localStorage.getItem(`rewardClaimed_${user.email}`) === "true" : false;

  const handleGiftClick = () => {
    if (userSpecificRewardClaimed && !isCooldownOver()) {
      toast.error("You can claim again after 48 hours!");
      return;
    }
    onGiftClick();
  };

  const canClaim = (!userSpecificRewardClaimed || isCooldownOver());

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

      {userSpecificRewardClaimed && !isCooldownOver() && (
        <div className="text-center mt-2 text-xs text-gray-500">
          Available again in 48 hours
        </div>
      )}
    </div>
  );
};

export default GiftBox;
