'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);

/* =========== GET USER =========== */
router.get('/', jwtAuth, (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      res.json(user);
    })
    .catch(err => next);
});


/* =========== GET QUESTION HEAD FOR USER =========== */
router.get('/question', jwtAuth, (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      console.log('USER:', user);
      res.json(user.questions[0].value);
    })
    .catch(err => next);
});


module.exports = router;
