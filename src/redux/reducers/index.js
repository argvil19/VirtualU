import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import userReducer                          from './userReducer';
import themeReducer                         from './themeReducer';

export default combineReducers({
  reduxAsyncConnect,
  user: userReducer,
  theme: themeReducer
});
