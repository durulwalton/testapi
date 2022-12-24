const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../models/index");
router.post("/auth", function (req, res) {
  var appStatus,
    appMessage,
    appData,
    formData = req.body;
  db.user
    .findOne({
      attributes: ['id', 'username', 'email', 'password', 'status'],
      where: {
        email: formData.email,
      },
    })
    .then(async function (thisData) {
      if (thisData == null) {
        appStatus = false;
        appMessage = 'Invalid Credentials!';
        appData = null;
      }
      else {
        try { passwordVerified = await bcrypt.compare(formData.password, thisData.dataValues.password); } catch (err) { }
        if (!passwordVerified) {
          appStatus = false;
          appMessage = 'Invalid Credentials!';
          appData = null;
        } else {
          let token = jwt.sign({
            id: thisData.dataValues.id,
            username: thisData.dataValues.username,
            email: thisData.dataValues.email,
          }, 'sumiya')
          appStatus = true;
          appMessage = 'Login Successful.';
          appData = token;
        }

      }
    })
    .catch(function (err) {
      appStatus = false;
      appMessage = `Can't process your request now! Please Try again later.`;
    })
    .then(function () {
      res.send(
        JSON.stringify({
          'appStatus': appStatus,
          'appMessage': appMessage,
          'appData': appData
        })
      );
    });
});
module.exports = router;
