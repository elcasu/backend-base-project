const Author = require('../../app/models/author')
const faker = require('faker')

module.exports = function (factory) {
  factory.define('author', Author, {
    firstName: function () {
      return faker.name.firstName()
    },
    lastName: function () {
      return faker.name.lastName()
    },
    email: function () {
      return faker.internet.email()
    },
    birthday: function () {
      return faker.date.past()
    }
  })
}