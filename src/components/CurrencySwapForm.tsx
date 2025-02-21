// CurrencySwapForm.tsx (Optimized React Component in TypeScript)
import { useState, useEffect, useCallback } from "react";
import CurrencySelect from "./ui/currencySelect";
import AmountInput from "./ui/amountInput";
import SwapButton from "./ui/swapButton";

export default function CurrencySwapForm() {
  // State variables for currency selections and conversion
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>({});
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [currencyImages, setCurrencyImages] = useState<Record<string, string>>({});

  // Fetch exchange rates from API and select the most recent price for each currency
  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await fetch("https://interview.switcheo.com/prices.json");
        const data = await response.json();
        const rates: Record<string, number> = {};
        const availableCurrencies = new Set<string>();
        
        data.forEach(({ currency, price }: { currency: string; price: number }) => {
          rates[currency] = price;
          availableCurrencies.add(currency);
        });

        setExchangeRates(rates);
        setCurrencies(Array.from(availableCurrencies));
      } catch {
        setError("Failed to fetch exchange rates");
      }
    };

    fetchExchangeRates();
  }, []);

  // Function to fetch and set currency images
  useEffect(() => {
    const fetchCurrencyImages = async () => {
      const images: Record<string, string> = {};
      currencies.forEach((currency) => {
        images[currency] = `/images/currencies/${currency.toLowerCase()}.svg`; // Assuming images are stored in public/images/currencies/
      });
      setCurrencyImages(images);
    };

    if (currencies.length > 0) {
      fetchCurrencyImages();
    }
  }, [currencies]);

  // Function to perform currency conversion
  const handleSwap = useCallback(() => {
    if (!amount || isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) {
      setError("Please enter a valid positive amount");
      setConvertedAmount(null);
      return;
    }
    setError(null);

    const fromRate = exchangeRates[fromCurrency];
    const toRate = exchangeRates[toCurrency];

    if (!fromRate || !toRate) {
      setConvertedAmount("Exchange rate not available");
      return;
    }
    
    // Convert amount from fromCurrency to USD, then to toCurrency
    const result = ((parseFloat(amount) * fromRate) / toRate).toFixed(6);
    setConvertedAmount(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  // Function to reverse currency selection and reset conversion result
  const handleReverse = useCallback(() => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  }, [fromCurrency, toCurrency]);

  return (
    <div className="max-w-md mx-auto p-4 shadow-lg rounded-2xl bg-white">
      <h2 className="text-xl font-semibold text-center">Currency Swap</h2>
      <div className="flex items-center gap-2 mt-4">
        <CurrencySelect label="From" value={fromCurrency} onChange={setFromCurrency} currencies={currencies} currencyImages={currencyImages}/>
        <SwapButton onClick={handleReverse} />
        <CurrencySelect label="To" value={toCurrency} onChange={setToCurrency} currencies={currencies} currencyImages={currencyImages}/>
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
