import React, { PropTypes, Component }      from 'react';
import { connect }                          from 'react-redux';
import { TextField, FlatButton }            from 'material-ui';

import {
  fetchRegister
}                                           from 'redux/actions/userActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

const defaultProps = {
  dispatch: () => {}
};

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.state = {
      valid: false,
      usernameError: '',
      emailError: '',
      passwordError: '',
      confirmationError: ''
    };
  }

  handleRegister() {
    if (this.state.valid) {
      this.props.dispatch(fetchRegister(
        this.inputUsername.input.value,
        this.inputEmail.input.value,
        this.inputPassword.input.value
      ));
    }
  }

  /**
   * This methos implements form validation
   */
  handleChange() {
    const state = this.state;
    const usernameRegexp = /^[\w\.]{3,25}$/;
    const emailRegexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line max-len
    const passwordRegexp = /^[\w\.\@\#\$\%\^\&\+\=]{8,}$/;

    state.valid = true;

    // Validate username
    if (!this.inputUsername.input.value) {
      state.valid = false;
    } else if (!usernameRegexp.test(this.inputUsername.input.value)) {
      state.usernameError = 'Username must to be from 3 to 25 symbols long and may consists from next symbols: "a-Z, 0-9, _, ."'; // eslint-disable-line max-len
      state.valid = false;
    } else {
      state.usernameError = '';
    }

    // Validate email
    if (!this.inputEmail.input.value) {
      state.valid = false;
    } else if (!emailRegexp.test(this.inputEmail.input.value)) {
      state.emailError = 'This email address is not correct.';
      state.valid = false;
    } else {
      state.emailError = '';
    }

    // Validate password
    if (!this.inputPassword.input.value) {
      state.valid = false;
    } else if (!passwordRegexp.test(this.inputPassword.input.value)) {
      state.passwordError = 'Your password must to be minimum 8 symbols long and may consists from next symbols: "a-Z, 0-9, @, #, $, %, ^, &, +, ="'; // eslint-disable-line max-len
      state.valid = false;
    } else {
      state.passwordError = '';
    }

    // Validate confirm
    if (this.inputPassword.input.value !== this.inputConfirm.input.value) {
      state.confirmationError = 'Passwords are not equal';
      state.valid = false;
    } else {
      state.confirmationError = '';
    }

    this.setState(state);
  }

  render() {
    return (
      <div>
        <h1>Register form</h1>
        <div>
          <TextField
            type='text'
            hintText='Username'
            errorText={this.state.usernameError}
            ref={input => this.inputUsername = input}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            type='text'
            hintText='Email'
            errorText={this.state.emailError}
            ref={input => this.inputEmail = input}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            type='password'
            ref={input => this.inputPassword = input}
            hintText='Password'
            errorText={this.state.passwordError}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <TextField
            type='password'
            ref={input => this.inputConfirm = input}
            hintText='Confirm password'
            errorText={this.state.confirmationError}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <FlatButton
            style={{ width: '100%' }}
            onClick={this.handleRegister}
            disabled={!this.state.valid}
          >
            Register
          </FlatButton>
        </div>
      </div>
    );
  }
}

RegisterPage.propTypes = propTypes;
RegisterPage.defaultProps = defaultProps;

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(RegisterPage);
