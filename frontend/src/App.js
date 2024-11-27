import React, { useState } from "react";
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

  return (
    <div className="app">
      <Navbar
        openSignup={() => setSignupModalOpen(true)}
        openLogin={() => setLoginModalOpen(true)}
      />
      <div className="container">
        <AddExpenseForm expenses={expenses} setExpenses={setExpenses} />
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
