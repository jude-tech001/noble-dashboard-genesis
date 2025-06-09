
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  React.useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // User is logged in, redirect to dashboard
        navigate("/dashboard");
      } else {
        // User is not logged in, redirect to welcome page
        navigate("/");
      }
    }
  }, [isAuthenticated, isLoading, navigate]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-green-800 border-t-transparent rounded-full animate-spin mb-4 mx-auto"></div>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return null;
};

export default Index;
