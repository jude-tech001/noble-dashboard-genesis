
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
    <div className="bg-noble-light rounded-lg p-4 cursor-pointer hover:bg-gray-100 transition-colors" onClick={copyToClipboard}>
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <svg 
            className="w-6 h-6 text-noble mr-2"
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
          <span className="font-medium text-noble">NOVA ID</span>
        </div>
        <button onClick={(e) => { e.stopPropagation(); copyToClipboard(); }} className="text-noble">
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
      <p className="text-gray-700 mt-2 text-sm">{id}</p>
      <p className="text-xs text-gray-500 mt-1">Tap to copy</p>
    </div>
  );
};

export default NovaIdCard;
