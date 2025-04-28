
import React from "react";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";

const Welcome: React.FC = () => {
  return (
    <div className="min-h-screen bg-white px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-md text-center">
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <h1 className="text-4xl font-bold mb-6">Noble Earn</h1>
        <p className="text-gray-600 mb-12">
          Welcome to Noble Earn. Start earning rewards today!
        </p>
        
        <div className="space-y-4">
          <Link to="/login" className="block w-full">
            <button className="noble-button">Login</button>
          </Link>
          
          <Link to="/signup/step1" className="block w-full">
            <button className="w-full py-3 px-4 rounded-md font-medium border border-noble text-noble bg-white transition-colors hover:bg-gray-50">
              Create an Account
            </button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Welcome;
