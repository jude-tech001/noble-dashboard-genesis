
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Send, User } from "lucide-react";
import { toast } from "sonner";

interface Message {
  id: number;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
}

const LiveChat: React.FC = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      content: "Hello! Welcome to Noble Earn support. How can I assist you today?",
      sender: "assistant",
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleBack = () => {
    navigate(-1);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      content: message,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setMessage("");
    setIsTyping(true);

    // Simulate AI response after a delay
    setTimeout(() => {
      const response = generateResponse(message.trim().toLowerCase());
      const assistantMessage: Message = {
        id: messages.length + 2,
        content: response,
        sender: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    // FAQ responses
    if (query.includes("activation code") || query.includes("how to get code")) {
      return "To get an activation code, you need to make a payment of ₦6,200 via bank transfer or Flutterwave. After payment is confirmed, you'll receive your activation code.";
    }
    
    if (query.includes("withdraw") || query.includes("how to withdraw")) {
      return "To withdraw funds, go to the Dashboard, click on 'Withdraw', enter your bank details, and you'll need to enter your activation code to complete the withdrawal.";
    }
    
    if (query.includes("fund") || query.includes("payment") || query.includes("deposit")) {
      return "You can fund your wallet by clicking on 'Buy Code' from the dashboard, then choose between Card payment, Bank Transfer, or Flutterwave.";
    }
    
    if (query.includes("account") || query.includes("sign up") || query.includes("register")) {
      return "To create an account, click on 'Sign Up' from the welcome page, enter your details across the two steps, and ensure all information is accurate before submission.";
    }
    
    if (query.includes("bonus") || query.includes("claim bonus")) {
      return "You can claim your bonus every 48 hours by visiting the Dashboard and clicking on the 'Claim' button.";
    }
    
    if (query.includes("contact") || query.includes("support")) {
      return "You can reach us via email at nobleearn001@gmail.com or through this live chat during business hours (9am-5pm weekdays).";
    }
    
    if (query.includes("bank details") || query.includes("account number")) {
      return "Our bank details for payment are: NOVA BANK, Account Number: 1703005963, Account Name: JUDE SAMUEL.";
    }
    
    // Default response for unknown queries
    return "I'm not sure about that. For specific assistance, please contact us via email at nobleearn001@gmail.com or ask another question.";
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center p-4 border-b">
        <button onClick={handleBack} className="mr-3">
          <ArrowLeft size={20} className="text-black" />
        </button>
        <h1 className="text-lg font-medium">Live Support</h1>
      </div>

      {/* Chat messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div 
                className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
                  msg.sender === "user" 
                    ? "bg-green-800 text-white" 
                    : "bg-white text-gray-800"
                }`}
              >
                {msg.content}
                <div 
                  className={`text-xs mt-1 ${
                    msg.sender === "user" ? "text-green-100" : "text-gray-500"
                  }`}
                >
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white p-4 rounded-lg shadow-sm max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message input */}
      <div className="p-4 border-t">
        <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-transparent outline-none"
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button 
            onClick={handleSendMessage}
            disabled={message.trim() === "" || isTyping}
            className="ml-2 text-green-800 disabled:text-gray-400"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
