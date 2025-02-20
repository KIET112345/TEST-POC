// AmountInput.tsx
import React from "react";

interface AmountInputProps {
  value: string;
  onChange: (value: string) => void;
}

const AmountInput: React.FC<AmountInputProps> = ({ value, onChange }) => {
  return (
    <div>
      <label className="block text-sm font-medium">Amount</label>
      <input
        type="number"
        className="w-full p-2 border rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Enter amount"
        min="0"
      />
    </div>
  );
};

export default AmountInput;
