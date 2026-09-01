import { useMemo } from "react";

import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import { useLocalStorage } from "./hooks/useLocalStorage";
import { useFetch } from "./hooks/useFetch";

export default function App() {

  const [transactions, setTransactions] =
    useLocalStorage("spendwise-transactions", []);

  // Data Fetching using custom hook
  const {
    data: users,
    loading,
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

  // useMemo for calculations
  const totals = useMemo(() => {

    const income = transactions
      .filter(
        (transaction) =>
          transaction.type === "income"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    const expense = transactions
      .filter(
        (transaction) =>
          transaction.type === "expense"
      )
      .reduce(
        (total, transaction) =>
          total + transaction.amount,
        0
      );

    return {
      income,
      expense,
      balance: income - expense,
    };

  }, [transactions]);

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      transaction,
    ]);
  };

  const deleteTransaction = (id) => {

    const updatedTransactions =
      transactions.filter(
        (transaction) =>
          transaction.id !== id
      );

    setTransactions(updatedTransactions);
  };

  return (
    <div className="app">

      <Header />

      <main className="container">

        <div className="welcome-section">

          <div>
            <h2>Financial Overview 👋</h2>

            <p>
              Manage your income and expenses easily.
            </p>
          </div>

          <div className="api-status">

            {loading
              ? "Loading API data..."
              : `${users.length} users loaded from API`}
          </div>

        </div>

        <SummaryCards
          income={totals.income}
          expense={totals.expense}
          balance={totals.balance}
        />

        <div className="dashboard-grid">

          <TransactionForm
            addTransaction={addTransaction}
          />

          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
          />

        </div>

      </main>

    </div>
  );
}