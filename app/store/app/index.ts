
import { graphql } from 'react-apollo';

import authUserGql from './authUser.gql';
import authUserDataGql from './authUserData.gql';
import authUserDataQuery, { User, AuthUserDataQuery } from './authUserData';
import { QUERY_XML_TEMPLATES } from './queryXmlTemplates';
import { QUERY_XML_TEMPLATE } from './queryXmlTemplate';
import { QUERY_XML_TEMPLATE_DETAIL } from './queryXmlTemplateDetail';
import { QUERY_GLOBAL_CMS_VARIABLES } from './queryGlobalCmsVariables';
import { QUERY_GLOBAL_CMS_VARIABLE } from './queryGlobalCmsVariable';
import { QUERY_GLOBAL_USER_VARIABLES } from './queryGlobalUserVariables';

export * from './authUserData'

const authUserQuery = () => graphql(authUserGql, { name: 'AuthUserQuery' });

export { authUserQuery, authUserDataGql, authUserDataQuery, AuthUserDataQuery, User, QUERY_XML_TEMPLATES, QUERY_XML_TEMPLATE,
  QUERY_XML_TEMPLATE_DETAIL, QUERY_GLOBAL_CMS_VARIABLES, QUERY_GLOBAL_CMS_VARIABLE, QUERY_GLOBAL_USER_VARIABLES };

