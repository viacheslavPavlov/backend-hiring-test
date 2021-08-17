import sqlite3 from 'sqlite3';

import app from './src/app';

import logger from './src/util/logger';

const port = 8010;

const DB = new sqlite3.verbose().Database(':memory:');

const buildSchemas = require('./src/schemas');

DB.serialize(() => {
  buildSchemas(DB);

  app.listen(port, () => logger.info(`App started and listening on port ${port}`));
});
