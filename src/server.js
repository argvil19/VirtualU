import express                              from 'express';
import bodyParser                           from 'body-parser';
import logger                               from 'morgan';
import http                                 from 'http';
import path                                 from 'path';
import routes                               from './routes';
import routesAPI                            from './API/routes';
import auth                                 from './API/helpers/auth/jwt-middleware';
import React                                from 'react';
import ReactDom                             from 'react-dom/server';
import { match }                            from 'react-router';
import { Provider }                         from 'react-redux';
import { ReduxAsyncConnect, loadOnServer }  from 'redux-connect';
import configureStore                       from './redux/configureStore';
import favicon                              from 'serve-favicon';

const PORT = process.env.PORT || 3001;
const app = express();

app.use(logger('dev'));

//app.use(favicon(path.join(__dirname, '../public/favicon.ico')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serves static files
app.use('/public', express.static(path.join(__dirname, './public')));
// TODO: remove static content files after the React implementation will done

// Authentication middleware
app.use(auth);

// Server middlewares
routesAPI(app);

app.use((req, res) => {

  const store = configureStore({}, req);

  const state = store.getState();

  // This setting is required for material-ui server-side rendering
  state.theme.userAgent = req.headers['user-agent'];

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if(redirectLocation) {
      return res.redirect(301, redirectLocation.pathname + redirectLocation.search);
    }

    if(error) {
      return res.status(500).send(error.message);
    }

    if(!renderProps) {
      return res.status(404).send('Not found');
    }

    loadOnServer ({ ...renderProps, store }).then(() => {
      const componentHTML = ReactDom.renderToString(
        <Provider store={store} key="provider">
          <ReduxAsyncConnect {...renderProps} />
        </Provider>
      );

      res.send(renderHTML(componentHTML, store.getState()));
    });
  });
});

const assetUrl = process.env.NODE_ENV !== 'production' ? 'http://localhost:8050' : 'http://localhost';

function renderHTML(componentHTML, initialState) {
  return `
    <!DOCTYPE html>
      <html lang="ru-RU">
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>HVU</title>
          <link rel="icon" href="/favicon.ico">
          <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
          <link rel="stylesheet" href="${assetUrl}/public/assets/styles.css">
      </head>
      <body>
        <div id="react-view">${componentHTML}</div>
        <script type="application/javascript">
            window.REDUX_INITIAL_STATE = ${JSON.stringify(initialState)}
          </script>
        <script type="application/javascript" src="${assetUrl}/public/assets/bundle.js"></script>
      </body>
    </html>
  `;
}

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  return console.log(`Listening at port ${PORT}`); // eslint-disable-line no-console
});

module.exports = app;

if (!module.parent) {
  // Fires if server.js isn't being required from outside. Starts the server.
  http.createServer(app);
}
