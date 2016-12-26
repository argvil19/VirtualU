import React                                from 'react';
import { expect }                           from 'chai';
import {
  render,
  shallow
}                                           from 'enzyme';
import getMuiTheme                          from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider                     from 'material-ui/styles/MuiThemeProvider';
import configureStore                       from '../../redux/configureStore';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

import LoginForm from './LoginForm.jsx';
import RegisterForm from './RegisterForm.jsx';

const store = configureStore();
const muiTheme = getMuiTheme({
  userAgent: ''
});

describe('components/User', () => {

  describe('<LoginForm />', () => {
    it('show errors', () => {
      const wrapper = render(
        <MuiThemeProvider muiTheme={muiTheme}>
          <LoginForm store={store} />
        </MuiThemeProvider>
      );

      //wrapper.find('#loginButton').simulate('click');
      expect(wrapper.find('.errorMessage').length).to.equal(0);
    });
  });

  describe('<RegisterForm />', () => {
    it('renders 5 `input`s', () => {
      const wrapper = render(
        <MuiThemeProvider muiTheme={muiTheme}>
          <RegisterForm store={store} />
        </MuiThemeProvider>
      );

      expect(wrapper.find('input').length).to.equal(5);
    });

    describe('checks name input', () => {
      it('correct symbols', () => {
        const wrapper = shallow(
          <MuiThemeProvider muiTheme={muiTheme}>
            <RegisterForm store={store} />
          </MuiThemeProvider>
        );

        expect(wrapper.find('#errorMessage').length).to.equal(0);
        // expect(wrapper.find('.errorMessage').length).to.equal(1);
      });

    });
  });
});