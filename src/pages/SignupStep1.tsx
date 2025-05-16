
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";

const SignupStep1: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!firstName.trim() || !lastName.trim()) {
      return;
    }
    
    // Store in session storage to persist across steps
    sessionStorage.setItem("signup_firstName", firstName);
    sessionStorage.setItem("signup_lastName", lastName);
    
    // Navigate to the next step
    navigate("/signup/step2");
  };

  return (
    <div className="min-h-screen bg-white px-4">
      <div className="pt-10">
        <BackButton to="/" />
      </div>
      
      <div className="mt-14">
        <h1 className="text-3xl font-bold mb-1">Hi! Welcome</h1>
        <h2 className="text-3xl font-bold">Signup</h2>
        
        <form onSubmit={handleSubmit} className="mt-10 space-y-6">
          <div>
            <label htmlFor="firstName" className="block text-gray-600 mb-2">
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="noble-input"
              placeholder="Enter your first name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-gray-600 mb-2">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="noble-input"
              placeholder="Enter your last name"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="noble-button mt-10"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignupStep1;
