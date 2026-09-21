// ```jsx
import { createContext, useContext, useState, useMemo } from "react";

const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem(
      "spendwise-transactions"
    );

    return savedTransactions
      ? JSON.parse(savedTransactions)
      : [];
  });

  // Add Transaction
  const addTransaction = (transaction) => {
    const updatedTransactions = [
      ...transactions,
      transaction
    ];

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "spendwise-transactions",
      JSON.stringify(updatedTransactions)
    );
  };

  // Delete Transaction
  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);

    localStorage.setItem(
      "spendwise-transactions",
      JSON.stringify(updatedTransactions)
    );
  };

  // Calculate totals
  const totals = useMemo(() => {
    const income = transactions
      .filter(
        (transaction) => transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

    const expense = transactions
      .filter(
        (transaction) => transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + Number(transaction.amount),
        0
      );

    return {
      income,
      expense,
      balance: income - expense
    };
  }, [transactions]);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        totals
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}

// Custom hook
export function useTransactions() {
  return useContext(TransactionContext);
}

