'use strict';

let questions = [

  {
    question: 'bread',
    answer: 'le pain',
    M: 1,
    next: {
      question: 'coffee',
      answer: 'le cafe',
      M: 1,
      next: {
        question: 'banana',
        answer: 'banana',
        M: 1,
        next: {
          question: 'chicken',
          answer: 'le poulet',
          M: 1,
          next: {
            question: 'vegetables',
            answer: 'des legumes',
            M: 1,
            next: {
              question: 'fruit',
              answer: 'le fruit',
              M: 1,
              next: {
                question: 'milk',
                answer: 'le lait',
                M: 1,
                next: {
                  question: 'butter',
                  answer: 'le beurre',
                  M: 1,
                  next: {
                    question: 'cake',
                    answer: 'le gateau',
                    M: 1,
                    next: {
                      question: 'pie',
                      answer: 'la tarte',
                      M: 1,
                      next: {
                        question: 'onion',
                        answer: 'le oignon',
                        M: 1,
                        next: {
                          question: 'eggs',
                          answer: 'des oeufs',
                          M: 1,
                          next: {
                            question: 'cheese',
                            answer: 'le fromage',
                            M: 1,
                            next: {
                              question: 'french fries',
                              answer: 'les frites',
                              M: 1,
                              next: {
                                question: 'chocolate',
                                answer: 'le chocolat',
                                M: 1,
                                next: {
                                  question: 'sugar',
                                  answer: 'le sucre',
                                  M: 1,
                                  next: {
                                    question: 'cream',
                                    answer: 'la creme',
                                    M: 1,
                                    next: {
                                      question: 'carrot',
                                      answer: 'le carotte',
                                      M: 1,
                                      next: {
                                        question: 'apple',
                                        answer: 'la pomme',
                                        M: 1,
                                        next: {
                                          question: 'orange',
                                          answer: 'las orange',
                                          M: 1,
                                          next: null
                                        }}}}}}}}}}}}}}}}}}}}
];
  

module.exports = questions;
