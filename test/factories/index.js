const factory = require('factory-girl')
const MongooseAdapter = require('factory-girl-mongoose').MongooseAdapter
factory.setAdapter(MongooseAdapter);

const userFactory = require('./userFactory')

module.exports = function () {
  userFactory(factory)
}