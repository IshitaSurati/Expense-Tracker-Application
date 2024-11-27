import React, { useState } from "react";
import Modal from "react-modal";
import axios from "axios";

const Modals = ({ isSignupModalOpen, closeSignup, isLoginModalOpen, closeLogin }) => {
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

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error messages

    // Client-side validation
    if (!signupData.email || !signupData.password || !signupData.name) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/users/register", signupData);
      alert(response.data.message || "Signup successful!");
      closeSignup();  // Close modal after successful signup
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || "Signup failed. Please try again.");
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(""); // Clear previous error messages

    if (!loginData.email || !loginData.password) {
      setErrorMessage("Please fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:4000/api/users/login", loginData);
      alert(response.data.message || "Login successful!");
      closeLogin();  // Close modal after successful login
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.response?.data?.message || "Login failed. Please try again.");
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Signing up..." : "Signup"}
          </button>
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

          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <button className="btn primary" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </Modal>
    </>
  );
};

export default Modals;
