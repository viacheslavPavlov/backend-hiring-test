const { assert } = require('chai');
const setupDb = require('../../src/util/setupDb');
const ridesService = require('../../src/service/ride');

let db;
let service;

const NEW_RIDE_1 = {
  startLat: 40,
  startLong: 50,
  endLat: 40,
  endLong: 50,
  riderName: 'John rider',
  driverName: 'Michel Knight',
  driverVehicle: 'Ford GT550',
};

const NEW_RIDE_1_VALUES = [
  NEW_RIDE_1.startLat,
  NEW_RIDE_1.startLong,
  NEW_RIDE_1.endLat,
  NEW_RIDE_1.endLong,
  NEW_RIDE_1.riderName,
  NEW_RIDE_1.driverName,
  NEW_RIDE_1.driverVehicle,
];

const NEW_RIDE_2 = {
  startLat: 10,
  startLong: 20,
  endLat: 70,
  endLong: 90,
  riderName: 'Sam Walker',
  driverName: 'Nat Star',
  driverVehicle: 'Lancer X',
};

const NEW_RIDE_2_VALUES = [
  NEW_RIDE_2.startLat,
  NEW_RIDE_2.startLong,
  NEW_RIDE_2.endLat,
  NEW_RIDE_2.endLong,
  NEW_RIDE_2.riderName,
  NEW_RIDE_2.driverName,
  NEW_RIDE_2.driverVehicle,
];

describe('Ride service tests', () => {
  beforeEach(async () => {
    db = await setupDb();
    service = ridesService(db);
  });

  describe('Insert rides test', () => {
    it('Insert should return lastID', async () => {
      const lastId = await service.insert(NEW_RIDE_1_VALUES);
      assert.equal(lastId, 1);
    });

    it('Insert should insert several items', async () => {
      let lastId = await service.insert(NEW_RIDE_1_VALUES);
      assert.equal(lastId, 1);

      lastId = await service.insert(NEW_RIDE_2_VALUES);
      assert.equal(lastId, 2);
    });
  });

  describe('Get rides test', () => {
    it('Get should return ride', async () => {
      const lastId = await service.insert(NEW_RIDE_1_VALUES);
      assert.equal(lastId, 1);
      const inserted = await service.getOne(lastId);
      assert.include(inserted, NEW_RIDE_1);
    });
  });

  describe('Get all rides test', () => {
    it('Get should return all ride', async () => {
      let lastId = await service.insert(NEW_RIDE_1_VALUES);
      assert.equal(lastId, 1);

      lastId = await service.insert(NEW_RIDE_2_VALUES);
      assert.equal(lastId, 2);

      const rides = await service.getAll();
      assert.include(rides[0], NEW_RIDE_1);
      assert.include(rides[1], NEW_RIDE_2);
    });
  });
});
