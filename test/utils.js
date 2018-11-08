const execSQL = require('exec-sql');
const path = require('path');
require('dotenv').config({path: `${__dirname}/../.env.test`});

before(function(done) {
  cleanDB(function(){
    done();
  })   
});

beforeEach(function(done) {
  truncTables(function(){
    done();
  })   
});

function connectToDB(){
  execSQL.connect({
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST
  });
}

function cleanDB(done) {
  connectToDB();
  execSQL.executeFile(path.join(__dirname, '../dbscripts/create-test-db.sql'), function(err) {
    execSQL.disconnect();
    if (err) {
      console.log('************ ATENCION ************');
      console.log(' Error while cleaning test DB:', err)
    }
    done();
  });
};

function truncTables(done) {
  connectToDB();  
  execSQL.executeFile(path.join(__dirname, '../dbscripts/truncate-all-tables.sql'), function(err) {
    execSQL.disconnect();
    if (err) {
      console.log('************ ATENCION ************');
      console.log(' Error while truncating all tables: ', err)
    }
    done();
  });
};