import './App.css';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

let App;

if (process.env.NODE_ENV === 'production') {
  App = require('./App.prod.jsx');
} else {
  App = require('./App.dev.jsx');
}

export default App;
