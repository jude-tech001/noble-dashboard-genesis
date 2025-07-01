
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
  const navigate = useNavigate();
  const { signup, isLoading } = useAuth();

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
    <div className="min-h-screen bg-white px-4">
      <div className="pt-10">
        <BackButton to="/signup/step1" />
      </div>
      
      <div className="mt-14">
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
