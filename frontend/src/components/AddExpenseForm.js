import React, { useState, useEffect } from "react";

const AddExpenseForm = ({ setExpenses, expenseToUpdate, updateExpense }) => {
  const [form, setForm] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "Cash",
  });
  const [errorMessage, setErrorMessage] = useState(""); // State to hold error messages

  // If editing an existing expense, populate the form with its details
  useEffect(() => {
    if (expenseToUpdate) {
      setForm({
        amount: expenseToUpdate.amount,
        description: expenseToUpdate.description,
        date: expenseToUpdate.date,
        category: expenseToUpdate.category,
        paymentMethod: expenseToUpdate.paymentMethod,
      });
    }
  }, [expenseToUpdate]);

  // Handle form field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handle form submission (either add or update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset the error message on each submit

    // Validation for required fields
    if (!form.amount || !form.date || !form.category) {
      setErrorMessage("Please fill all required fields!");
      return;
    }

    // Prepare the data for submission
    const expenseData = {
      amount: form.amount,
      description: form.description,
      date: form.date,
      category: form.category,
      paymentMethod: form.paymentMethod,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setErrorMessage("You are not logged in. Please log in first.");
        return;
      }

      if (expenseToUpdate) {
        // Make PUT request to back-end API to update expense
        const response = await fetch(`http://localhost:4000/api/expenses/${expenseToUpdate.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(expenseData),
        });

        if (!response.ok) {
          throw new Error("Failed to update expense");
        }

        const updatedExpense = await response.json();
        updateExpense(updatedExpense); // Update the expense in the state

        setForm({
          amount: "",
          description: "",
          date: "",
          category: "",
          paymentMethod: "Cash",
        });
      } else {
        // Make POST request to back-end API to add new expense
        const response = await fetch("http://localhost:4000/api/expenses", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(expenseData),
        });

        if (!response.ok) {
          throw new Error("Failed to add expense");
        }

        const newExpense = await response.json();
        setExpenses((prevExpenses) => [...prevExpenses, newExpense]);

        setForm({
          amount: "",
          description: "",
          date: "",
          category: "",
          paymentMethod: "Cash",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Something went wrong. Please try again later.");
    }
  };

  return (
    <div>
      {/* Show error message if exists */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
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
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          required
        />
        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option value="Cash">Cash</option>
          <option value="Credit">Credit</option>
        </select>
        <button type="submit" className="btn primary">
          {expenseToUpdate ? "Update Expense" : "Add Expense"}
        </button>
      </form>
    </div>
  );
};

export default AddExpenseForm;
