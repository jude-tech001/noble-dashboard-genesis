
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Gift } from "lucide-react";
import { toast } from "sonner";
import Logo from "@/components/Logo";
import BalanceCard from "@/components/BalanceCard";
import NovaIdCard from "@/components/NovaIdCard";
import QuickMenuButton from "@/components/QuickMenuButton";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Dashboard: React.FC = () => {
  const { user, isAuthenticated, logout, updateUserInfo } = useAuth();
  const navigate = useNavigate();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [giftClaimed, setGiftClaimed] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null;
  }

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "morning";
    if (hour < 18) return "afternoon";
    return "evening";
  };

  const handleMenuAction = (action: string) => {
    // In a real app, these would navigate to specific pages or trigger actions
    console.log(`Action triggered: ${action}`);
  };

  const handleGiftClick = () => {
    if (!giftClaimed) {
      // Update user's balance
      updateUserInfo({ balance: 150000 });
      setGiftClaimed(true);
      setShowSuccessModal(true);
    } else {
      toast.error("Gift already claimed!");
    }
  };

  const handleCloseModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <div className="min-h-screen bg-white pb-8">
      <div className="px-4 py-6">
        <div className="flex justify-between items-center">
          <Logo />
          <h1 className="text-2xl font-bold">
            Good {getTimeOfDay()}
          </h1>
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

        <div className="mt-8">
          <p className="text-lg mb-1">Hello!</p>
          <p className="text-xl text-noble font-semibold">
            {user.firstName}
          </p>
        </div>

        <div className="mt-6">
          <BalanceCard balance={user.balance} isActivated={user.isActivated} />
        </div>

        <div className="mt-10">
          <div className="flex justify-center">
            {/* Gift Box Button */}
            <button 
              onClick={handleGiftClick}
              className="w-14 h-14 rounded-full bg-purple-100 flex items-center justify-center relative"
              disabled={giftClaimed}
            >
              <Gift 
                size={28} 
                className={`text-purple-600 ${giftClaimed ? 'opacity-50' : 'animate-pulse'}`}
              />
              {!giftClaimed && (
                <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                  <span className="text-white text-xs font-bold">1</span>
                </div>
              )}
            </button>
          </div>

          <div className="mt-4 flex justify-center">
            <button className="bg-noble text-white px-8 py-3 rounded-full font-medium">
              Withdraw
            </button>
          </div>
        </div>

        <div className="mt-10">
          <NovaIdCard id={user.id || "33966608mlfp8gbwes4y"} />
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold">Top Service's</h2>
        </div>

        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-6">Quick Menu</h2>
          
          <div className="grid grid-cols-3 gap-6">
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
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10z" />
                  <polyline points="9 22 9 17 15 17 15 22" />
                </svg>
              }
              label="Transfer"
              onClick={() => handleMenuAction("transfer")}
            />
            
            <QuickMenuButton
              icon={
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              }
              label="Log out"
              onClick={logout}
            />
          </div>
        </div>
      </div>

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
              className="bg-noble text-white px-12 py-3 rounded-md font-medium w-full"
            >
              OKAY
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Dashboard;
