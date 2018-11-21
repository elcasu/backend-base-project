var express = require("express");

function setup(app, handlers) {
// ########## Example Routes ##########
  var usersRouter = express.Router();  
  usersRouter.post("/", handlers.users.create);
  app.use("/api/users", usersRouter);

// ########## More Routes ##########

};

exports.setup = setup;