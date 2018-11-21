var express = require('express');
var cors = require('cors');
var morgan = require('morgan');
var app = express();
var bodyParser = require('body-parser')
var routes = require('./app/routes');

app.use(bodyParser.json());

// log all requests to the console
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan("dev"));
}

// handle CORS requests
app.use(cors())

app.use(function (req, res, next) {
  console.log('Middleware de Aplicación nro 1');
  if (req.query.test){
    req.testParam = true    
  }
  next();
});

app.use(function (req, res, next) {
  if (req.testParam){
    console.log('Existe el parametro "test"');
  } else {
    console.log('NO existe el parametro "test"');
  }
  next();
});

// Application routes
var handlers = {
  examples: require('./app/handlers/examplesHandler'),
  users: require('./app/handlers/usersHandler')
};

routes.setup(app, handlers);

// ---- START SERVER ----
var server = app.listen(process.env.PORT, function(){
  if (process.env.NODE_ENV !== 'test') {
    console.log("Server corriendo en el puerto", (process.env.PORT || 8085));
  }
})

module.exports = server
