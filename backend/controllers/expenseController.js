const Expense = require('../models/Expense'); // Assuming you have an Expense model

// Add an expense
const addExpense = async (req, res) => {
  try {
    const { amount, description, date, category, paymentMethod } = req.body;

    // Check if required fields are provided
    if (!amount || !date || !category) {
      return res.status(400).json({ message: "Missing required fields: amount, date, and category are mandatory." });
    }

    // Ensure the user exists in the request (from authentication middleware)
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Create a new expense with user info attached
    const newExpense = new Expense({
      amount,
      description,
      date,
      category,
      paymentMethod,
      user: req.user._id, // Assuming `req.user` has the user's ID from the token
    });

    // Save the expense to the database
    const expense = await newExpense.save();

    res.status(201).json(expense);
  } catch (error) {
    console.error("Error adding expense:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Get all expenses for the logged-in user
const getExpenses = async (req, res) => {
  try {
    // Ensure the user exists in the request (from authentication middleware)
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const expenses = await Expense.find({ user: req.user._id }); // Find expenses for the logged-in user
    res.status(200).json(expenses);
  } catch (error) {
    console.error("Error getting expenses:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Update an expense
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the expense exists
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure the user exists in the request (from authentication middleware)
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if the expense belongs to the logged-in user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this expense" });
    }

    // Update the expense (only update provided fields)
    Object.assign(expense, req.body);
    await expense.save();

    res.status(200).json(expense);
  } catch (error) {
    console.error("Error updating expense:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the expense exists
    const expense = await Expense.findById(id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    // Ensure the user exists in the request (from authentication middleware)
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Check if the expense belongs to the logged-in user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete this expense" });
    }

    // Delete the expense
    await expense.remove();

    res.status(200).json({ message: "Expense removed successfully" });
  } catch (error) {
    console.error("Error deleting expense:", error);
    res.status(500).json({ message: "Server error, please try again later." });
  }
};

module.exports = { addExpense, getExpenses, updateExpense, deleteExpense };
