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
describe('tests for endpoints at /api/register:', () => {

  describe('verify the required fields are present in the req.body', () => {
    const email = 'kevin@gmail.com';
    const username = 'kevin35';
    const password = 'dubnation';

    it('should fail without an email', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ username, password })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Missing email, username or password in request body');
          expect(res).to.have.status(422);
        });
    });

    it('should fail without a username', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ email, password })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Missing email, username or password in request body');
          expect(res).to.have.status(422);
        });
    });

    it('should fail without a password', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ email, username })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Missing email, username or password in request body');
          expect(res).to.have.status(422);
        });
    });

  });


  describe('verify that the email, username && password  fields do not have whitespace', () => {

    const email = 'kevin@gmail.com';
    const username = 'kevin35';
    const password = 'dubnation';

    it('should fail if the email has whitespace', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ email: 'kevin@gmail.com ', username, password })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Field: \'email\' cannot start or end with whitespace');
          expect(res).to.have.status(422);
        });
    });

    it('should fail if the username has whitespace', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ email, username: 'kevin35 ', password })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Field: \'username\' cannot start or end with whitespace');
          expect(res).to.have.status(422);
        });
    });

    it('should fail if the password has whitespace', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ email, username, password: 'dubnation ' })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Field: \'password\' cannot start or end with whitespace');
          expect(res).to.have.status(422);
        });
    });

  });


  describe('when registering a user it: ', () => {

    const fullname = '';
    const email = 'kevin@gmail.com';
    const username = 'kevin35';
    const password = 'dubnation';
    const questions = [
      {
        'head': {
          'question': 'le pain',
          'answer': 'bread',
          'M': 1,
          'next': {
            'question': 'le cafe',
            'answer': 'coffee',
            'M': 1,
            'next': null }}}];
    const score = 0;

    it('should fail if the username already exists', () => {
      return User.create({ fullname, email, username, password, questions, score })
        .then(() => {
          return chai.request(app)
            .post('/api/register')
            .send({ fullname, email, username, password, questions, score });
        })
        .then(res => {
          expect(res).to.not.exist;
        })
        .catch(err => {
          const res = err.response;
          expect(res.body.message).to.equal('Username already taken');
        });
    });

    it('should create a new user and make sure the pw is hashed', () => {
      return chai.request(app)
        .post('/api/register')
        .send({ fullname, email, username, password, questions, score })
        .then(res => {
          expect(res).to.have.status(201);
          expect(res.body).to.be.an('object');
          expect(res.body).to.have.keys('id', 'fullname', 'email', 'username', 'questions', 'score');
          expect(res.body.username).to.equal(username);
          return User.findOne({ username: username });
        })
        .then(user => {
          expect(user).to.not.be.null;
          return user.validatePassword(password);
        })
        .then(result => {
          expect(result).to.be.true;
        });
    });
  });

});