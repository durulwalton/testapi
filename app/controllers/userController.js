const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../models/index");
const {Sequelize}=db;
const {Op }=Sequelize;
router.post("/register", function (req, res) {
  var appStatus,
    appMessage,
    appData,
    formData = req.body;
  const basicInfo = {
    username: formData.username, // Mandatory
    email: formData.email, // Mandatory
    created_by: formData.created_by,
    status: formData.status,
  };
  const saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(formData.password, salt, function (err, hashedPassword) {
      db.user
        .findOne({
          attributes: ["email"],
          where: {
            [Op.or]: [
              { email: formData.email },
              { username: formData.username }
            ]
            
          },
        })
        .then(function (findStatus) {
          if (findStatus !== null) {
            appStatus = false;
            appMessage =
              "Already Registered with this Email or Username.! Use different One.";
          } else {
            basicInfo.password = hashedPassword;
            return db.user.create(basicInfo).then((thisData) => {
              appStatus = true;
              appMessage = "User Registered Successfully.";
            });
          }
        })
        .catch(function (err) {
          console.log(err);
          appStatus = false;
          appMessage = "Cant Register now ! Try again later.";
        })
        .then(function () {
          res.send(
            JSON.stringify({
              appStatus: appStatus,
              appMessage: appMessage,
            })
          );
        });
    });
  });
});
module.exports = router;
