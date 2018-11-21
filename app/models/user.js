var connection = require('../../database')

var User = function(email, password) {
  this.email = email;  
  this.password = password;  
}

User.getByEmailAndPassword = function (email, password, cb) {
  connection.query(`SELECT id, email FROM users where email = '${email}' AND password = '${password}'`, function(err, res){    
    if (err || !res.length){
      return cb({ error: true, message: "invalid credentials." })
    } 
    cb(null, res[0])
  })
}


User.getByIdAndEmail = function (id, email, cb) {
  connection.query(`SELECT id, email FROM users where email = '${email}' AND id = '${id}'`, function(err, res){
    if (err || !res.length){
      return cb({ error: true, message: "invalid credentials." })
    } 
    cb(null, res[0])
  })
}


module.exports = User
