var Example = require("../models/example");

function getList(req, res) {
  console.log('Current user', req.user)
  Example.getAll(function(err, result) {
    if (err) {      
      return res.status(500).json({
        message: err
      })
    }
    res.status(200).json(result)
  })
}

module.exports.getList = getList;
