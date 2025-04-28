
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="flex items-center justify-center w-16 h-16 bg-purple-500 rounded-full">
      <svg 
        className="w-10 h-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
        <path d="M12 12 2.5 20.5" />
        <path d="M12 12 7 19.5" />
      </svg>
    </div>
  );
};

export default Logo;
