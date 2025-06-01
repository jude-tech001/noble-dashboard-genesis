
import React from "react";
import { Users, MessageSquare, UserCheck } from "lucide-react";
import { toast } from "sonner";
import QuickMenuButton from "@/components/QuickMenuButton";
import { useAuth } from "@/contexts/AuthContext";

interface DashboardQuickMenuProps {
  onMenuAction: (action: string) => void;
}

const DashboardQuickMenu: React.FC<DashboardQuickMenuProps> = ({ onMenuAction }) => {
  const { user } = useAuth();

  const copyNovaId = () => {
    const novaId = user?.id || "33966608mlfp8gbwes4y";
    navigator.clipboard.writeText(novaId);
    toast.success("NOVA ID copied to clipboard!");
  };

  return (
    <div className="mt-6 bg-white rounded-lg p-4 mx-4">
      <h2 className="text-xl font-semibold mb-4">Quick Menu</h2>
      
      {/* NOVA ID Section - positioned like the old card */}
      <div className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors mb-6" onClick={copyNovaId}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              className="w-6 h-6 text-green-800 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="8" cy="15" r="4" />
              <path d="M10.5 11V5a2.5 2.5 0 0 1 5 0v2.5" />
              <path d="M16 9h2a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9.1a2 2 0 0 1-1.83-1.19" />
            </svg>
            <span className="font-medium text-green-800">NOVA ID</span>
          </div>
          <button onClick={(e) => { e.stopPropagation(); copyNovaId(); }} className="text-green-800">
            <svg 
              className="w-6 h-6" 
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
            </svg>
          </button>
        </div>
        <p className="text-gray-700 mt-2 text-sm">{user?.id || "33966608mlfp8gbwes4y"}</p>
        <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
      </div>
      
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
          onClick={() => onMenuAction("buyAirtime")}
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
          onClick={() => onMenuAction("buyData")}
        />
        
        <QuickMenuButton
          icon={
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          }
          label="Buy Code"
          onClick={() => onMenuAction("addFund")}
        />
        
        <QuickMenuButton
          icon={<UserCheck size={24} />}
          label="Activate Account"
          onClick={() => onMenuAction("activateAccount")}
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
          onClick={() => onMenuAction("transactions")}
        />
        
        <QuickMenuButton
          icon={<Users size={24} />}
          label="Groups"
          onClick={() => onMenuAction("groups")}
        />
        
        <QuickMenuButton
          icon={<MessageSquare size={24} />}
          label="Support"
          onClick={() => onMenuAction("support")}
        />
      </div>
    </div>
  );
};

export default DashboardQuickMenu;
