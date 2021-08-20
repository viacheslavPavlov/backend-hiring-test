module.exports = async (db) => {
  const removeSchemas = 'DROP TABLE IF EXISTS Rides';

  await db.run(removeSchemas);

  const createRideTableSchema = `
        CREATE TABLE IF NOT EXISTS Rides
        (
        rideID INTEGER PRIMARY KEY AUTOINCREMENT,
        startLat DECIMAL NOT NULL,
        startLong DECIMAL NOT NULL,
        endLat DECIMAL NOT NULL,
        endLong DECIMAL NOT NULL,
        riderName TEXT NOT NULL,
        driverName TEXT NOT NULL,
        driverVehicle TEXT NOT NULL,
        created DATETIME default CURRENT_TIMESTAMP
        )
    `;

  await db.run(createRideTableSchema);

  return db;
};
