import {
  REQUEST_REGISTER_USER,
  RECIEVE_REGISTER_USER,
  ERROR_REGISTER_USER,

  REQUEST_LOGIN_USER,
  RECIEVE_LOGIN_USER,
  ERROR_LOGIN_USER,

  REQUEST_REFRESH_TOKEN,
  RECIEVE_REFRESH_TOKEN,
  ERROR_REFRESH_TOKEN,

  DO_LOGOUT,

  HIDE_ERROR
}                                           from '../../redux/actions/userActions';

const initialState = {
  logged: false,
  name: '',
  username: '',
  email: '',
  token: '',
  loading: false,
  loaded: false,
  error: ''
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_USER:
    case REQUEST_REGISTER_USER:
    case REQUEST_REFRESH_TOKEN:
      return {
        error: '',
        loading: true,
        loaded: false
      };

    case RECIEVE_LOGIN_USER:
    case RECIEVE_REGISTER_USER:
    case RECIEVE_REFRESH_TOKEN:
      return Object.assign({}, state, {
        logged: true,
        token: action.token,
        error: '',
        loading: false,
        loaded: false
      });

    case ERROR_LOGIN_USER:
    case ERROR_REGISTER_USER:
    case ERROR_REFRESH_TOKEN:
      console.log(action);
      return Object.assign({}, state, {
        logged: false,
        token: '',
        error: action.error,
        loading: false,
        loaded: false
      });

    case DO_LOGOUT:
      return Object.assign({}, state, {
        logged: false,
        token: '',
        loading: false,
        loaded: false
      });

    case HIDE_ERROR:
      return Object.assign({}, state, {
        error: ''
      });

    default:
      return state;
  }
}
