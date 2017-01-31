import React from 'react';
import ReactDOM   from 'react-dom';
import { browserHistory, Router } from 'react-router';
import routes from '../server/routes';
import { Provider } from 'react-redux';
import configureStore from '../server/redux/configureStore';

const store = configureStore();

const component = (
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
);

ReactDOM.render(component, document.getElementById('react-view'));
