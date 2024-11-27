import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const Modals = ({
  isSignupModalOpen,
  closeSignup,
  isLoginModalOpen,
  closeLogin,
}) => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User", // Default role is User
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/users/register", signupData);
      alert(response.data.message || "Signup successful!");
      closeSignup();
    } catch (error) {
      alert(error.response?.data?.message || "Signup failed!");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", loginData);
      alert(response.data.message || "Login successful!");
      closeLogin();
    } catch (error) {
      alert(error.response?.data?.message || "Login failed!");
    }
  };

  return (
    <>
      {/* Signup Modal */}
      <Modal isOpen={isSignupModalOpen} onRequestClose={closeSignup}>
        <h2>Signup</h2>
        <form className="modal-form" onSubmit={handleSignupSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={signupData.name}
            onChange={handleSignupChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={signupData.email}
            onChange={handleSignupChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={signupData.password}
            onChange={handleSignupChange}
            required
          />
          <select
            name="role"
            value={signupData.role}
            onChange={handleSignupChange}
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          <button className="btn primary" type="submit">Signup</button>
        </form>
      </Modal>

      {/* Login Modal */}
      <Modal isOpen={isLoginModalOpen} onRequestClose={closeLogin}>
        <h2>Login</h2>
        <form className="modal-form" onSubmit={handleLoginSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={loginData.email}
            onChange={handleLoginChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={loginData.password}
            onChange={handleLoginChange}
            required
          />
          <button className="btn primary" type="submit">Login</button>
        </form>
      </Modal>
    </>
  );
};

export default Modals;
