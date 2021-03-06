const supertest = require('supertest');
const { assert } = require('chai');
const app = require('../../src/app');

let server;

const NEW_RIDE_JSON = {
  start_lat: 40,
  start_long: 50,
  end_lat: 40,
  end_long: 50,
  rider_name: 'John rider',
  driver_name: 'Michel Knight',
  driver_vehicle: 'Ford GT550',
};

const SQL_INJECTION_JSON = {
  start_lat: 40,
  start_long: 50,
  end_lat: 40,
  end_long: 50,
  rider_name: 'DROP TABLE IF EXISTS Rides',
  driver_name: 'DROP TABLE IF EXISTS Rides',
  driver_vehicle: 'DROP TABLE IF EXISTS Rides',
};

const FAIL_RIDE_JSON = {
  start_lat: 140,
  start_long: 250,
  end_lat: 140,
  end_long: 250,
  rider_name: '',
  driver_name: '',
  driver_vehicle: '',
};

const VALIDATION_ERROR = {
  error_code: 'VALIDATION_ERROR',
  message: 'Start latitude and longitude must be between -90 - 90 and -180 to 180 degrees respectively',
};

const NEW_RIDE_RES = {
  rideID: 1,
  startLat: 40,
  startLong: 50,
  endLat: 40,
  endLong: 50,
  riderName: 'John rider',
  driverName: 'Michel Knight',
  driverVehicle: 'Ford GT550',
};

describe('Ride API tests', () => {
  beforeEach(async () => {
    server = await app();
  });

  describe('POST /rides', () => {
    it('should return new created ride', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...NEW_RIDE_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { ...NEW_RIDE_RES });
        })
        .expect(200, done);
    });

    it('should return validation error', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...FAIL_RIDE_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { ...VALIDATION_ERROR });
        })
        .expect(200, done);
    });

    it('should be not vulnerable to sql injections', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...SQL_INJECTION_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { rideID: 1 });
        })
        .expect(200, done);
    });
  });

  describe('GET /rides', () => {
    it('should return ride that was already in db', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...NEW_RIDE_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { ...NEW_RIDE_RES });
        })
        .expect(200)
        .end(() => {
          supertest(server)
            .get('/rides')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res) => {
              assert.include(res.body[0], { ...NEW_RIDE_RES });
            })
            .expect(200, done);
        });
    });
  });

  describe('GET /rides/p/:p', () => {
    it('Should return page of rides', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...NEW_RIDE_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { ...NEW_RIDE_RES });
        })
        .expect(200)
        .end(() => {
          supertest(server)
            .get('/rides/p/1?size=20')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res) => {
              assert.include(res.body.content[0], { ...NEW_RIDE_RES });
              assert.equal(res.body.page, 1);
              assert.equal(res.body.size, 20);
              assert.equal(res.body.total, 1);
            })
            .expect(200, done);
        });
    });
  });

  describe('GET /ride/:id', () => {
    it('should return ride by id', (done) => {
      supertest(server)
        .post('/rides')
        .send({ ...NEW_RIDE_JSON })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect((res) => {
          assert.include(res.body, { ...NEW_RIDE_RES });
        })
        .expect(200)
        .end(() => {
          supertest(server)
            .get('/rides/1')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect((res) => {
              assert.include(res.body, { ...NEW_RIDE_RES });
            })
            .expect(200, done);
        });
    });
  });
});
