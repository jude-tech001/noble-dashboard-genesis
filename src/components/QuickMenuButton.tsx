
import React from "react";

interface QuickMenuButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const QuickMenuButton: React.FC<QuickMenuButtonProps> = ({
  icon,
  label,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center space-y-2"
    >
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-100 text-gray-600">
        {icon}
      </div>
      <span className="text-sm text-gray-600">{label}</span>
    </button>
  );
};

export default QuickMenuButton;
