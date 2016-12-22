import React, { PropTypes, Component }      from 'react';
import { connect }                          from 'react-redux';
import { TextField, FlatButton }            from 'material-ui';
import { Link }                             from 'react-router';

import {
  fetchLogin
}                                           from 'redux/actions/userActions';

const propTypes = {
  dispatch: PropTypes.func.isRequired
};

const defaultProps = {
  dispatch: () => {}
};

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    this.props.dispatch(fetchLogin(
      this.inputUsername.input.value, this.inputPassword.input.value
    ));
  }

  render() {
    return (
      <div>
        <h1>Login form</h1>
        <div>
          <TextField
            type='text'
            hintText='Username'
            ref={input => this.inputUsername = input}
          />
        </div>
        <div>
          <TextField
            style={{ width: '100%' }}
            type='password'
            hintText='Password'
            ref={input => this.inputPassword = input}
          />
        </div>
        <div style={{ textAlign: 'center' }}>
          <FlatButton style={{ width: '100%' }} onClick={this.handleLogin}>Login</FlatButton>
          <div style={{ color: '#FF0000', margin: '10px' }}>or</div>
          <div>
            <Link to='/register'>register</Link>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;

function mapStateToProps() {
  return {};
}

export default connect(mapStateToProps)(LoginPage);
