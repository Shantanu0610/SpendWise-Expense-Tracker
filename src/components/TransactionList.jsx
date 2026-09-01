export default function TransactionList({
  transactions,
  deleteTransaction,
}) {

  if (transactions.length === 0) {
    return (
      <div className="transactions-card">
        <h2>Recent Transactions</h2>
        <p className="empty-message">
          No transactions added yet.
        </p>
      </div>
    );
  }

  return (
    <div className="transactions-card">

      <h2>Recent Transactions</h2>

      <div className="transaction-list">

        {transactions
          .slice()
          .reverse()
          .map((transaction) => (

            <div
              className="transaction-item"
              key={transaction.id}
            >

              <div className="transaction-info">

                <div
                  className={`transaction-icon ${
                    transaction.type
                  }`}
                >
                  {transaction.type === "income"
                    ? "📈"
                    : "📉"}
                </div>

                <div>
                  <h3>{transaction.title}</h3>

                  <p>
                    {transaction.category} • {transaction.date}
                  </p>
                </div>

              </div>

              <div className="transaction-right">

                <strong
                  className={
                    transaction.type === "income"
                      ? "income-text"
                      : "expense-text"
                  }
                >
                  {transaction.type === "income"
                    ? "+"
                    : "-"}
                  ₹{transaction.amount}
                </strong>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))}

      </div>

    </div>
  );
}