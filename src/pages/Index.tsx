
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Welcome from "./Welcome";

const Index: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  // If user is authenticated, don't render anything while redirecting
  if (isAuthenticated) {
    return null;
  }

  // If not authenticated, show the welcome page
  return <Welcome />;
};

export default Index;
