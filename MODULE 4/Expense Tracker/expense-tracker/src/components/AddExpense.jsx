import { useState } from "react";

function AddExpense({ addTransaction }) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (title.trim() === "") {
      alert("Please enter a title");
      return;
    }

    if (amount === "") {
      alert("Please enter an amount");
      return;
    }

    if (Number(amount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (type === "") {
      alert("Please select Income or Expense");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      type: type,
    };

    addTransaction(newTransaction);

    // Clear the form
    setTitle("");
    setAmount("");
    setType("");
  };

  return (
    <section className="add-expense">

      <div className="section-title">
        <h2>Add new transaction</h2>
      </div>

      <form onSubmit={handleSubmit}>

        {/* Title */}
        <label>Title</label>

        <input
          type="text"
          placeholder="Enter title..."
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        {/* Amount */}
        <label>Amount</label>

        <input
          type="number"
          placeholder="Enter amount..."
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
        />

        {/* Transaction Type */}
        <div className="radio-group">

          <label className="radio-label">
            <input
              type="radio"
              name="transactionType"
              value="income"
              checked={type === "income"}
              onChange={(event) => setType(event.target.value)}
            />

            Income
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="transactionType"
              value="expense"
              checked={type === "expense"}
              onChange={(event) => setType(event.target.value)}
            />

            Expense
          </label>

        </div>

        {/* Button */}
        <button type="submit">
          Add transaction
        </button>

      </form>

    </section>
  );
}

export default AddExpense;