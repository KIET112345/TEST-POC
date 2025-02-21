// CurrencySelect.tsx (Using Radix UI for better styling and interaction)
import React from "react";
import * as Select from "@radix-ui/react-select";
import { ChevronDownIcon } from "@radix-ui/react-icons";

interface CurrencySelectProps {
  label: string;
  value: string;
  onChange: (currency: string) => void;
  currencies: string[];
  currencyImages: Record<string, string>;
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  label,
  value,
  onChange,
  currencies,
  currencyImages,
}) => {
  return (
    <div className="w-full">
      <label className="text-sm font-medium mb-1 block">{label}</label>
      <Select.Root value={value} onValueChange={onChange}>
        <Select.Trigger className="p-2 border rounded w-full flex items-center justify-between">
          <Select.Value>
            <span className="flex items-center gap-2">
              <img src={currencyImages[value]} alt={value} className="w-5 h-5" />
              {value}
            </span>
          </Select.Value>
          <Select.Icon>
            <ChevronDownIcon className="w-5 h-5" />
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-white border rounded shadow-md z-10">
            <Select.Viewport>
              {currencies.map((currency) => (
                <Select.Item
                  key={currency}
                  value={currency}
                  className="p-2 hover:bg-gray-100 flex items-center gap-2 cursor-pointer"
                >
                  <img src={currencyImages[currency]} alt={currency} className="w-5 h-5" />
                  <Select.ItemText>{currency}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default CurrencySelect;
