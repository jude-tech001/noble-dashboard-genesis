
import React from "react";
import { Users, MessageSquare } from "lucide-react";

interface GroupChannel {
  id: string;
  name: string;
  members: number;
  description: string;
  link: string;
}

const groupChannels: GroupChannel[] = [
  {
    id: "gc-001",
    name: "Noble Earn Official",
    members: 2548,
    description: "Official channel for announcements and updates",
    link: "https://t.me/nobleearn"
  },
  {
    id: "gc-002",
    name: "Earning Tips & Tricks",
    members: 1255,
    description: "Share your earning tips and get advice",
    link: "https://t.me/nobleearntips"
  },
  {
    id: "gc-003",
    name: "Payment Support",
    members: 934,
    description: "Get help with payment issues",
    link: "https://t.me/nobleearnsupport"
  }
];

const GroupChannels: React.FC = () => {
  const handleJoinGroup = (link: string) => {
    window.open(link, "_blank");
  };
  
  return (
    <div className="mt-6">
      <h2 className="text-xl font-semibold mb-4">Group Channels</h2>
      
      <div className="space-y-4">
        {groupChannels.map((channel) => (
          <div key={channel.id} className="bg-white p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                  <Users size={18} className="text-green-600" />
                </div>
                <div className="ml-3">
                  <p className="font-medium">{channel.name}</p>
                  <p className="text-xs text-gray-500">{channel.members.toLocaleString()} members</p>
                </div>
              </div>
              <button 
                onClick={() => handleJoinGroup(channel.link)}
                className="bg-green-700 text-white px-4 py-1 rounded-full text-sm"
              >
                Join
              </button>
            </div>
            <p className="text-sm text-gray-600 mt-2">{channel.description}</p>
          </div>
        ))}
      </div>
      
      <div className="text-center mt-4">
        <button className="text-green-700 font-medium">
          View All Channels
        </button>
      </div>
    </div>
  );
};

export default GroupChannels;
