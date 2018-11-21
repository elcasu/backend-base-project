const User = require('../../app/models/user')
const faker = require('faker')
module.exports = function (factory) {
  factory.define('user', User, {
    email: function () {
      return faker.internet.email();
    },
    password: function () {
      return faker.internet.password()
    },
    firstName: function () {
      return faker.name.firstName()
    },
    lastName: function () {
      return faker.name.lastName()
    }
  })
}