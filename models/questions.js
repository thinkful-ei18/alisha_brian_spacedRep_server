'use strict';

let questions = [

  {
    value: {
      question: 'bread',
      answer: 'le pain',
      M: 1
    },
    next: {
      value:{
        question: 'coffee',
        answer: 'le cafe',
        M: 1
      },
      next: {
        value:{
          question: 'banana',
          answer: 'banana',
          M: 1
        },
        next: {
          value:{
            question: 'chicken',
            answer: 'le poulet',
            M: 1
          },
          next: {
            value:{
              question: 'vegetables',
              answer: 'des legumes',
              M: 1
            },
            next: {
              value:{
                question: 'fruit',
                answer: 'le fruit',
                M: 1
              },
              next: {
                value:{
                  question: 'milk',
                  answer: 'le lait',
                  M: 1
                },
                next: {
                  value:{
                    question: 'butter',
                    answer: 'le beurre',
                    M: 1
                  },
                  next: {
                    value:{
                      question: 'cake',
                      answer: 'le gateau',
                      M: 1
                    },
                    next: {
                      value:{
                        question: 'pie',
                        answer: 'la tarte',
                        M: 1
                      },
                      next: {
                        value:{
                          question: 'onion',
                          answer: 'le oignon',
                          M: 1
                        },
                        next: {
                          value:{
                            question: 'eggs',
                            answer: 'des oeufs',
                            M: 1
                          },
                          next: {
                            value:{
                              question: 'cheese',
                              answer: 'le fromage',
                              M: 1
                            },
                            next: {
                              value:{
                                question: 'french fries',
                                answer: 'les frites',
                                M: 1
                              },
                              next: {
                                value:{
                                  question: 'chocolate',
                                  answer: 'le chocolat',
                                  M: 1
                                },
                                next: {
                                  value:{
                                    question: 'sugar',
                                    answer: 'le sucre',
                                    M: 1
                                  },
                                  next: {
                                    value:{
                                      question: 'cream',
                                      answer: 'la creme',
                                      M: 1
                                    },
                                    next: {
                                      value:{
                                        question: 'carrot',
                                        answer: 'le carotte',
                                        M: 1
                                      },
                                      next: {
                                        value:{
                                          question: 'apple',
                                          answer: 'la pomme',
                                          M: 1
                                        },
                                        next: {
                                          value:{
                                            question: 'orange',
                                            answer: 'las orange',
                                            M: 1
                                          },
                                          next: null
                                        }}}}}}}}}}}}}}}}}}}}
];
  

module.exports = questions;
