import fetch from 'isomorphic-fetch';
import RootPath from '../../../fetchPath';

export const RECIEVE_SUBSCRIBE = 'RECIEVE_SUBSCRIBE';

function recieveSubscribe(json) {
	console.log(json);
	return {
		type: RECIEVE_SUBSCRIBE
	}
}

function fetchSubscribeDo(course) {
	return dispatch => {
		dispatch(requestCourses());
		return fetch(`${RootPath}/API/user/courses`, {
			method: 'PUT',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json',
				'jwt': localStorage.getItem('token') 
			},
			body: JSON.stringify({
				courseName: course
			})
		})
			.then(response => response.json())
			.then(json => dispatch(recieveSubscribe(json)));
	};
}

export function fetchSubscribe(course) {
	return (dispatch, getState) => {
		return dispatch(fetchSubscribeDo(course));
	};
}

export const REQUEST_COURSES = 'REQUEST_COURSES';
export const RECIEVE_COURSES = 'RECIEVE_COURSES';
export const ERROR_COURSES = 'ERROR_COURSES';

function requestCourses() {
	return {
		type: REQUEST_COURSES
	};
}

function recieveCourses(json) {
	console.log('recieveCourses');
	if (!json.success) {
		return errorCourses(json.message);
	}

	return {
		type: RECIEVE_COURSES,
		courses: json.data
	};
}

function errorCourses(error) {
	return {
		type: ERROR_COURSES,
		error
	};
}

function shouldFetchCourses(state) {
	const courses = state.courses;
	return !courses.loading;
}

function fetchCoursesDo(username, password) {
	console.log('fetchCoursesDo');
	return dispatch => {
		dispatch(requestCourses());
		return fetch(`${RootPath}/API/courses`)
			.then(response => response.json())
			.then(json => dispatch(recieveCourses(json)));
	};
}

export function fetchCourses() {
	console.log('fetchCourses');
	return (dispatch, getState) => {
		if (shouldFetchCourses(getState())) {
			dispatch(requestCourses());
			return dispatch(fetchCoursesDo());
		}
	};
}
