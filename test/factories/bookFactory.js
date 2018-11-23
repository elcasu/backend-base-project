const Book = require('../../app/models/book')
const faker = require('faker')
const genres = require('../../genres')

module.exports = function (factory) {
  factory.define('book', Book, {
    title: function () {
      return faker.lorem.word()
    },
    isbn: function () {
      return faker.lorem.word()
    },
    genres: function () {
      return [genres[0]]
    }
  })
}