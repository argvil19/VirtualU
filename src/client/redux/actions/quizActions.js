import fetch from 'isomorphic-fetch';

/*
* Handles quiz actions
* GET /API/course/quiz?courseName=STRING&chapterName=STRING&isAssignment=BOOLEAN
*/

export const REQUEST_COURSE_QUIZ = 'REQUEST_COURSE_QUIZ';
export const RECEIVE_COURSE_QUIZ = 'RECEIVE_COURSE_QUIZ';
export const ERROR_COURSE_QUIZ = 'ERROR_COURSE_QUIZ';

function requestCourseQuiz() {
  return {
    type: REQUEST_COURSE_QUIZ
  };
}

function receiveCourseQuiz(json) {
  console.log(json);
  return {
    type: RECEIVE_COURSE_QUIZ,
    payload: json.data
  };
}

function errorCourseQuiz(err) {
  return {
    type: ERROR_COURSE_QUIZ,
    payload: err.message
  };
}

export function fetchCourseQuiz(params) {
  return (dispatch, getState) => {
    dispatch(requestCourseQuiz());

    fetch(`/API/course/quiz?courseName=${params.courseName}&chapterName=${params.chapterName}&isAssignment=${params.isAssignment}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('token')
      }
    }).then(res => res.json())
      .then((res) => {
        if (params.isAssignment) {
          res.data.isAssignment = true;
        }
        dispatch(receiveCourseQuiz(res));
      });
  };
}

/*
* Send quiz to parse
* POST API/course/quiz/check
*/

export const SEND_QUIZ = 'SEND_COURSE_QUIZ';
export const RECEIVE_QUIZ_RESULT = 'RECEIVE_QUIZ_RESULT';
export const ERROR_QUIZ_RESULT = 'ERROR_QUIZ_RESULT';

function sendQuiz() {
  return {
    type: SEND_QUIZ
  };
}

function receiveQuizResult(json) {
  return {
    type: RECEIVE_QUIZ_RESULT,
    payload: json.data
  };
}

function errorQuizResult(err) {
  return {
    type: ERROR_QUIZ_RESULT,
    payload: err.message
  };
}

export function postSendQuiz(params) {
  return (dispatch, getState) => {
    dispatch(sendQuiz());
    const body = Array.isArray(params)? params : [params];

    fetch(`/API/course/quiz/check`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'jwt': localStorage.getItem('token')
      },
      body: JSON.stringify({
        questions: body
      })
    }).then(res => res.json())
      .then(res => {
        if (params.isAssignment) {
          res.data.isAssignment = true;
        }

        res.data = getState().quizzes.assignments.map(item => {
          if (item._id === params.questionId) {
            return res.data[0]
          }
          return item;
        });
        
        dispatch(receiveQuizResult(res));
      });
  };
}
