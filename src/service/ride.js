const logger = require('../util/logger');

const ridesService = (db) => {
  const getAll = async () => {
    logger.info('Fetching all rides');
    const res = await db.all('SELECT * FROM Rides');
    logger.info(`Fetched rides: ${JSON.stringify(res)}`);

    return res;
  };

  const getPage = async (page = 0, size = 20) => {
    try {
      logger.info(`Fetching rides ${page} page, size: ${size}`);
      const content = await db.all('SELECT * FROM Rides limit ? offset ?', [size, (page - 1) * size]);
      const amount = await db.get('SELECT count(*) FROM Rides', []);

      const total = Math.ceil(Object.values(amount)[0] / size);

      const paged = {
        content,
        page,
        size,
        total,
      };

      logger.info(`Fetched rides' page: ${JSON.stringify(paged)}`);
      return paged;
    } catch (e) {
      logger.error(`Fetching ride page (p: ${page}, s: ${size}) error: ${e}`);
      throw new Error(e);
    }
  };

  const getOne = async (id) => {
    try {
      logger.info(`Fetching ride with id: ${id}`);
      const res = await db.all('SELECT * FROM Rides WHERE rideID=?', [+id]);
      logger.info(`Fetched ride: ${JSON.stringify(res)}`);

      if (res.length === 0) {
        logger.error(`RIDES_NOT_FOUND_ERROR while fetching ride with id ${id}`);
        return {
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        };
      }
      logger.info(`Fetched from db: ${JSON.stringify(res[0])}`);
      return res[0];
    } catch (err) {
      logger.error(`Server error while fetching ride with id ${id}, \n Err: ${err}`);
      return {
        error_code: 'SERVER_ERROR',
        message: err,
      };
    }
  };

  const insert = async (values) => {
    try {
      logger.info(`Inserting new ride: ${values}`);
      const res = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);

      return res.lastID;
    } catch (e) {
      logger.error(`Error while inserting ride: ${e}`);
      throw e;
    }
  };

  return {
    getOne,
    getPage,
    getAll,
    insert,
  };
};

module.exports = ridesService;
