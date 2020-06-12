import React, { Component, Fragment } from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { PersistGate } from 'redux-persist/integration/react';

import { COLOR_PRIMARY, COLOR_SECONDARY } from 'config/colors';
import configureStore, { history } from 'store';
import AppRouter from 'nav/routes';

let { store, persistor } = configureStore();

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
