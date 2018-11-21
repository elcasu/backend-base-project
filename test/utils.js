require('dotenv').config({ path: `${__dirname}/../.env.test` })
const mongoose = require('mongoose');
const asyncLib = require("async");
const factories = require('./factories')

before((done) => {

  const cleanDB = () => {
    
    // Remove all database documents and indexes
    asyncLib.each(mongoose.connection.collections, (collection, callback) => {
      collection.dropIndexes(callback);
    }, () => {
      asyncLib.each(mongoose.connection.models, (model, callback) => {
        // Re-generate indexes
        model.createIndexes(callback);
      }, () => {
        asyncLib.each(mongoose.connection.collections, (collection, callback) => {
          collection.deleteMany(callback);
        }, () => {
          // Register factories
          factories()
          // Run tests
          done();
        });
      });
    });
  }

  // Connect to mongo and clean test database
  mongoose.connect(process.env.DATABASE, { useNewUrlParser: true }, () => {
    // Clean DB and regenerate indexes
    cleanDB();
  });
});

after((done) => {
  mongoose.disconnect();
  return done();
});
