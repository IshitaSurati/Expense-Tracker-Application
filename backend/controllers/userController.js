const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const generateToken = (id, name, email) => {
    return jwt.sign({ id, name, email }, process.env.JWT_SECRET, { expiresIn: '18h' });
};
const registerUser = async (req, res) => {
    const { name, email, password, role } = req.body; 
    try {
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Use provided role or default to 'user'
        const userRole = role || 'user';
        const user = await User.create({ name, email, password, role: userRole });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login User
const loginUser = async (email, password) => {
    try {
      const response = await fetch('http://localhost:4000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Login failed");
        throw new Error('Login failed');
      }
      const data = await response.json();
      localStorage.setItem('token', data.token); // Store token in localStorage for subsequent requests
    } catch (error) {
      console.error('Error during login:', error);
    }
  };
  
// Get All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('-password'); // Exclude passwords from results
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser, getAllUsers };
