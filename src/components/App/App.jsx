import AppProd from './App.prod.jsx';
import AppDev  from './App.dev.jsx';
import './App.css';
import injectTapEventPlugin                 from 'react-tap-event-plugin';

injectTapEventPlugin();

let App;

if (process.env.NODE_ENV === 'production') {
  App = AppProd;
} else {
  App = AppDev;
}

export default App;
