
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Gift, ArrowLeft, ArrowRight, Users, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import BalanceCard from "@/components/BalanceCard";
import NovaIdCard from "@/components/NovaIdCard";
import QuickMenuButton from "@/components/QuickMenuButton";
import TransactionHistory from "@/components/TransactionHistory";
import GroupChannels from "@/components/GroupChannels";
import SupportContact from "@/components/SupportContact";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showActivationMessage, setShowActivationMessage] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if reward was already claimed (stored in localStorage)
  const [giftClaimed, setGiftClaimed] = useState(() => {
    return localStorage.getItem("rewardClaimed") === "true";
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
    
    // Check if this is a new user session and they have a previous balance
    if (user && user.balance === 150000) {
      // They already have the reward amount, mark as claimed
      setGiftClaimed(true);
      localStorage.setItem("rewardClaimed", "true");
    }
  }, [isAuthenticated, navigate, user]);

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
    if (!giftClaimed && !isProcessing) {
      setIsProcessing(true);
      
      // Add a 4-second loading delay before adding balance
      setTimeout(() => {
        // Update user's balance
        updateUserInfo({ balance: 150000 });
        setGiftClaimed(true);
        localStorage.setItem("rewardClaimed", "true");
        setIsProcessing(false);
        setShowSuccessModal(true);
      }, 4000);
    } else if (giftClaimed) {
      toast.error("Gift already claimed!");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  const handleCloseActivationMessage = () => {
    setShowActivationMessage(false);
    navigate("/fund-wallet");
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-8">
      <div className="px-4 py-4 bg-white">
        <div className="flex justify-between items-center">
          <Logo />
          <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-gray-600"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
              <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
            </svg>
          </button>
        </div>
      </div>

      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <div className="px-4 sticky top-0 bg-white z-10 border-b">
          <TabsList className="w-full justify-between bg-transparent mt-1">
            <TabsTrigger 
              value="overview" 
              className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="groups" 
              className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
            >
              Groups
            </TabsTrigger>
            <TabsTrigger 
              value="support" 
              className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
            >
              Support
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="px-4 pb-16">
          <TabsContent value="overview" className="mt-4">
            <div>
              <BalanceCard balance={user.balance} isActivated={user.isActivated} />
              
              <div className="mt-6">
                <div className="flex justify-center">
                  {/* Gift Box Button */}
                  <button 
                    onClick={handleGiftClick}
                    className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center relative"
                    disabled={giftClaimed || isProcessing}
                  >
                    {isProcessing ? (
                      <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <Gift 
                        size={28} 
                        className={`text-purple-600 ${giftClaimed ? 'opacity-50' : 'animate-pulse'}`}
                      />
                    )}
                    {!giftClaimed && !isProcessing && (
                      <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">1</span>
                      </div>
                    )}
                  </button>
                </div>

                {giftClaimed && (
                  <div className="text-center mt-2 text-sm text-gray-500">
                    Reward already claimed
                  </div>
                )}

                <div className="mt-4 flex justify-center">
                  <button 
                    onClick={() => navigate("/withdraw")}
                    className="bg-green-800 text-white px-8 py-3 rounded-full font-medium"
                  >
                    Withdraw
                  </button>
                </div>
              </div>

              <div className="mt-6">
                <NovaIdCard id={user.id || "33966608mlfp8gbwes4y"} />
              </div>

              <div className="mt-6">
                <h2 className="text-xl font-semibold">Quick Menu</h2>
                
                <div className="grid grid-cols-3 gap-6 mt-4">
                  <QuickMenuButton
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <circle cx="12" cy="12" r="2" />
                        <path d="M12 8v1" />
                        <path d="M12 15v1" />
                        <path d="M16 12h-1" />
                        <path d="M9 12H8" />
                      </svg>
                    }
                    label="Buy Airtime"
                    onClick={() => handleMenuAction("buyAirtime")}
                  />
                  
                  <QuickMenuButton
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="6" y1="8" x2="6" y2="8" />
                        <line x1="10" y1="8" x2="18" y2="8" />
                        <line x1="6" y1="12" x2="6" y2="12" />
                        <line x1="10" y1="12" x2="18" y2="12" />
                        <line x1="6" y1="16" x2="6" y2="16" />
                        <line x1="10" y1="16" x2="18" y2="16" />
                      </svg>
                    }
                    label="Buy Data"
                    onClick={() => handleMenuAction("buyData")}
                  />
                  
                  <QuickMenuButton
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <path d="M12 8v8" />
                        <path d="M8 12h8" />
                      </svg>
                    }
                    label="Add Fund"
                    onClick={() => handleMenuAction("addFund")}
                  />
                  
                  <QuickMenuButton
                    icon={
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="4" width="20" height="16" rx="2" />
                        <line x1="6" y1="8" x2="18" y2="8" />
                        <line x1="6" y1="12" x2="18" y2="12" />
                        <line x1="6" y1="16" x2="12" y2="16" />
                      </svg>
                    }
                    label="Transactions"
                    onClick={() => handleMenuAction("transactions")}
                  />
                  
                  <QuickMenuButton
                    icon={<Users size={24} />}
                    label="Groups"
                    onClick={() => handleMenuAction("groups")}
                  />
                  
                  <QuickMenuButton
                    icon={<MessageSquare size={24} />}
                    label="Support"
                    onClick={() => handleMenuAction("support")}
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="transactions" className="mt-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setActiveTab("overview")} className="mr-2">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Transaction History</h2>
            </div>
            <TransactionHistory />
          </TabsContent>

          <TabsContent value="groups" className="mt-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setActiveTab("overview")} className="mr-2">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Group Channels</h2>
            </div>
            <GroupChannels />
          </TabsContent>

          <TabsContent value="support" className="mt-4">
            <div className="flex items-center mb-4">
              <button onClick={() => setActiveTab("overview")} className="mr-2">
                <ArrowLeft size={20} />
              </button>
              <h2 className="text-xl font-bold">Get Support</h2>
            </div>
            <SupportContact />
          </TabsContent>
        </div>
      </Tabs>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <DialogTitle className="text-xl">Good News! Earning Completed</DialogTitle>
            <div className="text-2xl font-bold mt-2">SUCCESS</div>
            <p className="text-center mt-2">Kindly Withdraw Fund to Your Bank</p>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleCloseModal} 
              className="bg-green-800 text-white px-12 py-3 rounded-md font-medium w-full"
            >
              OKAY
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Activation Required Modal */}
      <Dialog open={showActivationMessage} onOpenChange={setShowActivationMessage}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <DialogTitle className="text-xl">Activation Required</DialogTitle>
            <p className="text-center mt-4">Buy activation code to use this feature</p>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleCloseActivationMessage} 
              className="bg-green-800 text-white px-12 py-3 rounded-md font-medium w-full"
            >
              Buy Activation Code
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
