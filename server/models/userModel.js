const db = require("../utils/database");

// Check if a user exists by email
const findUserByEmail = (email, callback) => {
  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results[0]);
    }
  });
};

// Create a new user
const createUser = (user, callback) => {
  const query =
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  const values = [user.username, user.email, user.password, user.role];
  db.query(query, values, (err, results) => {
    if (err) {
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

module.exports = { findUserByEmail, createUser };
