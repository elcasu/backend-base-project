const factory = require('factory-girl')
const MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter
factory.setAdapter(MongooseAdapter);

const userFactory = require('./userFactory')
const authorFactory = require('./authorFactory')
const bookFactory = require('./bookFactory')

module.exports = function () {
  userFactory(factory)
  authorFactory(factory)
  bookFactory(factory)
}