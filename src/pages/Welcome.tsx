
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

// Define the MoneyEmoji component for the floating animation
const MoneyEmoji = ({ style }: { style: React.CSSProperties }) => {
  return (
    <img 
      src="/lovable-uploads/18c66619-3835-46ec-b486-fcb2d37a2386.png" 
      alt="Money emoji" 
      className="absolute"
      style={style}
    />
  );
};

const Welcome: React.FC = () => {
  const [moneyEmojis, setMoneyEmojis] = useState<React.CSSProperties[]>([]);
  
  useEffect(() => {
    // Create multiple money emojis with random positions
    const emojis: React.CSSProperties[] = [];
    
    for (let i = 0; i < 10; i++) {
      emojis.push({
        left: `${Math.random() * 80 + 10}%`,
        top: `${Math.random() * 30 + 40}%`,
        width: `${Math.random() * 30 + 30}px`,
        opacity: Math.random() * 0.5 + 0.5,
        transform: `rotate(${Math.random() * 360}deg)`,
        animation: `float ${Math.random() * 10 + 15}s linear infinite`,
        animationDelay: `${Math.random() * 5}s`
      });
    }
    
    setMoneyEmojis(emojis);
  }, []);

  return (
    <div className="min-h-screen bg-[#AED3AF] px-4 flex flex-col relative overflow-hidden">
      {/* Custom curved bottom shape */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-transparent" 
           style={{
             borderBottomLeftRadius: "50% 20%",
             borderBottomRightRadius: "50% 20%",
           }}>
      </div>
      
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
      
      {/* Money emojis container */}
      <div className="flex-1 relative mt-10">
        {moneyEmojis.map((style, index) => (
          <MoneyEmoji key={index} style={style} />
        ))}
      </div>
      
      {/* Progress bar */}
      <div className="w-full px-6 mb-6 z-10">
        <div className="h-2 w-full bg-[#1A2342]/20 rounded-full">
          <div className="h-2 bg-[#1B5E20] rounded-full w-[40%]"></div>
        </div>
      </div>
      
      {/* Buttons side by side */}
      <div className="mb-16 px-6 flex space-x-3 z-10">
        <Link to="/signup/step1" className="flex-1">
          <button className="w-full py-3.5 px-4 rounded-lg font-medium bg-[#1B5E20] text-white text-lg">
            Register
          </button>
        </Link>
        
        <Link to="/login" className="flex-1">
          <button className="w-full py-3.5 px-4 rounded-lg font-medium border border-[#1B5E20] text-[#1B5E20] bg-white text-lg">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
