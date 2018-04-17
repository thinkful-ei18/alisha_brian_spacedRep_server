'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');
const User = require('../models/User');

const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);

/* =========== GET =========== */
router.get('/', jwtAuth, (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      res.json(user);
    })
    .catch(err => next);
});


module.exports = router;
