import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import BackButton from "@/components/BackButton";
import PasswordInput from "@/components/PasswordInput";
import { toast } from "sonner";

const SignupStep2: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [moneyItems, setMoneyItems] = useState<Array<{ id: number; left: number; delay: number; emoji: string }>>([]);
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

  // Create continuous falling money effect
  useEffect(() => {
    const moneyEmojis = ['💰', '💵', '💴', '💶', '💷', '🪙', '💸'];
    
    const createMoneyItem = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      delay: Math.random() * 5,
      emoji: moneyEmojis[Math.floor(Math.random() * moneyEmojis.length)]
    });

    // Create initial money items
    const initialItems = Array.from({ length: 20 }, createMoneyItem);
    setMoneyItems(initialItems);

    // Continuously add new money items
    const interval = setInterval(() => {
      setMoneyItems(prev => {
        const newItems = Array.from({ length: 3 }, createMoneyItem);
        return [...prev.slice(-17), ...newItems];
      });
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Get stored data from previous step
    const storedFirstName = sessionStorage.getItem("signup_firstName");
    const storedLastName = sessionStorage.getItem("signup_lastName");
    
    if (!storedFirstName || !storedLastName) {
      // If data is missing, go back to step 1
      navigate("/signup/step1");
      return;
    }
    
    setFirstName(storedFirstName);
    setLastName(storedLastName);
  }, [navigate]);

  function validateEmail(email: string): boolean {
    if (!email) {
      setEmailError("Email is required");
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address");
      return false;
    }
    
    setEmailError("");
    return true;
  }
  
  function validatePassword(password: string): boolean {
    if (!password) {
      setPasswordError("Password is required");
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    
    if (!/\d/.test(password)) {
      setPasswordError("Password must contain at least one number");
      return false;
    }
    
    setPasswordError("");
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    
    try {
      await signup(firstName, lastName, email, password);
      
      // Clear session storage after successful signup
      sessionStorage.removeItem("signup_firstName");
      sessionStorage.removeItem("signup_lastName");
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  return (
    <div className="min-h-screen bg-white px-4 relative overflow-hidden">
      {/* Enhanced Falling Money Effect */}
      {moneyItems.map((item) => (
        <div
          key={item.id}
          className="absolute text-3xl pointer-events-none money-falling"
          style={{
            left: `${item.left}%`,
            animationDelay: `${item.delay}s`,
            top: '-100px',
            zIndex: 1,
          }}
        >
          {item.emoji}
        </div>
      ))}
      
      <div className="pt-10 relative z-10">
        <BackButton to="/signup/step1" />
      </div>
      
      <div className="mt-14 relative z-10">
        <h1 className="text-3xl font-bold mb-1">Good job!,</h1>
        <h2 className="text-3xl font-bold">You are almost done.</h2>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-600 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (emailError) validateEmail(e.target.value);
              }}
              className={`noble-input ${emailError ? "border-red-500" : ""}`}
              placeholder="Enter your email"
              required
            />
            {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
          </div>
          
          <div>
            <label htmlFor="password" className="block text-gray-600 mb-2">
              Password
            </label>
            <PasswordInput
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) validatePassword(e.target.value);
              }}
              placeholder="Create a password"
              className={passwordError ? "border-red-500" : ""}
            />
            {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
          </div>
          
          <button 
            type="submit" 
            className="noble-button mt-10"
            disabled={isLoading}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupStep2;
