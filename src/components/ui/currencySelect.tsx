// CurrencySelect.tsx
import React from "react";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  currencies: string[];
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({ label, value, onChange, currencies }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-medium">{label}</label>
      <select
        className="w-full p-2 border rounded"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {currencies.map((currency, index) => (
          <option key={index} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
