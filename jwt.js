var jwt = require('jsonwebtoken')


jwt.sign({ name: "Diego", test: true, id: 2 }, "mySecret", { expiresIn: 60 }, function (err, res){
  if (err){
    console.log("error!", err)
  } else {
    jwt.verify(res, "mySecret", function(err, res){
      if (err){
        console.log("error!", err)
      } else
        console.log("resultado", res);
    })
  }    
})

var user = jwt.verify(token, "mySecret", function(err, res){
  if (err){
    console.log("error!", err)
  } else
    console.log(res);
})