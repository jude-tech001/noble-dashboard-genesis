
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

const FlutterwavePayment: React.FC = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleBack = () => {
    navigate(-1);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!fullName.trim()) {
      toast.error("Please enter your full name");
      return;
    }
    
    if (!email.trim() || !email.includes('@')) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    setIsSubmitting(true);
    
    // Store user info for the confirmation page
    sessionStorage.setItem("flutterwave_user", JSON.stringify({ fullName, email }));
    
    // Navigate to confirmation page
    setTimeout(() => {
      navigate("/flutterwave-confirmation");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen bg-green-800 p-4">
      <div className="mb-8">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft size={24} className="text-white" />
          </button>
          <h1 className="text-3xl font-bold text-white">NOBLE EARN</h1>
        </div>
      </div>
      
      <Card className="bg-white rounded-3xl p-6 mt-8">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="text-2xl font-medium text-gray-600 block mb-2">
              Amount
            </label>
            <Input 
              type="text" 
              value="₦6,200" 
              disabled
              className="w-full p-4 text-xl border rounded-lg bg-gray-50"
            />
          </div>
          
          <div className="mb-6">
            <label className="text-2xl font-medium text-gray-600 block mb-2">
              Full Name
            </label>
            <Input 
              type="text"
              placeholder="Your full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full p-4 text-xl border rounded-lg"
              required
            />
          </div>
          
          <div className="mb-10">
            <label className="text-2xl font-medium text-gray-600 block mb-2">
              Your Email Address
            </label>
            <Input 
              type="email"
              placeholder="email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 text-xl border rounded-lg"
              required
            />
          </div>
          
          <button 
            type="submit"
            className="w-full bg-green-800 text-white text-xl py-4 rounded-lg font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Pay"}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default FlutterwavePayment;
