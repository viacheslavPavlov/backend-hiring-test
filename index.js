const app = require('./src/app');
const logger = require('./src/util/logger');

const port = 8010;

(async () => {
  const server = await app();
  server.listen(port, () => logger.info(`App started and listening on port ${port}`));
})();
