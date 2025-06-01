
import React from "react";
import { ArrowLeft } from "lucide-react";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import TransactionHistory from "@/components/TransactionHistory";
import GroupChannels from "@/components/GroupChannels";
import SupportContact from "@/components/SupportContact";

interface DashboardTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  children: React.ReactNode;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({
  activeTab,
  onTabChange,
  children
}) => {
  return (
    <Tabs
      defaultValue="overview"
      value={activeTab}
      onValueChange={onTabChange}
      className="w-full"
    >
      <div className="px-4 sticky top-0 bg-white z-10 border-b">
        <TabsList className="w-full justify-between bg-transparent mt-1">
          <TabsTrigger 
            value="overview" 
            className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
          >
            Transactions
          </TabsTrigger>
          <TabsTrigger 
            value="groups" 
            className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
          >
            Groups
          </TabsTrigger>
          <TabsTrigger 
            value="support" 
            className="flex-1 data-[state=active]:bg-green-50 data-[state=active]:text-green-800"
          >
            Support
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="px-4 pb-16">
        <TabsContent value="overview" className="mt-4">
          {children}
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <div className="flex items-center mb-4">
            <button onClick={() => onTabChange("overview")} className="mr-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Transaction History</h2>
          </div>
          <TransactionHistory />
        </TabsContent>

        <TabsContent value="groups" className="mt-4">
          <div className="flex items-center mb-4">
            <button onClick={() => onTabChange("overview")} className="mr-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Group Channels</h2>
          </div>
          <GroupChannels />
        </TabsContent>

        <TabsContent value="support" className="mt-4">
          <div className="flex items-center mb-4">
            <button onClick={() => onTabChange("overview")} className="mr-2">
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold">Get Support</h2>
          </div>
          <SupportContact />
        </TabsContent>
      </div>
    </Tabs>
  );
};

export default DashboardTabs;
