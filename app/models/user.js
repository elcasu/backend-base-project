const mongoose = require("mongoose");
const bcrypt = require('bcrypt-nodejs')
const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: "Email is required",
    index: {
      unique: true
    }
  },
  password: {
    type: String,
    required: "Password is required",
    select: false,
    minlenght: [8, 'Password is too short']
  },
  firstName: {
    type: String,
    trim: true,
    required: "First name is required."
  },
  lastName: {
    type: String,
    trim: true,
    required: "Last name is required."
  }
});

UserSchema.path('email').validate(function (email) {
  const regex = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}, 'Please fill a valid email address.')

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  bcrypt.hash(user.password, null, null, function (err, hash) {
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
})

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password)
}

UserSchema.methods.asJson = function () {
  return {
    _id: this._id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName
  }
}

module.exports = mongoose.model("User", UserSchema);