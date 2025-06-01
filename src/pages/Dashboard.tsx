
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BalanceCard from "@/components/BalanceCard";
import NovaIdCard from "@/components/NovaIdCard";
import DashboardHeader from "@/components/DashboardHeader";
import GiftBox from "@/components/GiftBox";
import DashboardQuickMenu from "@/components/DashboardQuickMenu";
import DashboardTabs from "@/components/DashboardTabs";
import DashboardModals from "@/components/DashboardModals";
import ActivateAccountButton from "@/components/ActivateAccountButton";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showActivationMessage, setShowActivationMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if reward was already claimed (stored in localStorage)
  const [giftClaimed, setGiftClaimed] = useState(() => {
    return localStorage.getItem("rewardClaimed") === "true";
  });
  
  // Last claim timestamp for 48-hour cooldown
  const [lastClaimTime, setLastClaimTime] = useState(() => {
    return parseInt(localStorage.getItem("lastClaimTime") || "0");
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    // Check if this is a new user session and they have a previous balance
    if (user && user.balance === 150000 && !lastClaimTime) {
      // They already have the reward amount, mark as claimed
      setGiftClaimed(true);
      localStorage.setItem("rewardClaimed", "true");
      setLastClaimTime(Date.now());
      localStorage.setItem("lastClaimTime", Date.now().toString());
    }
  }, [isAuthenticated, navigate, user, lastClaimTime]);

  if (!user) {
    return null;
  }

  const handleMenuAction = (action: string) => {
    if (action === "withdraw") {
      navigate("/withdraw");
    } else if (action === "addFund") {
      navigate("/fund-wallet");
    } else if (action === "buyAirtime" || action === "buyData") {
      setShowActivationMessage(true);
    } else if (action === "transactions") {
      setActiveTab("transactions");
    } else if (action === "groups") {
      setActiveTab("groups");
    } else if (action === "support") {
      setActiveTab("support");
    }
  };

  const handleGiftClick = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      
      // Add a 4-second loading delay before adding balance
      setTimeout(() => {
        // Update user's balance
        updateUserInfo({ balance: 150000 });
        setGiftClaimed(true);
        localStorage.setItem("rewardClaimed", "true");
        
        // Set last claim time
        setLastClaimTime(Date.now());
        localStorage.setItem("lastClaimTime", Date.now().toString());
        
        setIsProcessing(false);
        setShowSuccessModal(true);
      }, 4000);
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseActivationMessage = () => {
    setShowActivationMessage(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <DashboardHeader />

      <DashboardTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div>
          <BalanceCard balance={user.balance} isActivated={user.isActivated} />
          
          <GiftBox
            giftClaimed={giftClaimed}
            isProcessing={isProcessing}
            lastClaimTime={lastClaimTime}
            onGiftClick={handleGiftClick}
          />

          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => navigate("/withdraw")}
              className="bg-green-800 text-white px-8 py-3 rounded-full font-medium"
            >
              Withdraw
            </button>
          </div>

          <ActivateAccountButton />

          <div className="mt-6">
            <NovaIdCard id={user.id || "33966608mlfp8gbwes4y"} />
          </div>

          <DashboardQuickMenu onMenuAction={handleMenuAction} />
        </div>
      </DashboardTabs>

      <DashboardModals
        showSuccessModal={showSuccessModal}
        showActivationMessage={showActivationMessage}
        onCloseSuccessModal={handleCloseModal}
        onCloseActivationMessage={handleCloseActivationMessage}
      />
    </div>
  );
};

export default Dashboard;
