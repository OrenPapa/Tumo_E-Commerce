const bcrypt = require("bcrypt");
const db = require("../utils/database");

const addAdminUser = async () => {
  const username = "oren";
  const email = "oren@gmail.com";
  const role = "admin";
  const plainPassword = "oren1234";

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // Insert the admin user into the database
    const query =
      "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
    const values = [username, email, hashedPassword, role];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error adding admin user:", err);
      } else {
        console.log("Admin user added successfully");
      }
      db.end(); // Close the database connection
    });
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

addAdminUser();
