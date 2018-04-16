'use strict';

const passport = require('passport');
const mongoose = require('mongoose');
const express = require('express');

const User = require('../models/User');
const { Strategy: LocalStrategy } = require('passport-local');

//Setting up local login strategy
const localStrategy = new LocalStrategy((username, password, done) => {
  let user;
  User.findOne({ username })
    .then(results => {
      user = results;
      if (!user) {
        return Promise.reject({
          reason: 'Login Eror',
          message: 'Wrong username',
          location: 'username'
        });
      }

      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return Promise.reject({
          reason: 'Login Error',
          message: 'Wrong password',
          location: 'password'
        });
      }
      return done(null, user);
    })
    .catch(err => {
      if (err.reason === 'Login Error') {
        return done(null, false);
      }

      return done(err);
    });
});

module.exports = localStrategy;