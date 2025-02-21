import React, { useMemo } from "react";
import { BoxProps } from "@mui/material";
import { useWalletBalances, usePrices } from "./hooks";
import WalletRow from "./WalletRow";
import classes from "./WalletPage.module.css";

// interface of wallet balance
interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

// Props interface extending BoxProps
interface Props extends BoxProps {}

//WalletPage component
const WalletPage = (React.FC<Props> = (props: Props) => {
  const { children, ...rest } = props;

  //Custom hooks to get wallet balances and prices
  const balances = useWalletBalances();
  const prices = usePrices();

  // Function to get priority based on blockchain
  const getPriority = (blockchain: string): number => {
    switch (blockchain) {
      case "Osmosis":
        return 100;
      case "Ethereum":
        return 50;
      case "Arbitrum":
        return 30;
      case "Zilliqa":
        return 20;
      case "Neo":
        return 20;
      default:
        return -99;
    }
  };

  // Memorized sorted balances based on priority and amount
  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance: WalletBalance) => {
        const balacePriority = getPriority(balance.blockchain);
        return balacePriority > -99 && balance.amount > 0;
      })
      .sort((lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return rightPriority - leftPriority;
      });
  }, [balances]);

  //Maping sorted balances to WalletRow components
  const rows = sortedBalances.map((balance: WalletBalance, index: number) => {
    const usdValue = prices[balance.currency] * balance.amount;
    return (
      <WalletRow
        classeName={classes.row}
        key={index}
        amount={balance.amount}
        usdValue={usdValue}
        formattedAmount={balance.amount.toFixed()}
      />
    );
  });

  // Rendering the WalletRow components inside a div
  return <div {...rest}>{rows}</div>;
});

export default WalletPage;
