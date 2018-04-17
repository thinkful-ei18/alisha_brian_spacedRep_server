'use strict';
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');
const Questions = require('../models/questions');


//POST
router.post('/', (req, res, next) => {

  const requiredFields = ['email', 'username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(
      'Missing email, username or password in request body'
    );
    err.status = 422;
    return next(err);
  }

  const stringFields = ['fullname', 'email', 'username', 'password'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  //TRIM SPACE BUT NOT ON PASSWORD
  const noWhiteSpaces = ['username'];
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

  //LENGTH REQUIREMENTS
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

  //MAKE THAT USER, UNLESS
  let { fullname ='', email, username, password = '' } = req.body;
  email = email.trim();
  let questions = Questions;
  

  const newUser = { fullname, email, username, password, questions };

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
      return User.hashPassword(password);
    })
    .then(digest => {

      const newUser = {
        fullname,
        email,
        username,
        password: digest,
        questions
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