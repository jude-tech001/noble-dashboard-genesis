
import React from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";

interface OpayWarningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OpayWarningModal: React.FC<OpayWarningModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md p-8">
        <div className="text-center">
          {/* Opay Logo */}
          <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-600 flex items-center justify-center">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-600 rounded-full"></div>
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold text-red-600 mb-6">Opay Service Down</h2>
          
          <p className="text-gray-700 text-lg mb-6">
            Please do not use Opay bank for payments at this time.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
            <p className="text-red-700 text-sm leading-relaxed">
              The Opay bank service is currently experiencing issues. Please use other supported banks for your payment.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-medium text-lg hover:bg-blue-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpayWarningModal;
