-- KontabApp MySQL schema
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('accountant','admin','client') NOT NULL DEFAULT 'accountant',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
