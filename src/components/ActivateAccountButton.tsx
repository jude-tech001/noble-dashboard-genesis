
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const ActivateAccountButton: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user?.isActivated) {
    return null; // Don't show if already activated
  }

  return (
    <div className="mt-4 flex justify-center">
      <button 
        onClick={() => navigate("/activate-account")}
        className="bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700"
      >
        Activate Account
      </button>
    </div>
  );
};

export default ActivateAccountButton;
