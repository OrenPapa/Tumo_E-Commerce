-- Create database
CREATE DATABASE shop_project;
USE shop_project;

-- Create products table
CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    picture VARCHAR(2083)
);

-- Insert sample data into products table
INSERT INTO products (name, description, price, picture)
VALUES (
    'Beige Shirt',
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    29.99,
    'https://imagescdn.thecollective.in/img/app/product/8/899861-11009513.jpg'
);

-- Create users table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- View tables
DESCRIBE products;
DESCRIBE users;

-- Select data for verification
SELECT * FROM products;
