import React, { useState } from "react";

const AddExpenseForm = ({ expenses, setExpenses }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "Cash",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.amount || !form.date || !form.category) {
      alert("Please fill all required fields!");
      return;
    }
    setExpenses([...expenses, { ...form, id: Date.now() }]);
    setForm({ amount: "", description: "", date: "", category: "", paymentMethod: "Cash" });
  };

  return (
    <form className="expense-form" onSubmit={handleSubmit}>
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={form.amount}
        onChange={handleChange}
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />
      <input
        type="date"
        name="date"
        value={form.date}
        onChange={handleChange}
      />
      <input
        type="text"
        name="category"
        placeholder="Category"
        value={form.category}
        onChange={handleChange}
      />
      <select
        name="paymentMethod"
        value={form.paymentMethod}
        onChange={handleChange}
      >
        <option value="Cash">Cash</option>
        <option value="Credit">Credit</option>
      </select>
      <button type="submit" className="btn primary">Add Expense</button>
    </form>
  );
};

export default AddExpenseForm;
