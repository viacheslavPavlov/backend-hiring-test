const express = require('express');

const app = express();

const rideRouter = require('./routes/ride');
const utilRouter = require('./routes/util');
const setupDb = require('./util/setupDb');

const server = async () => {
  const db = await setupDb();

  app.use(rideRouter(db));
  app.use(utilRouter());

  return app;
};

module.exports = server;
