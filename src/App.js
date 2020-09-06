import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import configureStore, { history } from 'store';
import AppRouter from 'nav/routes';

let { store, persistor } = configureStore();

/*disable logs*/
var DEBUG = true;
if (!DEBUG) {
  if (!window.console) window.console = {};
  var methods = ['log', 'debug', 'warn', 'info'];
  for (var i = 0; i < methods.length; i++) {
    console[methods[i]] = function () {};
  }
}
/*disable logs end*/

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <PersistGate loading={null} persistor={persistor}>
            <Fragment>
              <AppRouter />
            </Fragment>
          </PersistGate>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
