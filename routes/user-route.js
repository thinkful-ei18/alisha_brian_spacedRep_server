'use strict';

const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const User = require('../models/User');

/* =========== GET =========== */
router.get('/', (req, res, next) => {

  User.find()
    .then( user => {
      res.json(user);
    })
    .catch(err => next);
});


module.exports = router;
