// SwapButton.tsx
import React from "react";
import { ArrowLeftRight } from "lucide-react";

interface SwapButtonProps {
  onClick: () => void;
}

const SwapButton: React.FC<SwapButtonProps> = ({ onClick }) => {
  return (
    <button className="p-2 mt-4 bg-gray-200 rounded-full hover:bg-gray-300" onClick={onClick}>
      <ArrowLeftRight className="w-5 h-5" />
    </button>
  );
};

export default SwapButton;
