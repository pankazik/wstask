const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to DB");
});

module.exports = connection.promise();
