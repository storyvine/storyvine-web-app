
import { graphql } from 'react-apollo';

import authUserGql from './authUser.gql';
import authUserDataGql from './authUserData.gql';
import authUserDataQuery, { User, AuthUserDataQuery } from './authUserData';
import { xmlTemplatesQuery, getXmlTemplatesGql } from './getXmlTemplates';
import { xmlTemplateQuery } from './getXmlTemplate';
export * from './authUserData'

const authUserQuery = () => graphql(authUserGql, { name: 'AuthUserQuery' });

export { authUserQuery, authUserDataGql, authUserDataQuery, AuthUserDataQuery, User, xmlTemplatesQuery, getXmlTemplatesGql, xmlTemplateQuery };

