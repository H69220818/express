const db = require("./db.config");
const jwt = require("./jwt.config");

module.exports = {
  db,
  ...jwt
};
