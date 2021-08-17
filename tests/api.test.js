const supertest = require('supertest');
const sqlite3 = require('sqlite3');
const app = require('../src/app');

const db = new sqlite3.Database(':memory:');
const buildSchemas = require('../src/schemas');

describe('API tests', () => {
  before((done) => {
    db.serialize((err) => {
      if (err) {
        return done(err);
      }

      buildSchemas(db);

      return done();
    });
  });

  describe('GET /health', () => {
    it('should return health', (done) => {
      supertest(app(db))
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
