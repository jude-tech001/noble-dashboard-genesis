
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardModalsProps {
  showSuccessModal: boolean;
  showActivationMessage: boolean;
  onCloseSuccessModal: () => void;
  onCloseActivationMessage: () => void;
}

const DashboardModals: React.FC<DashboardModalsProps> = ({
  showSuccessModal,
  showActivationMessage,
  onCloseSuccessModal,
  onCloseActivationMessage
}) => {
  const navigate = useNavigate();

  const handleCloseActivationMessage = () => {
    onCloseActivationMessage();
    navigate("/activate-account");
  };

  return (
    <>
      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={onCloseSuccessModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
            </div>
            <DialogTitle className="text-xl">Good News! Earning Completed</DialogTitle>
            <div className="text-2xl font-bold mt-2">SUCCESS</div>
            <p className="text-center mt-2">Kindly Withdraw Fund to Your Bank</p>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button 
              onClick={onCloseSuccessModal} 
              className="bg-green-800 text-white px-12 py-3 rounded-md font-medium w-full"
            >
              OKAY
            </button>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Activation Required Modal */}
      <Dialog open={showActivationMessage} onOpenChange={onCloseActivationMessage}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="items-center text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <DialogTitle className="text-xl">Activation Required</DialogTitle>
            <p className="text-center mt-4">Activate your account to use this feature</p>
          </DialogHeader>
          <div className="flex justify-center mt-4">
            <button 
              onClick={handleCloseActivationMessage} 
              className="bg-green-800 text-white px-12 py-3 rounded-md font-medium w-full"
            >
              Activate Account
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DashboardModals;
