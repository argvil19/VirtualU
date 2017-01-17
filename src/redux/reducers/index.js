import { combineReducers }                  from 'redux';
import { reducer as reduxAsyncConnect }     from 'redux-connect';
import userReducer                          from './userReducer';
import themeReducer                         from './themeReducer';
import menuReducer                          from './menuReducer';
import couresReducer 												from './coursesReducer';

export default combineReducers({
  reduxAsyncConnect,
  user: userReducer,
  theme: themeReducer,
  menu: menuReducer,
  courses: couresReducer
});
