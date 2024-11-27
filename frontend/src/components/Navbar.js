import React from "react";

const Navbar = ({ openSignup, openLogin }) => {
  return (
    <nav className="navbar">
      <h1>Expense Tracker</h1>
      <div>
        <button onClick={openLogin} className="btn">Login</button>
        <button onClick={openSignup} className="btn primary">Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
