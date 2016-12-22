import React, { Component, PropTypes }      from 'react';
import { connect }                          from 'react-redux';
import { Link }                             from 'react-router';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                     from 'material-ui/styles/MuiThemeProvider';
import MoreVertIcon                         from 'material-ui/svg-icons/navigation/more-vert';
import {
  deepPurple100,
  deepPurple500,
  deepPurple700
}                                           from 'material-ui/styles/colors';
import {
  AppBar,
  Drawer,
  MenuItem,
  IconMenu,
  IconButton,
  FontIcon,
  FlatButton
}                                           from 'material-ui';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

import './App.css';

const propTypes = {
  user: PropTypes.object,
  children: PropTypes.node,
  menu: PropTypes.array,
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
  handleToggleDrawer() {
    this.setState({
      showDrawer: !this.state.showDrawer
    });
  }
  render() {
    const muiTheme = getMuiTheme({
      palette: {
        primary1Color: deepPurple500,
        primary2Color: deepPurple700,
        primary3Color: deepPurple100
      }
    }, {
      avatar: {
        borderColor: null
      },
      userAgent: this.props.userAgent
    });

    console.log(this.props.user);

    const rightButton = this.props.user.logged ?
      (
        <IconMenu
          iconButtonElement={
            <IconButton><MoreVertIcon /></IconButton>
          }
          targetOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
        >
          <MenuItem primaryText='Help' />
          <MenuItem primaryText='Sign out' />
        </IconMenu>
      ) :
      (
        <Link to='/login' className='login-button'>
          <FlatButton style={{ color: '#fff', margin: '6px' }} label='Login' />
        </Link>
      );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            title={<Link className='logo' to='/'>HVU</Link>}
            onLeftIconButtonTouchTap={this.handleToggleDrawer}
            iconElementRight={rightButton}
          />

          <Drawer
            docked={false}
            open={this.state.showDrawer}
            onRequestChange={(showDrawer) => this.setState({ showDrawer })}
          >
            {this.props.menu.map((item, i) => {
              return (
                <Link key={i} className='menu-link' to={item.url}>
                  <MenuItem
                    primaryText={item.label}
                    rightIcon={<FontIcon className='material-icons'>{item.icon}</FontIcon>}
                    onTouchTap={this.handleToggleDrawer}
                    value={item.url}
                  />
                </Link>
              );
            })}
          </Drawer>

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
  const menu = state.menu.items;

  return {
    user,
    userAgent,
    menu
  };
}

export default connect(mapStateToProps)(App);
