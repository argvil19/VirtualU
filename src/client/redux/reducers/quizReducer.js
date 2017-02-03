'use strict';

import {
  REQUEST_COURSE_QUIZ,
  RECEIVE_COURSE_QUIZ,
  ERROR_COURSE_QUIZ,
  
  SEND_QUIZ,
  RECEIVE_QUIZ_RESULT,
  ERROR_QUIZ_RESULT
}                                           from '../actions/quizActions';

const initialState = {
  quizzes: [],
  assignments: [],
  loading: false,
  loaded: false,
  error: null
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SEND_QUIZ:
    case REQUEST_COURSE_QUIZ:
      return {
        ...state,
        loading: true
      };

    case RECEIVE_COURSE_QUIZ:
      if (action.payload.isAssignment) {
        action.payload = action.payload.map(item => {
          if (item.questionType === 'coding') {
            if (item.expectedResult.length > 1 && Array.isArray(item.expectedResult)) {
              item.expectedResult = item.expectedResult.sort(function(a, b){return 0.5 - Math.random()});
              item.isRandom = true;
            }
            item.expectedResult = item.expectedResult[0];
          } else if (item.questionType === 'multiple select') {
            item.questionOptionsSelect = item.questionOptionsSelect.sort(function(a, b){return 0.5 - Math.random()});
          } else if (item.questionType === 'multiple choice') {
            item.questionOptionsChoice = item.questionOptionsChoice.sort(function(a, b){return 0.5 - Math.random()});
          }
          
          return item;
        });
        
        return {
          ...state,
          loading: false,
          loaded: true,
          assignments: action.payload
        };
      }

      return {
        ...state,
        loading: false,
        loaded: true,
        quizzes: action.payload
      };

    case ERROR_COURSE_QUIZ:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.payload
      };
      
    case RECEIVE_QUIZ_RESULT:
      // Sorts expected result on coding questions. Pick one random answer
      action.payload = action.payload.map(item => {
        if (item.questionType === 'coding') {
          if (item.lastAnswer) {
            item.expectedResult = item.lastAnswer;
            item.isRandom = true;
          }
        }
        
        return item;
      });
      
      return {
        ...state,
        assignments: action.payload,
        loading: false,
        loaded: true
      };
      break;
    

    default:
      return state;
  }
}
