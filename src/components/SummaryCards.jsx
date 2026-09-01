export default function SummaryCards({
  income,
  expense,
  balance,
}) {
  return (
    <div className="summary-grid">

      <div className="summary-card balance-card">
        <span>💰</span>
        <div>
          <p>Total Balance</p>
          <h2>₹{balance.toLocaleString()}</h2>
        </div>
      </div>

      <div className="summary-card income-card">
        <span>📈</span>
        <div>
          <p>Total Income</p>
          <h2>₹{income.toLocaleString()}</h2>
        </div>
      </div>

      <div className="summary-card expense-card">
        <span>📉</span>
        <div>
          <p>Total Expense</p>
          <h2>₹{expense.toLocaleString()}</h2>
        </div>
      </div>

    </div>
  );
}