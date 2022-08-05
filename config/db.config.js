const mysql = require("mysql");
const db = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "api_server",
  password: "api_server",
  database: "api_server"
});

module.exports = db;
