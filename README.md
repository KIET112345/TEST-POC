### FE TASK:
## List out the computational inefficiencies and anti-patterns found in the code block below [badcode](FE-1/badcode.tsx)
1. Incorrect Filtering logic:
The filtering logic in sortedBalances is incorrect. The variable lhsPriority is not defined, and the condition if (lhsPriority > -99) should be if (balancePriority > -99)

2. Unneccessary Filter:
The filtering logic checks if balance.amount <= 0 and returns true, which meams it includes balances with amounts less less than or equal to 0. This seems counterintutive as typically, you would filter out such balances

3. Redundant Sorting:
The sorting logic in sortedBalances is redundant because it sorts balances that have already been filtered to include only those with amounts less than or equal 0. This sorting operation is unnecessary and compulationally expensive

4. Inefficient Use of useMemo:
The useMemo hook is used to memoize sortedBalances,but the dependencies include prices, which is not used in the compulation of sortedBalances. This can lead to unnecessary recomputations

5. incorrect Type for balance in rows:
The balance in the rows mapping is typed as FormattedWalletBalance, but it should be WalletBalance since the sortedBalances contains WalletBalance objects

6. Unnecessary Mapping:
The formattedBalances mapping is unnecessary because sortedBalances can be directly used to create rows

7. Potential Performance Issue with map:
The map function is used twice on sortedBalances to create formattedBalances and rows. This can be optimized to a single map operation

8. Missing dependency in useMemo:
The getPriority function is used inside useMemo, but it is not included in dependency array. This can lead to state closure

## Refactored version of the code
The refactored version of the code present at [refactor](FE-1/refactor.tsx)
