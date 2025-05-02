
import React from "react";
import { Mail, MessageSquare } from "lucide-react";

const SupportContact: React.FC = () => {
  const handleContactSupport = () => {
    window.location.href = "mailto:nobleearn001@gmail.com";
  };
  
  const handleOpenChat = () => {
    // In a real app, this would open a chat interface
    alert("Chat support feature coming soon!");
  };
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Contact Support</h2>
      
      <div className="space-y-4">
        <div 
          className="bg-white p-4 rounded-lg shadow-sm flex items-center cursor-pointer"
          onClick={handleContactSupport}
        >
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Mail size={18} className="text-blue-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">Email Support</p>
            <p className="text-sm text-gray-500">nobleearn001@gmail.com</p>
          </div>
        </div>
        
        <div 
          className="bg-white p-4 rounded-lg shadow-sm flex items-center cursor-pointer"
          onClick={handleOpenChat}
        >
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <MessageSquare size={18} className="text-green-600" />
          </div>
          <div className="ml-4">
            <p className="font-medium">Live Chat</p>
            <p className="text-sm text-gray-500">Available 9am - 5pm on weekdays</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportContact;
