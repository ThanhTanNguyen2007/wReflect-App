import 'antd/dist/antd.css';
import React, { useState, useEffect } from 'react';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, ApolloProvider, InMemoryCache, HttpLink, from } from '@apollo/client';

import { Me } from './types';
import { notification } from 'antd';
import config from './config';
import Routes from './Routes';
import { setUpdateLoginState, user } from './apis';

const httpLink = new HttpLink({
  uri: `${config.SERVER_BASE_URL}/graphql`,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message }) => {
      notification.error({
        message: `Notification`,
        description: message,
        placement: 'bottomLeft',
      });
    });

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  uri: `${config.SERVER_BASE_URL}/graphql`,
  cache: new InMemoryCache({
    addTypename: true,
    typePolicies: {
      teams: {
        keyFields: ['id'],
      },
    },
  }),
  link: from([errorLink, httpLink]),
});

const App = (): JSX.Element => {
  const [me, setMe] = useState<null | Me>(null);
  setUpdateLoginState((newMe: null | Me) => {
    setMe(newMe);
    localStorage.setItem('email', newMe?.email || '');
  });
  useEffect(() => {
    (async function () {
      await user.me();
    })();
  }, []);
  return (
    <ApolloProvider client={client}>
      <Routes me={me} />;
    </ApolloProvider>
  );
};

export default App;
