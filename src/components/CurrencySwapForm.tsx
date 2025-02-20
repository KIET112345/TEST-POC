import { JSX, useState } from 'react';
import { Card } from './ui/card';
import { CardContent } from './ui/cardContent';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { SelectTrigger } from './ui/selectTrigger';
import { SelectValue } from './ui/selectValue';
import { SelectContent } from './ui/selectContent';
import { SelectItem } from './ui/selectItem';
import { ArrowLeftRight } from 'lucide-react';

// Available currencies
const currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

// Exchange rates
type ExchangeRates = Record<string, Record<string, number>>;
const exchangeRates: ExchangeRates = {
  USD: { EUR: 0.85, GBP: 0.75, JPY: 110, AUD: 1.35 },
  EUR: { USD: 1.18, GBP: 0.88, JPY: 129, AUD: 1.59 },
  GBP: { USD: 1.33, EUR: 1.14, JPY: 146, AUD: 1.81 },
  JPY: { USD: 0.0091, EUR: 0.0078, GBP: 0.0068, AUD: 0.012 },
  AUD: { USD: 0.74, EUR: 0.63, GBP: 0.55, JPY: 83 },
};

export default function CurrencySwapForm(): JSX.Element {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSwap = (): void => {
    const numericAmount = parseFloat(amount);
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid positive amount');
      setConvertedAmount(null);
      return;
    }
    setError(null);

    const rate = exchangeRates[fromCurrency]?.[toCurrency];
    if (!rate) {
      setConvertedAmount('Exchange rate not available');
      return;
    }

    const result = (numericAmount * rate).toFixed(2);
    setConvertedAmount(`${amount} ${fromCurrency} = ${result} ${toCurrency}`);
  };

  const handleReverse = (): void => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(null);
  };

  return (
    <Card className="max-w-md mx-auto p-4 shadow-lg rounded-2xl">
      <CardContent className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Currency Swap</h2>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium">From</label>
            <Select onValueChange={setFromCurrency} value={fromCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button variant="ghost" className="p-2" onClick={handleReverse}>
            <ArrowLeftRight className="w-5 h-5" />
          </Button>

          <div className="flex-1">
            <label className="block text-sm font-medium">To</label>
            <Select onValueChange={setToCurrency} value={toCurrency}>
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {currencies.map((currency) => (
                  <SelectItem key={currency} value={currency} onSelect="">
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Amount</label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        <Button className="w-full mt-4" onClick={handleSwap}>
          Swap
        </Button>

        {convertedAmount && (
          <p className="text-center text-lg font-medium mt-2">
            {convertedAmount}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
