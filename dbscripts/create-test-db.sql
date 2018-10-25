DROP DATABASE IF EXISTS test_db;

CREATE DATABASE test_db;

USE test_db;

CREATE TABLE IF NOT EXISTS example_table (
  id INT NOT NULL AUTO_INCREMENT,
  field1 VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);