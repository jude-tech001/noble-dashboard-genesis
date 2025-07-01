
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";

const SignupStep1: React.FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const navigate = useNavigate();

  const validateFirstName = (name: string): boolean => {
    if (!name.trim()) {
      setFirstNameError("First name is required");
      return false;
    }
    
    if (name.trim().length < 2) {
      setFirstNameError("First name must be at least 2 characters");
      return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setFirstNameError("First name should contain only letters");
      return false;
    }
    
    setFirstNameError("");
    return true;
  };
  
  const validateLastName = (name: string): boolean => {
    if (!name.trim()) {
      setLastNameError("Last name is required");
      return false;
    }
    
    if (name.trim().length < 2) {
      setLastNameError("Last name must be at least 2 characters");
      return false;
    }
    
    if (!/^[a-zA-Z\s]+$/.test(name)) {
      setLastNameError("Last name should contain only letters");
      return false;
    }
    
    setLastNameError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isFirstNameValid = validateFirstName(firstName);
    const isLastNameValid = validateLastName(lastName);
    
    if (!isFirstNameValid || !isLastNameValid) {
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
              onChange={(e) => {
                setFirstName(e.target.value);
                if (firstNameError) validateFirstName(e.target.value);
              }}
              className={`noble-input ${firstNameError ? "border-red-500" : ""}`}
              placeholder="Enter your first name"
              required
            />
            {firstNameError && <p className="text-red-500 text-sm mt-1">{firstNameError}</p>}
          </div>
          
          <div>
            <label htmlFor="lastName" className="block text-gray-600 mb-2">
              Last name
            </label>
            <input
              id="lastName"
              type="text"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                if (lastNameError) validateLastName(e.target.value);
              }}
              className={`noble-input ${lastNameError ? "border-red-500" : ""}`}
              placeholder="Enter your last name"
              required
            />
            {lastNameError && <p className="text-red-500 text-sm mt-1">{lastNameError}</p>}
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
