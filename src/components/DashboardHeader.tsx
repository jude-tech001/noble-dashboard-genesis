
import React from "react";
import Logo from "@/components/Logo";

const DashboardHeader: React.FC = () => {
  return (
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
  );
};

export default DashboardHeader;
