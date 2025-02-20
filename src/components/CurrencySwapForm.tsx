// CurrencySwapForm.tsx (React Component in TypeScript)
import { useState, useEffect } from "react";
import CurrencySelect from "./ui/currencySelect";
import AmountInput from "./ui/amountInput";
import SwapButton from "./ui/swapButton";

export default function CurrencySwapForm() {
  // State variables for currency selections and conversion
  const [fromCurrency, setFromCurrency] = useState<string>("USD");
  const [toCurrency, setToCurrency] = useState<string>("EUR");
  const [amount, setAmount] = useState<string>("");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<string[]>([]);

  // Fetch exchange rates from API and select the most recent price for each currency
  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((data) => {
        const rates: Record<string, number> = {};
        const availableCurrencies: Set<string> = new Set();
        
        data.forEach((item: { currency: string; price: number; date: string }) => {
          const existing = rates[item.currency];
          const itemDate = new Date(item.date).getTime();
          const existingDate = existing ? new Date(existing.date).getTime() : 0;
          
          if (!existing || itemDate > existingDate) {
            rates[item.currency] = item.price;
            availableCurrencies.add(item.currency);
          }
        });
        
        setExchangeRates(rates);
        setCurrencies(Array.from(availableCurrencies));
      })
      .catch(() => setError("Failed to fetch exchange rates"));
  }, []);

  // Function to perform currency conversion
  const handleSwap = (): void => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid positive amount");
      setConvertedAmount(null);
      return;
    }
    setError(null);

    const fromRate = 1 / exchangeRates[fromCurrency];
    const toRate = 1 / exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
      setConvertedAmount("Exchange rate not available");
      return;
    }
    
    const result = ((parseFloat(amount) / fromRate) * toRate).toFixed(2);
    setConvertedAmount(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
  };

  // Function to reverse currency selection and reset conversion result
  const handleReverse = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-2xl bg-white">
      <h2 className="text-xl font-semibold text-center">Currency Swap</h2>
      <div className="flex items-center gap-2 mt-4">
        <CurrencySelect label="From" value={fromCurrency} onChange={setFromCurrency} currencies={currencies} />
        <SwapButton onClick={handleReverse} />
        <CurrencySelect label="To" value={toCurrency} onChange={setToCurrency} currencies={currencies} />
      </div>
      
      <AmountInput value={amount} onChange={setAmount} />
      
      {/* Button to perform currency conversion */}
      <button onClick={handleSwap} className="w-full mt-4 bg-blue-500 text-white p-2 rounded">
        Swap
      </button>
      
      {/* Display error message if validation fails */}
      {error && <p className="text-red-500 text-center mt-2">{error}</p>}
      
      {/* Display converted amount result */}
      {convertedAmount && <p className="text-center text-lg font-medium mt-2">{convertedAmount}</p>}
    </div>
  );
}
