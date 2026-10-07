function ExpenseList({ transactions }) {
  return (
    <section className="expense-list">

      <div className="section-title">
        <h2>History</h2>
      </div>

      {transactions.length === 0 ? (
        <p className="no-transactions">
          No transactions added yet.
        </p>
      ) : (
        transactions.map((transaction) => (
          <div
            className={`transaction ${
              transaction.type === "income"
                ? "income-border"
                : "expense-border"
            }`}
            key={transaction.id}
          >
            <span>{transaction.title}</span>

            <span>
              {transaction.type === "income" ? "+" : "-"}$
              {transaction.amount.toLocaleString("en-US", {
                minimumFractionDigits: 2,
              })}
            </span>
          </div>
        ))
      )}

    </section>
  );
}

export default ExpenseList;