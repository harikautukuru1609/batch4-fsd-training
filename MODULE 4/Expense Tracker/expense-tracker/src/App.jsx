import { useState } from "react";

import Summary from "./components/Summary";
import ExpenseList from "./components/ExpenseList";
import AddExpense from "./components/AddExpense";

import "./App.css";

function App() {

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      title: "Groceries",
      amount: 50,
      type: "expense"
    },
    {
      id: 2,
      title: "Salary",
      amount: 2300,
      type: "income"
    },
    {
      id: 3,
      title: "Phone",
      amount: 1000,
      type: "expense"
    }
  ]);

  const addTransaction = (transaction) => {
    setTransactions([
      ...transactions,
      transaction
    ]);
  };

  return (
    <div className="app">

      <Summary transactions={transactions} />

      <ExpenseList transactions={transactions} />

      <AddExpense addTransaction={addTransaction} />

    </div>
  );
}

export default App;