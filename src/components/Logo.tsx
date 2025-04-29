
import React from "react";

const Logo: React.FC = () => {
  return (
    <div className="w-16 h-16 flex items-center justify-center">
      <div className="w-14 h-14 bg-[#1A2342] flex items-center justify-center">
        <div className="w-10 h-10 relative">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-[#1A2342] transform -skew-x-12 z-10"></div>
          <div className="absolute bottom-0 left-0 w-full h-1/2 bg-[#1A2342] transform skew-x-12 z-10"></div>
          <div className="absolute top-1/4 left-0 w-full h-1/2 bg-[#F2FCE2] transform -skew-x-12 z-20"></div>
        </div>
      </div>
    </div>
  );
};

export default Logo;
