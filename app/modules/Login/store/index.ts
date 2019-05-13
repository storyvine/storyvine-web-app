import { get } from 'lodash';
import { graphql } from 'react-apollo';

import authUserGql from './authUser.gql';
import signinGql from './signin.gql';

const authUserQuery = graphql(authUserGql, { name: 'AuthUserQuery' });

const signinMutation = graphql(signinGql, {
  name: 'SigninMutation',
  options: {
    update: (cache, { data }) => {
      cache.writeQuery({
        query: authUserGql,
        data: { me: get(data, 'signin.me') },
      });
    },
  },
});

export { authUserQuery, signinMutation };
