import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  isActivated: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (firstName: string, lastName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUserInfo: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is logged in on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("noble_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Update localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("noble_user", JSON.stringify(user));
    }
  }, [user]);

  const signup = async (firstName: string, lastName: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const existingUserData = localStorage.getItem(`user_account_${email}`);
      
      if (existingUserData) {
        // User already exists, redirect to login
        toast.error("Account already exists. Please login instead.");
        navigate("/login");
        return;
      }
      
      // Check if we have a saved balance for this email
      const savedUserData = localStorage.getItem(`user_data_${email}`);
      let balance = 0;
      
      if (savedUserData) {
        const parsedData = JSON.parse(savedUserData);
        balance = parsedData.balance || 0;
      }
      
      const newUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        firstName,
        lastName,
        email,
        balance,
        isActivated: false
      };
      
      // Save user account info
      localStorage.setItem(`user_account_${email}`, JSON.stringify({
        firstName,
        lastName,
        email,
        password,
        id: newUser.id
      }));
      
      setUser(newUser);
      toast.success("Account created successfully!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Failed to create account.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user account exists
      const existingUserData = localStorage.getItem(`user_account_${email}`);
      
      if (!existingUserData) {
        throw new Error("User not found");
      }
      
      const userData = JSON.parse(existingUserData);
      
      // Verify password
      if (userData.password !== password) {
        throw new Error("Invalid password");
      }
      
      // Check if we have saved balance and other data
      const savedUserData = localStorage.getItem(`user_data_${email}`);
      let balance = 0;
      const rewardClaimed = localStorage.getItem("rewardClaimed") === "true";
      
      // If reward was claimed previously, set balance to reward amount
      if (rewardClaimed) {
        balance = savedUserData ? JSON.parse(savedUserData).balance || 150000 : 150000;
      } else if (savedUserData) {
        balance = JSON.parse(savedUserData).balance || 0;
      }
      
      const loggedInUser: User = {
        id: userData.id,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        balance,
        isActivated: savedUserData ? JSON.parse(savedUserData).isActivated || false : false
      };
      
      setUser(loggedInUser);
      toast.success("Logged in successfully!");
      navigate("/dashboard");
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Save user data before logout to preserve balance
    if (user) {
      localStorage.setItem(`user_data_${user.email}`, JSON.stringify({
        balance: user.balance,
        isActivated: user.isActivated
      }));
    }
    
    // Don't remove rewardClaimed flag or user data
    localStorage.removeItem("noble_user");
    setUser(null);
    navigate("/");
    toast.success("Logged out successfully!");
  };

  const updateUserInfo = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      
      // Save updated balance and other user data
      localStorage.setItem(`user_data_${user.email}`, JSON.stringify({
        balance: updatedUser.balance,
        isActivated: updatedUser.isActivated
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
        updateUserInfo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
