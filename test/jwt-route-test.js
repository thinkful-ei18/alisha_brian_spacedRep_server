'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');

const { app } = require('../index');
const User = require('../models/User');
const { TEST_DATABASE_URL } = require('../config');
const { dbConnect, dbDisconnect } = require('../db-mongoose');

process.env.NODE_ENV = 'test';

process.stdout.write('\x1Bc\n'); // Clear the console before each run

const expect = chai.expect;
chai.use(chaiHttp);

/* ========== TESTING HOOKS ========== */

before(function () {
  return dbConnect(TEST_DATABASE_URL);
});

beforeEach(function () { });

afterEach(function () {
  return User.remove();
});

after(function () {
  return dbDisconnect();
});



/* ========== ROUTE TESTS ========== */
describe('tests for endpoints at /api/login:', () => {

  describe('authenticate with username && password', () => {
    const username = 'kevin35';
    const password = 'dubnation';

    it('should fail with an unregistered username', () => {
      return chai.request(app)
        .post('/api/login')
        .send({ username: 'kevon5', password })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Wrong username');
          expect(res).to.have.status(422);
        });
    });

    it('should fail with an unregistered password', () => {
      return chai.request(app)
        .post('/api/login')
        .send({ username, password: 'dubbbbbbbs' })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Wrong username');
          expect(res).to.have.status(422);
        });
    });

    // it('should allow the user to log in', () => {
    //   return chai.request(app)
    //     .post('/api/login')
    //     .send({ username, password })
    //     .then(res => {
    //       expect(res).to.have.status(200);
    //       expect(res.body).to.be.an('object');
    //       expect(res.body).to.have.keys('authToken');
    //     });
    // });

  });

});