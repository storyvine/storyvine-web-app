// @flow-weak
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { PersistGate } from 'redux-persist/es/integration/react';

import App from 'containers/App';
import reduxStore from 'store';

const renderApp = (Component: React.ComponentType<any>) => {
  ReactDOM.render(
    <Provider store={reduxStore.store}>
      <PersistGate persistor={reduxStore.persistor}>
        <Router>
          <AppContainer>
            <Component />
          </AppContainer>
        </Router>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  );
};

renderApp(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('containers/App', () => renderApp(App));
}
