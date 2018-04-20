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


/* =========== GET QUESTION FOR USER =========== */
router.get('/question', jwtAuth, (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      let qAndA = {
        question: user.questions[0].head.question,
        answer: user.questions[0].head.answer,
        score: user.score
      };
      res.json(qAndA);
    })
    .catch(err => next);
});


/* =========== VALIDATE USER ANSWER =========== */
router.put('/validate', jwtAuth, (req, res, next) => {
  const userId = req.user.id;
  const input = req.body.input;
  let score;

  User.findById(userId)
    .then(user => {
      if (user.questions[0].head.answer === input) {
        user.questions[0].head.M = user.questions[0].head.M * 2;
        score = user.score + 1;
      } else {
        user.questions[0].head.M = 1;
        score = user.score;
      }

      return insertAt(user.questions[0]);
    })
    .then( questions => {
      
      User.findByIdAndUpdate(userId, {questions: [questions], score}, {upsert: false, new: true } )
        .then( user => {

          let qAndA = {
            question: questions.head.question,
            answer: questions.head.answer,
            score
          };

          res.json(qAndA);
        });
    })
    .catch(err => next);

});


const insertAt = questions => {

  let reinsert = questions;
  let currentNode = questions.head;
  let previousNode;

  for (let i=0; i<questions.head.M+1; i++) {
    previousNode = currentNode; 
    currentNode = currentNode.next; 
  }

  previousNode.next = {
    question: reinsert.head.question,
    answer: reinsert.head.answer,
    M: reinsert.head.M,
    next: currentNode 
  };
  reinsert.head = reinsert.head.next;

  return reinsert;
};


module.exports = router;
