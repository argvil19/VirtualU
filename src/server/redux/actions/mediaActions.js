import fetch from 'isomorphic-fetch';

/*
* Course materials
* GET /API/course/chapter/media/get?courseName=STRING&chapterName=STRING&fileType=['PDF', 'Video']
*/

export const REQUEST_COURSE_MATERIAL = 'REQUEST_COUSE_MATERIAL';
export const RECEIVE_COURSE_MATERIAL = 'RECEIVE_COURSE_MATERIAL';
export const ERROR_COURSE_MATERIAL = 'ERROR_COURSE_MATERIAL';

function check(response) {
  let res = response.json();

  if (!response.ok) {
    res = res.then(err => {
      const error = err.message;

      throw new Error(error);
    });
  }
  return res;
}

function requestCourseMaterial() {
  return {
    type: REQUEST_COURSE_MATERIAL
  };
}

function receiveCourseMaterial(json, mediaType) {
  return {
    mediaType,
    type: RECEIVE_COURSE_MATERIAL,
    payload: json.data
  };
}

function errorCourseMaterial(err) {
  return {
    type: ERROR_COURSE_MATERIAL,
    payload: err.message
  };
}

export function fetchCourseMaterial(params) {
  return (dispatch) => {
    dispatch(requestCourseMaterial());

    fetch(`/API/course/chapter/media/get?courseName=${params.courseName
    }&chapterName=${params.chapterName}&fileType=${params.fileType}`,
      {
        headers: {
          contentType: 'application/json',
          jwt: localStorage.getItem('token')
        }
      }).then(res => check(res))
        .then(res => dispatch(receiveCourseMaterial(res, params.fileType)))
        .catch(error => dispatch(errorCourseMaterial(error)));
  };
}
