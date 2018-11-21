var express = require("express");
var auth = require('../middlewares/auth');

function setup(app, handlers) {
// ########## Example Routes ##########
  var examplesRouter = express.Router();  
  examplesRouter.get("/", handlers.examples.getList);
  app.use("/api/examples", auth, examplesRouter);

// ########## More Routes ##########
  var usersRouter = express.Router();  
  usersRouter.post("/login", handlers.users.login);
  app.use("/api/users", usersRouter);

};

exports.setup = setup;