const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, createUser } = require("../models/userModel");

// Register a new user
const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    findUserByEmail(email, async (err, user) => {
      if (err) {
        return res.status(500).json({ message: "Database error" });
      }
      if (user) {
        return res.status(400).json({ message: "Email is already registered" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the user
      const newUser = {
        username,
        email,
        password: hashedPassword,
        role: "user",
      };
      createUser(newUser, (err, results) => {
        if (err) {
          return res.status(500).json({ message: "Error creating user" });
        }
        res.status(201).json({ message: "User registered successfully" });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error registering user" });
  }
};

// Login user
const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  findUserByEmail(email, async (err, user) => {
    if (err) {
      return res.status(500).json({ message: "Database error" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      "your_jwt_secret", // Use a secure secret in production
      { expiresIn: "1h" }
    );

    res.status(200).json({ message: "Login successful", token });
  });
};

const logoutUser = (req, res) => {
  // For stateless JWT, logout is handled on the client side by clearing the token
  res.status(200).json({ message: "Logout successful" });
};

module.exports = { registerUser, loginUser, logoutUser };
