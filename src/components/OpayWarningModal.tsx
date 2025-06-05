
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
      <DialogContent className="sm:max-w-md p-6">
        <div className="text-center">
          {/* Opay Logo - Using uploaded image */}
          <div className="mx-auto w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-lg">
            <img 
              src="/lovable-uploads/81ae35fa-5713-4f5e-bd08-259e18a11a5a.png" 
              alt="Opay Logo" 
              className="w-12 h-12 rounded-full object-contain"
            />
          </div>

          <h2 className="text-xl font-bold text-red-600 mb-4">Opay Service Down</h2>
          
          <p className="text-gray-700 mb-4">
            Please do not use Opay bank for payments.
          </p>
          
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
            <p className="text-red-700 text-sm">
              Opay bank service is currently down. Use other banks for payment.
            </p>
          </div>
          
          <button
            onClick={onClose}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            I Understand
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OpayWarningModal;
