import React from "react";

const ExpenseList = ({ expenses }) => {
  return (
    <table className="expense-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Description</th>
          <th>Category</th>
          <th>Amount</th>
          <th>Payment Method</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense) => (
          <tr key={expense.id}>
            <td>{expense.date}</td>
            <td>{expense.description}</td>
            <td>{expense.category}</td>
            <td>${expense.amount}</td>
            <td>{expense.paymentMethod}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ExpenseList;
