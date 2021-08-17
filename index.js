const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

const app = require('./src/app');
const logger = require('./src/util/logger');

const port = 8010;

const buildSchemas = require('./src/schemas');

db.serialize(() => {
  buildSchemas(db);

  app(db).listen(port, () => logger.info(`App started and listening on port ${port}`));
});
