const supertest = require('supertest');
const app = require('../../src/app');

let server;

describe('API tests', () => {
  beforeEach(async () => {
    server = await app();
  });

  describe('GET /health', async () => {
    it('should return health', (done) => {
      supertest(server)
        .get('/health')
        .expect('Content-Type', /text/)
        .expect(200, done);
    });
  });
});
