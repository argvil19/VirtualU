import {
  REQUEST_REGISTER_USER,
  RECIEVE_REGISTER_USER,
  ERROR_REGISTER_USER,

  REQUEST_LOGIN_USER,
  RECIEVE_LOGIN_USER,
  ERROR_LOGIN_USER,

  REQUEST_LOGOUT,
  RECIEVE_LOGOUT
}                                           from 'redux/actions/userActions';

const initialState = {
  _id: '',
  login: '',
  isAdmin: false,
  loading: false,
  loaded: false,
  errors: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case REQUEST_LOGIN_USER:
    case REQUEST_REGISTER_USER:
      return {
        _id: '',
        login: '',
        errors: {},
        loading: true,
        loaded: false
      };

    case RECIEVE_LOGIN_USER:
    case RECIEVE_REGISTER_USER:
      return Object.assign({}, state, {
        _id: action._id,
        login: action.login,
        isAdmin: action.isAdmin,
        errors: {},
        loading: false,
        loaded: false
      });

    case ERROR_LOGIN_USER:
    case ERROR_REGISTER_USER:
      return Object.assign({}, state, {
        errors: action.errors,
        loading: false,
        loaded: false
      });

    case REQUEST_LOGOUT:
      return Object.assign({}, state, {
        loading: true,
        loaded: false
      });
    case RECIEVE_LOGOUT:
      return Object.assign({}, state, {
        login: '',
        isAdmin: false,
        loading: false,
        loaded: false
      });
    default:
      return state;
  }
}
