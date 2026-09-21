// ```jsx 
import { useState } from "react";
import { useTransactions } from "../context/TransactionContext";

export default function TransactionForm() {

  const { addTransaction } = useTransactions();

  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("Food");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (
      !title.trim() ||
      !amount ||
      Number(amount) <= 0
    ) {
      alert("Please enter valid transaction details");
      return;
    }

    const transaction = {
      id: Date.now(),
      title,
      amount: Number(amount),
      type,
      category,
      date: new Date().toLocaleDateString()
    };

    addTransaction(transaction);

    setTitle("");
    setAmount("");
    setType("expense");
    setCategory("Food");
  };

  return (
    <div className="form-card">

      <h2>Add Transaction</h2>

      <form onSubmit={handleSubmit}>

        <div className="form-group">

          <label>Transaction Name</label>

          <input
            type="text"
            placeholder="Example: Grocery Shopping"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Amount</label>

          <input
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>Transaction Type</label>

          <select
            value={type}
            onChange={(e) =>
              setType(e.target.value)
            }
          >

            <option value="expense">
              Expense
            </option>

            <option value="income">
              Income
            </option>

          </select>

        </div>

        <div className="form-group">

          <label>Category</label>

          <select
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
          >

            <option>Food</option>
            <option>Travel</option>
            <option>Shopping</option>
            <option>Bills</option>
            <option>Entertainment</option>
            <option>Salary</option>
            <option>Freelance</option>
            <option>Other</option>

          </select>

        </div>

        <button
          type="submit"
          className="add-btn"
        >
          + Add Transaction
        </button>

      </form>

    </div>
  );
}

