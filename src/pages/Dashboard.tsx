
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Eye, EyeOff, Copy } from "lucide-react";
import { toast } from "sonner";
import DashboardModals from "@/components/DashboardModals";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, updateUserInfo, logout } = useAuth();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showActivationMessage, setShowActivationMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hideBalance, setHideBalance] = useState(false);
  
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

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good morning";
    } else if (hour < 17) {
      return "Good afternoon";
    } else {
      return "Good evening";
    }
  };

  const getFirstName = () => {
    if (!user?.firstName) return "User";
    return user.firstName.split(' ')[0];
  };

  const formattedBalance = new Intl.NumberFormat().format(user.balance);

  const handleGiftClick = () => {
    if (!isProcessing) {
      setIsProcessing(true);
      
      setTimeout(() => {
        updateUserInfo({ balance: user.balance + 150000 });
        setGiftClaimed(true);
        localStorage.setItem("rewardClaimed", "true");
        setLastClaimTime(Date.now());
        localStorage.setItem("lastClaimTime", Date.now().toString());
        setIsProcessing(false);
        setShowSuccessModal(true);
      }, 4000);
    }
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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("NOVA ID copied to clipboard!");
  };

  const handleMenuAction = (action: string) => {
    if (action === "withdraw") {
      navigate("/withdraw");
    } else if (action === "addFund") {
      navigate("/fund-wallet");
    } else if (action === "buyAirtime" || action === "buyData") {
      setShowActivationMessage(true);
    } else if (action === "activateAccount") {
      navigate("/activate-account");
    }
  };

  const handleDownloadApp = () => {
    window.open("https://median.co/share/djkaar#apk", "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center mr-3">
              <span className="text-white text-lg">👤</span>
            </div>
            <div>
              <h1 className="text-lg font-medium text-gray-800">{getGreeting()}</h1>
              <p className="text-sm text-gray-600">Hello!</p>
              <p className="text-lg font-medium text-green-600">{getFirstName()}</p>
            </div>
          </div>
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <span className="text-lg">🎧</span>
          </div>
        </div>
      </div>

      <div className="px-4 pb-4 space-y-4">
        {/* Balance Card */}
        <div className="bg-green-800 rounded-lg p-4 text-white relative">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium mb-2">Available Balance</p>
              <h2 className="text-3xl font-bold flex items-center">
                ₦{hideBalance ? "•••••" : formattedBalance}
              </h2>
            </div>
            <div className="flex flex-col items-end">
              <div className="bg-green-600 px-3 py-1 rounded-full mb-2">
                <p className="text-xs">
                  {user.isActivated ? "Account Activated" : "Account Not Activated"}
                </p>
              </div>
              <div className="text-xs text-green-200">067584</div>
              <button
                onClick={() => setHideBalance(!hideBalance)}
                className="text-white mt-2"
              >
                {hideBalance ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Gift Box */}
        {!giftClaimed && (
          <div className="flex justify-center">
            <button
              onClick={handleGiftClick}
              className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="animate-spin w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full"></div>
              ) : (
                <span className="text-2xl">🎁</span>
              )}
            </button>
          </div>
        )}

        {/* Withdraw Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => navigate("/withdraw")}
            className="bg-green-800 text-white px-8 py-3 rounded-full font-medium"
          >
            Withdraw
          </button>
        </div>

        {/* NOVA ID Card */}
        <div className="bg-green-100 rounded-lg p-4 cursor-pointer" onClick={() => copyToClipboard(user.id || "4jnkgsnou8expw2q4390")}>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-green-600 rounded mr-3 flex items-center justify-center">
                <span className="text-white text-xs">🔑</span>
              </div>
              <span className="font-medium text-green-800">NOVA ID</span>
            </div>
            <Copy size={20} className="text-green-600" />
          </div>
          <p className="text-gray-700 mt-2 text-sm">{user.id || "4jnkgsnou8expw2q4390"}</p>
        </div>

        {/* Top Service's */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-3">Top Service's</h2>
        </div>

        {/* Quick Menu */}
        <div>
          <h2 className="text-lg font-medium text-gray-700 mb-4">Quick Menu</h2>
          
          <div className="grid grid-cols-3 gap-4 mb-6">
            <button 
              onClick={() => handleMenuAction("buyAirtime")}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-lg">📱</span>
              </div>
              <span className="text-sm text-gray-600">Buy Airtime</span>
            </button>
            
            <button 
              onClick={() => handleMenuAction("buyData")}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-lg">📊</span>
              </div>
              <span className="text-sm text-gray-600">Buy Data</span>
            </button>
            
            <button 
              onClick={() => handleMenuAction("addFund")}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-lg">💰</span>
              </div>
              <span className="text-sm text-gray-600">Add fund</span>
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-lg">📋</span>
              </div>
              <span className="text-sm text-gray-600">Transactions</span>
            </button>
            
            <button className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm">
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <span className="text-lg">🔄</span>
              </div>
              <span className="text-sm text-gray-600">Transfer</span>
            </button>
            
            <button 
              onClick={handleLogout}
              className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm"
            >
              <div className="w-8 h-8 bg-gray-200 rounded mb-2 flex items-center justify-center">
                <LogOut size={16} className="text-gray-600" />
              </div>
              <span className="text-sm text-gray-600">Log out</span>
            </button>
          </div>
        </div>
      </div>

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
