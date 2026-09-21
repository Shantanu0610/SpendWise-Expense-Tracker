// ```jsx
import Header from "./components/Header";
import SummaryCards from "./components/SummaryCards";
import TransactionForm from "./components/TransactionForm";
import TransactionList from "./components/TransactionList";

import { useFetch } from "./hooks/useFetch";

import {
  TransactionProvider,
  useTransactions
} from "./context/TransactionContext";

function Dashboard() {
  const { totals } = useTransactions();

  const {
    data: users,
    loading
  } = useFetch(
    "https://jsonplaceholder.typicode.com/users"
  );

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

          <TransactionForm />

          <TransactionList />

        </div>

      </main>

    </div>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <Dashboard />
    </TransactionProvider>
  );
}

