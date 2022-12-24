const express = require("express");
var cors = require("cors");
const adminApi = require("../controllers/admin/adminApi");
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const sectorController = require("../controllers/sectorController");
const userSectorController = require("../controllers/userSectorController");

module.exports = function (app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/admin", adminApi);
  app.use("/api/user", userController);
  app.use("/api/auth", authController);
  app.use("/api/sector", sectorController);
  app.use("/api/usersector", userSectorController);
};
