
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import NotificationBell from "@/components/NotificationBell";

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) {
      return "Good Morning";
    } else if (hour < 17) {
      return "Good Afternoon";
    } else {
      return "Good Evening";
    }
  };

  const getFirstName = () => {
    if (!user?.firstName) return "User";
    // Take only the first word of the firstName
    return user.firstName.split(' ')[0];
  };

  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-lg font-semibold text-gray-800">
            {getGreeting()}, {getFirstName()}
          </h1>
        </div>
        <NotificationBell />
      </div>
    </div>
  );
};

export default DashboardHeader;
