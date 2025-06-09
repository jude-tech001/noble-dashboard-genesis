
import React from "react";
import { toast } from "sonner";

interface NovaIdCardProps {
  id: string;
}

const NovaIdCard: React.FC<NovaIdCardProps> = ({ id }) => {
  const copyToClipboard = () => {
    navigator.clipboard.writeText(id);
    toast.success("NOVA ID copied to clipboard!");
  };

  return (
    <div className="bg-gray-50 rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={copyToClipboard}>
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
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
            <polyline points="10,17 15,12 10,7" />
            <line x1="15" y1="12" x2="3" y2="12" />
          </svg>
          <span className="font-medium text-gray-800">NOVA ID</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(); }} className="text-green-800">
          <svg 
            className="w-5 h-5" 
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
      <p className="text-gray-700 mt-2 text-sm font-mono">{id}</p>
      <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
    </div>
  );
};

export default NovaIdCard;
