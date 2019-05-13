import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Helmet from 'react-helmet';
import { BrowserRouter as Router } from 'react-router-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloLink } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Cookie from 'js-cookie';
import { setContext } from 'apollo-link-context';
import HttpsRedirect from 'react-https-redirect';
// import Raven from 'raven-js';
import * as favIcon from 'images/favicon.ico';
import ShowSidebarProvider from 'store/sidebar';
import App from './App';
import config from './config';

const authLink = setContext((_, { headers }) => {
  const token = Cookie.get('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const cache = new InMemoryCache().restore({});

const client = new ApolloClient({
  link: ApolloLink.from([
    authLink,
    createUploadLink({
      uri: `${config.bffUri}/graphql`,
      credentials: 'include',
    }),
  ]),
  cache,
});

const renderApp = (Component: React.ComponentType<any>) => {
  // ON_STARTUP: add sentry url. If you don't have it register your project at https://sentry.io/
  // Raven.config('SENTRY', {
  //   environment: process.env.ENVIRONMENT,
  //   shouldSendCallback: () =>
  //     // do not log events outside of production and staging environment
  //     process.env.ENVIRONMENT === 'production' || process.env.ENVIRONMENT === 'staging',
  // }).install();
  ReactDOM.render(
    <React.Fragment>
      <Helmet>
        <link rel="shortcut icon" href={favIcon} />
      </Helmet>
      <Router>
        <AppContainer>
          <ApolloProvider client={client}>
            <HttpsRedirect>
              <ShowSidebarProvider>
                <Component />
              </ShowSidebarProvider>
            </HttpsRedirect>
          </ApolloProvider>
        </AppContainer>
      </Router>
    </React.Fragment>,
    document.getElementById('root')
  );
};

renderApp(App);

// Hot Module Replacement API - https://github.com/vitaliy-bobrov/angular-hot-loader/issues/5
if ((module as any).hot) {
  (module as any).hot.accept('./App', () => renderApp(App));
}

/*"components": ["./components/"],
    "config": ["./config/"],
    "store": ["./store/"],
    "routes": ["./routes/"],
    "utils": ["./utils/"],
    "modules": ["./modules/"],
    "layouts": ["./layouts/"],
    "theme": ["./theme/"],
    "images": ["./images/"],*/
