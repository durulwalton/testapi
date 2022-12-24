const express = require("express");
const db = require("./app/models/index");
const app = express();
const port = 5000;
require("./app/startup/routes")(app);
db.sequelize
  .sync()
  .then(function () {
    app.listen(port, () => {
      console.log(`App listening on port ${port}`);
    });
  })
  .catch(function (e) {
    throw new Error(e);
  });
