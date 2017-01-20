import fetch from 'isomorphic-fetch';
import RootPath from '../../../fetchPath';

export const REQUEST_COURSES = 'REQUEST_COURSES';
export const RECIEVE_COURSES = 'RECIEVE_COURSES';
export const ERROR_COURSES = 'ERROR_COURSES';

function requestCourses() {
	return {
		type: REQUEST_COURSES
	};
}

function recieveCourses(json) {
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
	return dispatch => {
		dispatch(requestCourses());
		return fetch(`${RootPath}/API/courses`)
			.then(response => response.json())
			.then(json => dispatch(recieveCourses(json)));
	};
}

export function fetchCourses() {
	return (dispatch, getState) => {
		if (shouldFetchCourses(getState())) {
			dispatch(requestCourses());
			return dispatch(fetchCoursesDo());
		}
	};
}
