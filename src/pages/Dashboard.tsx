import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Download, LogOut } from "lucide-react";
import BalanceCard from "@/components/BalanceCard";
import NovaIdCard from "@/components/NovaIdCard";
import DashboardHeader from "@/components/DashboardHeader";
import GiftBox from "@/components/GiftBox";
import DashboardQuickMenu from "@/components/DashboardQuickMenu";
import DashboardTabs from "@/components/DashboardTabs";
import DashboardModals from "@/components/DashboardModals";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, updateUserInfo, logout } = useAuth();
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

  // Check if user has made any withdrawals
  const [hasWithdrawn, setHasWithdrawn] = useState(() => {
    return localStorage.getItem("hasWithdrawn") === "true";
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
    } else if (action === "activateAccount") {
      navigate("/activate-account");
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
        updateUserInfo({ balance: user.balance + 150000 });
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

  const handleDownloadApp = () => {
    window.open("https://median.co/share/djkaar#apk", "_blank");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseActivationMessage = () => {
    setShowActivationMessage(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-6">
      <div className="px-4 py-4 bg-white">
        <DashboardHeader />
      </div>

      <DashboardTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      >
        <div className="space-y-4">
          <BalanceCard balance={user.balance} isActivated={user.isActivated} />
          
          <GiftBox
            giftClaimed={giftClaimed}
            isProcessing={isProcessing}
            lastClaimTime={lastClaimTime}
            hasWithdrawn={true}
            onGiftClick={handleGiftClick}
          />

          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => navigate("/withdraw")}
              className="bg-green-800 text-white px-6 py-2 rounded-full font-medium text-sm"
            >
              Withdraw
            </button>
            <button 
              onClick={() => navigate("/activate-account")}
              className="bg-green-800 text-white px-6 py-2 rounded-full font-medium text-sm"
            >
              Activate
            </button>
          </div>

          <div className="mt-4">
            <NovaIdCard id={user.id || "33966608mlfp8gbwes4y"} />
          </div>

          <DashboardQuickMenu onMenuAction={handleMenuAction} />
          
          {/* Logout Button - Positioned below quick menu */}
          <div className="flex justify-center mt-6">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors px-4 py-2 rounded-lg border border-gray-300"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
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
