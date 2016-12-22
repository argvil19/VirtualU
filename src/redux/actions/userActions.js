import fetch from 'isomorphic-fetch';

export const REQUEST_REGISTER_USER = 'REQUEST_REGISTER_USER';
export const RECIEVE_REGISTER_USER = 'RECIEVE_REGISTER_USER';
export const ERROR_REGISTER_USER = 'ERROR_REGISTER_USER';

function requestRegister() {
  return {
    type: REQUEST_REGISTER_USER
  };
}

function recieveRegister(json) {
  if (json.errors) {
    return errorRegister(json.errors);
  }

  return {
    type: RECIEVE_REGISTER_USER,
    _id: json._id,
    login: json.login,
    isAdmin: false
  };
}

function errorRegister(errors) {
  return {
    type: ERROR_REGISTER_USER,
    ...errors
  };
}

function shouldFetchRegister(state) {
  const user = state.user;

  if (user.loading) {
    return false;
  } else  if (!user.loaded || !user.login) {
    return true;
  }
}

function fetchRegisterDo(login, password) {
  return dispatch => {
    dispatch(requestRegister());
    return fetch('/API/user/register', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...login,
        ...password
      })
    })
      .then(response => response.json())
      .then(json => dispatch(recieveRegister(json)));
  };
}

export function fetchRegister(login, password, confirm) {
  return (dispatch, getState) => {
    if (password !== confirm) {
      dispatch(errorRegister({
        registerConfirm: 'Confirm password is incorrect!'
      }));
    } else if (shouldFetchRegister(getState())) {
      dispatch(requestRegister());
      return dispatch(fetchRegisterDo(login, password));
    }
  };
}

export const REQUEST_LOGIN_USER = 'REQUEST_LOGIN_USER';
export const RECIEVE_LOGIN_USER = 'RECIEVE_LOGIN_USER';
export const ERROR_LOGIN_USER = 'ERROR_LOGIN_USER';

function requestLogin() {
  return {
    type: REQUEST_LOGIN_USER
  };
}

function recieveLogin(json) {
  if (json.errors) {
    return errorLogin(json.errors);
  }

  return {
    type: RECIEVE_LOGIN_USER,
    _id: json._id,
    login: json.login,
    isAdmin: json.isAdmin
  };
}

function errorLogin(errors) {
  return {
    type: ERROR_LOGIN_USER,
    ...errors
  };
}

function shouldFetchLogin(state) {
  const user = state.user;

  if (user.loading) {
    return false;
  } else  if (!user.loaded || !user.login) {
    return true;
  }
}

function fetchLoginDo(login, password) {
  return dispatch => {
    dispatch(requestRegister());
    return fetch('/API/user/login', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...login,
        ...password
      })
    })
      .then(response => response.json())
      .then(json => dispatch(recieveLogin(json)));
  };
}

export function fetchLogin(login, password) {
  return (dispatch, getState) => {
    if (shouldFetchLogin(getState())) {
      dispatch(requestLogin());
      return dispatch(fetchLoginDo(login, password));
    }
  };
}

export const REQUEST_LOGOUT = 'REQUEST_LOGOUT';
export const RECIEVE_LOGOUT = 'RECIEVE_LOGOUT';

function requestLogout() {
  return {
    type: REQUEST_LOGOUT
  };
}

function recieveLogout() {
  return {
    type: RECIEVE_LOGOUT
  };
}

function shouldFetchLogout(state) {
  const user = state.user;

  if (user.loading) {
    return false;
  } else  if (user.loaded || user.login) {
    return true;
  }
}

function fetchLogoutDo() {
  return dispatch => {
    dispatch(requestRegister());
    return fetch('/API/user/logout', {
      method: 'post',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(() => dispatch(recieveLogout()));
  };
}

export function fetchLogout() {
  return (dispatch, getState) => {
    if (shouldFetchLogout(getState())) {
      dispatch(requestLogout());
      return dispatch(fetchLogoutDo());
    }
  };
}
