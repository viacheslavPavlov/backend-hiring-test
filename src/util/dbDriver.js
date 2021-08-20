const sqlite3 = require('sqlite3').verbose();

let db;

const driver = {};

driver.open = function (path) {
  return new Promise((resolve, reject) => {
    db = new sqlite3.Database(path,
      ((err) => {
        if (err) reject(err);
        else resolve(db);
      }));
  });
};

// any query: insert/delete/update
driver.run = function (query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params,
      function (err) {
        if (err) reject(err.message);
        else resolve(this);
      });
  });
};

// first row read
driver.get = function (query, params) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else {
        resolve(row);
      }
    });
  });
};

// set of rows read
driver.all = function (query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else {
        resolve(rows);
      }
    });
  });
};

// each row returned one by one
driver.each = function (query, params, action) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.each(query, params, (err, row) => {
        if (err) reject(err);
        else if (row) {
          action(row);
        }
      });
      db.get('', (err, row) => {
        resolve(row);
      });
    });
  });
};

driver.close = function () {
  return new Promise((resolve) => {
    db.close();
    resolve(true);
  });
};

module.exports = driver;
