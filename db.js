const mysql = require('mysql2');
require('dotenv').config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASS || '',
  database: process.env.DB_NAME || 'school_db'
});

connection.connect((err) => {
  if (err) throw err;
  console.log("✅ Connected to MySQL Database");

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      address VARCHAR(255) NOT NULL,
      latitude FLOAT NOT NULL,
      longitude FLOAT NOT NULL
    );
  `;

  connection.query(createTableQuery, (err) => {
    if (err) {
      console.error("Error creating schools table:", err.message);
    } else {
      console.log("Table 'schools' is ready.");
    }
  });

});

module.exports = connection;
