var User = require("../models/user");
var jwt = require('jsonwebtoken');

function login(req, res) {
  User.getByEmailAndPassword(req.body.email, req.body.password, function(err, result) {
    if (err) {      
      return res.status(401).json(err)
    }
 
    jwt.sign({ id: result.id, email: result.email }, process.env.SECRET_KEY, { expiresIn: 300 }, function (err, r){
      if (err){
        return res.status(500)
      } else {
        res.status(200).json({ 'x-access-token': r })
      }    
    })

  })
}

module.exports.login = login;
