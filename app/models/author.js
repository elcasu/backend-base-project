const mongoose = require('mongoose')

const AuthorSchema = new mongoose.Schema({
  firstName: {type: String, required: 'First name is required.', trim: true},
  lastName: {type: String, required: 'Last name is required.', trim: true},
  birthday: {type: Date, required: 'Birthday is required'},
  email: {type: String, required: 'Email is required'}
})

AuthorSchema.path('email').validate(function(email){
  const regex = /^\w+([\+\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
}, 'Please fill a valid email.')

AuthorSchema.methods.asJson = function () {
  return {
    firstName: this.firstName,
    lastName: this.lastName,
    birthday: this.birthday,
    email: this.email
  }
}

module.exports = mongoose.model('Author', AuthorSchema)