
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#B5D9B6] px-4 flex flex-col">
      <div className="pt-16 px-4">
        <Logo />
        
        <h1 className="text-3xl font-bold text-[#1A2342] mt-5">NOVA BANKING</h1>
        
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-[#1A2342]">NOVA BANKING,</h2>
          <h2 className="text-3xl font-bold text-[#1A2342] mb-6">Suitable for all purposes.</h2>
          
          <div className="space-y-1 text-[#1A2342] text-lg">
            <p>Buy Airtime,</p>
            <p>Buy Data Plan,</p>
            <p>Transfer to other Bank.</p>
          </div>
        </div>
      </div>
      
      {/* Money bills illustration */}
      <div className="flex-1 relative mt-10">
        <div className="absolute inset-0">
          <div className="relative h-full">
            {/* Random positioned money bills */}
            <div className="absolute top-[10%] right-[20%] w-16 h-8 bg-[#4CAF50] rounded-sm transform rotate-12 opacity-80"></div>
            <div className="absolute top-[20%] left-[30%] w-12 h-6 bg-[#4CAF50] rounded-sm transform -rotate-45 opacity-70"></div>
            <div className="absolute top-[40%] right-[30%] w-14 h-7 bg-[#4CAF50] rounded-sm transform rotate-30 opacity-80"></div>
            <div className="absolute top-[50%] left-[20%] w-10 h-5 bg-[#4CAF50] rounded-sm transform -rotate-20 opacity-70"></div>
            <div className="absolute top-[60%] right-[40%] w-16 h-8 bg-[#4CAF50] rounded-sm transform rotate-15 opacity-90"></div>
            <div className="absolute top-[70%] left-[45%] w-20 h-10 bg-[#4CAF50] rounded-sm transform -rotate-10 opacity-75"></div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="w-full px-12 mb-6">
        <div className="h-2 w-full bg-[#1A2342]/20 rounded-full">
          <div className="h-2 bg-[#1B5E20] rounded-full w-[40%]"></div>
        </div>
      </div>
      
      {/* Buttons */}
      <div className="mb-16 px-6 space-y-4">
        <Link to="/signup/step1" className="block w-full">
          <button className="w-full py-3.5 px-4 rounded-lg font-medium bg-[#1B5E20] text-white text-lg">
            Register
          </button>
        </Link>
        
        <Link to="/login" className="block w-full">
          <button className="w-full py-3.5 px-4 rounded-lg font-medium border border-[#1B5E20] text-[#1B5E20] bg-white text-lg">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
