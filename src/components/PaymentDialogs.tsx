
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface PaymentDialogsProps {
  showProcessingDialog: boolean;
  showFailureDialog: boolean;
  onProcessingDialogChange: (open: boolean) => void;
  onFailureDialogChange: (open: boolean) => void;
  onTryAgain: () => void;
}

const PaymentDialogs: React.FC<PaymentDialogsProps> = ({
  showProcessingDialog,
  showFailureDialog,
  onProcessingDialogChange,
  onFailureDialogChange,
  onTryAgain,
}) => {
  return (
    <>
      {/* Processing Dialog with Circle Loading */}
      <Dialog open={showProcessingDialog} onOpenChange={onProcessingDialogChange}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-6">
            <h2 className="text-xl font-bold text-center mb-6">Payment Processing</h2>
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 border-4 border-green-800 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-500">Checking For Payment</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Payment Failure Dialog */}
      <Dialog open={showFailureDialog} onOpenChange={onFailureDialogChange}>
        <DialogContent className="sm:max-w-md p-0 gap-0">
          <div className="p-6">
            <div className="flex flex-col items-center mb-4">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z" stroke="#6A37FF" strokeWidth="2" />
                  <path d="M9 12L15 12" stroke="#6A37FF" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-center">Payment Not Received</h2>
              <h2 className="text-xl font-bold text-center">Please Try Again</h2>
            </div>
            <p className="text-center mb-6">Invalid Payment Please Try Again</p>
            <button
              onClick={onTryAgain}
              className="w-full bg-white text-green-800 py-2 border border-green-800 font-bold rounded-md"
            >
              TRY AGAIN
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaymentDialogs;
