import './App.css';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

if (process.env.NODE_ENV === 'production') {
	module.exports = require('./App.prod');
} else {
	module.exports = require('./App.dev');
}
