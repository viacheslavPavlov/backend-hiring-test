const logger = require('../util/logger');

const ridesService = (db) => {
  const getAll = async () => {
    logger.info('Fetching all rides');
    const res = await db.all('SELECT * FROM Rides');
    logger.info(`Fetched rides: ${JSON.stringify(res)}`);

    return res;
  };

  const getOne = async (id) => {
    try {
      logger.info(`Fetching ride with id: ${id}`);
      const res = await db.all(`SELECT * FROM Rides WHERE rideID='${id}'`);
      logger.info(`Fetched ride: ${JSON.stringify(res)}`);

      if (res.length === 0) {
        logger.warn(`RIDES_NOT_FOUND_ERROR while fetching ride with id ${id}`);
        return {
          error_code: 'RIDES_NOT_FOUND_ERROR',
          message: 'Could not find any rides',
        };
      }
      logger.info(`Fetched from db: ${JSON.stringify(res[0])}`);
      return res[0];
    } catch (err) {
      logger.warn(`Server error while fetching ride with id ${id}, \n Err: ${err}`);
      return {
        error_code: 'SERVER_ERROR',
        message: err,
      };
    }
  };

  const insert = async (values) => {
    const res = await db.run('INSERT INTO Rides(startLat, startLong, endLat, endLong, riderName, driverName, driverVehicle) VALUES (?, ?, ?, ?, ?, ?, ?)', values);

    return res.lastID;
  };

  return {
    getOne,
    getAll,
    insert,
  };
};

module.exports = ridesService;
