
import React from "react";
import { Users, MessageSquare, UserCheck, Download } from "lucide-react";
import QuickMenuButton from "@/components/QuickMenuButton";

interface DashboardQuickMenuProps {
  onMenuAction: (action: string) => void;
}

const DashboardQuickMenu: React.FC<DashboardQuickMenuProps> = ({ onMenuAction }) => {
  const handleDownloadApp = () => {
    window.open("https://median.co/share/djkaar#apk", "_blank");
  };

  return (
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
          icon={<MessageSquare size={24} />}
          label="Support"
          onClick={() => onMenuAction("support")}
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
          icon={<Download size={24} />}
          label="Download App"
          onClick={handleDownloadApp}
        />
      </div>
    </div>
  );
};

export default DashboardQuickMenu;
