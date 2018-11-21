var User = require("../models/user");
var jwt = require('jsonwebtoken');

function authenticate(req, res, next){
  var token = req.headers['x-access-token']

  jwt.verify(token, process.env.SECRET_KEY, function(err, result){
    if (err){
      return res.status(401).json({ error: true, message: "invalid token" })
    }

    User.getByIdAndEmail(result.id, result.email, function(err, user){
      if (err){
        return res.status(401).json(err)
      }

      req.user = { id: user.id, email: user.email }
      next()
    })
    
  })
}

module.exports = authenticate