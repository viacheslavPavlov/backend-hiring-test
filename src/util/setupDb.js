const buildSchemas = require('../schemas');
const dbDriver = require('./dbDriver');

const setupDb = async () => {
  await dbDriver.open(':memory');

  await buildSchemas(dbDriver);

  return dbDriver;
};

module.exports = setupDb;
