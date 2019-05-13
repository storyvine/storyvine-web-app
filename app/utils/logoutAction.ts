
import { RouterProps } from 'react-router';
import { ApolloClient } from 'apollo-client'
import Cookie from 'js-cookie';

const logoutAction = async (history: RouterProps['history'], client: ApolloClient<any>): Promise<void> => {
  Cookie.remove('token');
  await client.cache.reset();
  history.push('/login');
};

export default logoutAction;
