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

// Application routes
var handlers = {
  examples: require('./app/handlers/examplesHandler')
};

routes.setup(app, handlers);

// ---- START SERVER ----
var server = app.listen(process.env.PORT, function(){
  if (process.env.NODE_ENV !== 'test') {
    console.log("Server corriendo en el puerto", (process.env.PORT || 8085));
  }
})

module.exports = server
