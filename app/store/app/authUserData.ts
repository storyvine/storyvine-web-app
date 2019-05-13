import { graphql } from 'react-apollo';
import authUserDataGql from './authUserData.gql';

// ON_STARTUP: adjust types below for your query
export interface User {
  id: string,
  firstName: string,
  lastName: string,
  [key: string]: any,
};

export interface AuthUserDataQuery {
  loading: boolean,
  me: User,
};

const authUserDataQuery = graphql(authUserDataGql, { name: 'authUserDataQuery' });

export default authUserDataQuery;
