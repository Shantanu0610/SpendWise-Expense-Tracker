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

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const {
    data: backendStatus,
    loading,
    error
  } = useFetch(`${API_URL}/`);

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
              ? "Connecting to API..."
              : error
              ? "Backend API: Offline (Fallback Mode)"
              : `Backend API: ${backendStatus?.message || "Connected"}`}
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
