const User = require("../models/user");

function create (req, res) {
  const user = new User()
  user.email = req.body.email
  user.password = req.body.password
  user.firstName = req.body.firstName
  user.lastName = req.body.lastName

  user.save(function (err) {
    if (err) {
      return res.status(400).send(err)
    }

    res.status(201).send(user.asJson())
  })
}

module.exports.create = create;
