const path = require("path");

module.exports = {
  config: path.resolve("src/config", "sequelize-cli.js"),
  "models-path": path.resolve("src/database", "models"),
  "seeders-path": path.resolve("src/database", "seeders"),
  "migrations-path": path.resolve("src/database", "migrations"),
};
