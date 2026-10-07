function Summary({ transactions }) {
  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expense;

  return (
    <section className="summary">

      <h2>Expense Tracker</h2>

      <div className="balance-section">
        <p>YOUR BALANCE</p>

        <h1>
          ${balance.toLocaleString("en-US", {
            minimumFractionDigits: 2,
          })}
        </h1>
      </div>

      <div className="summary-box">

        <div className="summary-item income">
          <h3>INCOME</h3>

          <p>
            ${income.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

        <div className="vertical-line"></div>

        <div className="summary-item expense">
          <h3>EXPENSE</h3>

          <p>
            ${expense.toLocaleString("en-US", {
              minimumFractionDigits: 2,
            })}
          </p>
        </div>

      </div>

    </section>
  );
}

export default Summary;