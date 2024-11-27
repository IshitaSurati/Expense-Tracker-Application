const express = require('express');
const router = express.Router();
const { addExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');

// Define your routes and make sure the functions are correctly imported and passed as handlers
router.post('/add', addExpense);  // Make sure addExpense is correctly imported
router.get('/', getExpenses);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
