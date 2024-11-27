import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import AddExpenseForm from "./components/AddExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Charts from "./components/Charts";
import Modals from "./components/Modals";
import "./styles.css";

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  // Fetch expenses from the backend on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      const token = localStorage.getItem('token');  // Get token from localStorage
      if (!token) {
        alert("You need to log in first!");  // If no token, alert user
        return;
      }

      try {
        const response = await fetch('http://localhost:4000/api/expenses', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`  // Include token in Authorization header
          }
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.message || "Failed to fetch expenses");
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        setExpenses(data);  // Store fetched data into state
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };
    
    fetchExpenses();
  }, []);

  const handleExpenseUpdate = (updatedExpense) => {
    setExpenses((prevExpenses) =>
      prevExpenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  return (
    <div className="app">
      <Navbar
        openSignup={() => setSignupModalOpen(true)}
        openLogin={() => setLoginModalOpen(true)}
      />
      <div className="container">
        <AddExpenseForm setExpenses={setExpenses} updateExpense={handleExpenseUpdate} />
        <ExpenseList expenses={expenses} />
        <Charts expenses={expenses} />
      </div>
      <Modals
        isSignupModalOpen={isSignupModalOpen}
        closeSignup={() => setSignupModalOpen(false)}
        isLoginModalOpen={isLoginModalOpen}
        closeLogin={() => setLoginModalOpen(false)}
      />
    </div>
  );
};

export default App;
