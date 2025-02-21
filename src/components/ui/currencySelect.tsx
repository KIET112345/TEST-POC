// CurrencySelect.tsx (Dropdown component with currency images)
import { Currency } from "lucide-react";
import React from "react";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (currency: string) => void;
  currencies: string[];
  currencyImages: Record<string, string>;
  showImages?: boolean;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  currencies,
  currencyImages,
  showImages = false,
}) => {
  currencies.forEach( currency => {
  console.log(currencyImages[currency])

  })
  return (
    <div className="flex flex-col w-full">
      <label className="text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="p-2 border rounded w-full"
      >
        {currencies.map((currency) => (
          <option key={currency} value={currency}>
            {showImages && currencyImages[currency] ? (
              <span className="flex items-center gap-2">
                <img
                  src={currencyImages[currency]}
                  alt={currency}
                  className="w-5 h-5 inline"
                />
                {currency}
              </span>
            ) : (
              currency
            )}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencySelect;
