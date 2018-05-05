'use strict';

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User');

const options = { session: false, failWithError: true };
const jwtAuth = passport.authenticate('jwt', options);
router.use(jwtAuth); // every route on this page will run through jwtAuth

/* =========== GET USER =========== */
router.get('/', (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      res.json(user);
    })
    .catch(err => next);
});


/* =========== GET QUESTION FOR USER =========== */
router.get('/question', (req, res, next) => {

  const userId = req.user.id;

  User.findById(userId)
    .then( user => {
      let qAndA = {
        question: user.questions[0].head.value.question,
        answer: user.questions[0].head.value.answer,
        score: user.score
      };
      res.json(qAndA);
    })
    .catch(err => next);
});


/* =========== VALIDATE USER ANSWER =========== */
router.put('/validate', (req, res, next) => {
  const userId = req.user.id;
  const input = req.body.input;
  let score;

  User.findById(userId)
    .then(user => {
      if (user.questions[0].head.value.answer === input) {
        user.questions[0].head.value.M = user.questions[0].head.value.M * 2;
        score = user.score + 1;
      } else {
        user.questions[0].head.value.M = 1;
        score = user.score;
      }

      return insertAt(user.questions[0]);
    })
    .then( questions => {
      
      User.findByIdAndUpdate(userId, {questions: [questions], score}, {upsert: false, new: true } )
        .then( user => {

          let qAndA = {
            question: questions.head.value.question,
            answer: questions.head.value.answer,
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

  for (let i=0; i<questions.head.value.M+1; i++) {
    previousNode = currentNode; 
    currentNode = currentNode.next; 
  }

  previousNode.next = {
    question: reinsert.head.value.question,
    answer: reinsert.head.value.answer,
    M: reinsert.head.value.M,
    next: currentNode 
  };
  reinsert.head = reinsert.head.next;

  return reinsert;
};


/* =========== RESET USER SCORE TO 0 =========== */
router.post('/reset', (req, res, next) => {

  const userId = req.user.id;
  
  User.findByIdAndUpdate(userId, {score: 0}, {upsert: false, new: true } )
    .then(user => {
      res.json(user);
    })
    .catch(err => next);
});


module.exports = router;
