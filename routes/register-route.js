'use strict';
const express = require('express');
const router = express.Router();

const User = require('../models/User');
const Question = require('../models/Question');
const LinkedList = require('../seedData/linkedList');
const seedData = require('../seedData/questions');


router.post('/', (req, res, next) => {

  // VERIFY THAT ALL REQUIRED FIELDS ARE IN REQ.BODY
  const requiredFields = ['email', 'username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(
      'Missing email, username or password in request body'
    );
    err.status = 422;
    return next(err);
  }

  // VERIFY THAT ALL FIELDS ARE A STRING
  const stringFields = ['fullname', 'email', 'username', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  // VERIFY THAT THE REQUIRED FIELDS DON'T HAVE A SPACE AT THE BEGINNING OR END
  const noWhiteSpaces = ['email', 'username', 'password'];
  const withWhiteSpaces = noWhiteSpaces.find(
    field => req.body[field].trim() !== req.body[field]
  );
  if (withWhiteSpaces) {
    const err = new Error(
      `Field: '${withWhiteSpaces}' cannot start or end with whitespace`
    );
    err.status = 422;
    return next(err);
  }

  // VERIFY THE UN/PW FIELDS MEET THE LENGTH REQUIREMENTS
  const sizedFields = {
    username: { min: 1 },
    password: { min: 8, max: 72 }
  };

  const tooSmall = Object.keys(sizedFields).find(
    field =>
      'min' in sizedFields[field] &&
			req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmall) {

    const min = sizedFields[tooSmall].min;
    const err = new Error(
      `Field: '${tooSmall}' must be at least ${min} characters long`
    );
    err.status = 422;
    return next(err);
  }

  const tooLong = Object.keys(sizedFields).find(
    field =>
      'max' in sizedFields[field] &&
			req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLong) {

    const max = sizedFields[tooLong].max;
    const err = new Error(
      `Field: '${tooSmall}' must be at most ${max} characters long`
    );
    err.status = 422;
    return next(err);
  }


  /* ============================== 
  PREPARE QUESTIONS FOR USER SCHEMA - created these two functions to prevent returning pending promises in the user creation process
  ============================== */

  // this function seeds the Question collection
  const seedDocuments = obj => {
    Question.create({ question: obj.question, answer: obj.answer})
      .then(results => {
        if(seedData.length) {
          seedDocuments(seedData.shift());
        }
        else {
          return Question.find().exec()
            .then(questions => createQLL(questions));
        }
        return true;
      });
  };

  // make a LL with the items from the Question collection
  const createQLL = questionsfromDb => {
    let QLL = new LinkedList();
    questionsfromDb.map(obj => QLL.insertLast({ question: obj.question, answer: obj.answer, M:1 }));
    return QLL;
  };

  

  /* ============================== 
  CREATE USER 
  ============================== */
  let { fullname ='', email, username, password = '' } = req.body;
  email = email.trim();
  const score = 0;
  
  User.find({ username })
    .count()
    .then(count => {
      if (count) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      return Question.find();
    })
    // HANDLE SEEDING/READING THE QUESTION COLLECTION
    .then(result => {
      if (result.length < 1) {
        seedDocuments(seedData.shift());
      }
      else {
        return createQLL(result);
      }
    })
    .then(linkedList => {
      // HASH THE PW
      return User.hashPassword(password)
        .then(digest => ({linkedList, digest}));
    })
    // PASS ON THE LINKED LIST AND HASHED PW
    .then( results => {
      const newUser = {
        fullname,
        email,
        username,
        password: results.digest,
        questions: results.linkedList,
        score
      };
      return User.create(newUser);
    })
    .then(result => {

      return res
        .status(201)
        .location(`/auth/register/${result.id}`)
        .json(result);
    })
    .catch(err => {
      if (err.code === 11000) {
        err = new Error('That username is taken');
        err.status = 400;
      }
      next(err);
    });
});

module.exports = router;