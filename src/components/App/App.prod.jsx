import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                     from 'material-ui/styles/MuiThemeProvider';
import { green100, green500, green700 }     from 'material-ui/styles/colors';
import { AppBar, Drawer }                   from 'material-ui';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

import './App.css';

const propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  userAgent: PropTypes.string,
  dispatch: PropTypes.func
};

class App extends Component {
  constructor(props) {
    super(props);
    this.handleToggleDrawer = this.handleToggleDrawer.bind(this);

    this.state = {
      showDrawer: false
    };
  }
  handleToggleDrawer(e) {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: green500,
        primary2Color: green700,
        primary3Color: green100
      }
    }, {
      avatar: {
        borderColor: null
      },
      userAgent: this.props.userAgent
    });

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar title='HVU' onLeftIconButtonTouchTap={this.handleToggleDrawer} />
          <Drawer docked={false} open={this.state.showDrawer} />
          <div>
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  const user = state.user;
  const userAgent = state.theme.userAgent;

  return {
    user,
    userAgent
  };
}

export default connect(mapStateToProps)(App);
