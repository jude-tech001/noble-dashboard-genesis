
import React from "react";
import { Users, MessageSquare, UserCheck } from "lucide-react";
import { toast } from "sonner";
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
    <div className="mt-6 bg-white rounded-lg p-6 mx-4">
      {/* NOVA ID Section */}
      <div className="bg-green-50 rounded-lg p-4 cursor-pointer hover:bg-green-100 transition-colors mb-6" onClick={copyNovaId}>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <svg 
              className="w-6 h-6 text-green-800 mr-3"
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
            <span className="font-semibold text-green-800 text-lg">NOVA ID</span>
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
        <p className="text-gray-700 mt-2 font-medium">{user?.id || "33966608mlfp8gbwes4y"}</p>
        <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
      </div>

      <h2 className="text-xl font-semibold mb-6">Quick Menu</h2>
      
      {/* Quick Menu Grid - 2x3 layout */}
      <div className="grid grid-cols-3 gap-6">
        {/* Row 1 */}
        <button
          onClick={() => onMenuAction("buyAirtime")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <circle cx="12" cy="12" r="2" />
              <path d="M12 8v1" />
              <path d="M12 15v1" />
              <path d="M16 12h-1" />
              <path d="M9 12H8" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">Buy Airtime</span>
        </button>
        
        <button
          onClick={() => onMenuAction("buyData")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <line x1="6" y1="8" x2="6" y2="8" />
              <line x1="10" y1="8" x2="18" y2="8" />
              <line x1="6" y1="12" x2="6" y2="12" />
              <line x1="10" y1="12" x2="18" y2="12" />
              <line x1="6" y1="16" x2="6" y2="16" />
              <line x1="10" y1="16" x2="18" y2="16" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">Buy Data</span>
        </button>
        
        <button
          onClick={() => onMenuAction("addFund")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M12 8v8" />
              <path d="M8 12h8" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">Buy Code</span>
        </button>

        {/* Row 2 */}
        <button
          onClick={() => onMenuAction("transactions")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <line x1="6" y1="8" x2="18" y2="8" />
              <line x1="6" y1="12" x2="18" y2="12" />
              <line x1="6" y1="16" x2="12" y2="16" />
            </svg>
          </div>
          <span className="text-gray-700 font-medium">Transactions</span>
        </button>
        
        <button
          onClick={() => onMenuAction("groups")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <Users size={32} />
          </div>
          <span className="text-gray-700 font-medium">Groups</span>
        </button>
        
        <button
          onClick={() => onMenuAction("support")}
          className="flex flex-col items-center p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <div className="w-16 h-16 flex items-center justify-center rounded-lg bg-gray-200 text-gray-600 mb-3">
            <MessageSquare size={32} />
          </div>
          <span className="text-gray-700 font-medium">Support</span>
        </button>
      </div>
    </div>
  );
};

export default DashboardQuickMenu;
