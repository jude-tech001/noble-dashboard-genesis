
import React from "react";
import Logo from "@/components/Logo";
import NotificationBell from "@/components/NotificationBell";

const DashboardHeader: React.FC = () => {
  return (
    <div className="px-4 py-4 bg-white">
      <div className="flex justify-between items-center">
        <Logo />
        <NotificationBell />
      </div>
    </div>
  );
};

export default DashboardHeader;
