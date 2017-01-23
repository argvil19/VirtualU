import {
	REQUEST_COURSES,
	RECIEVE_COURSES,
	ERROR_COURSES
}                                           from '../../redux/actions/coursesActions';

const initialState = {
	list: [],
	loading: false,
	loaded: false,
	error: ''
};

export default function (state = initialState, action) {
	switch (action.type) {
		case REQUEST_COURSES:
			return Object.assign({}, state, {
				loading: true,
				loaded: false
			});

		case RECIEVE_COURSES:
			return Object.assign({}, state, {
				list: action.courses,
				error: '',
				loading: false,
				loaded: false
			});

		case ERROR_COURSES:
			return Object.assign({}, state, {
				error: action.error,
				loading: false,
				loaded: false
			});

		default:
			return state;
	}
}
