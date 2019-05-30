import * as React from 'react';
import { Query, Mutation } from 'react-apollo';
import { QUERY_GLOBAL_USER_VARIABLES, MUTATION_DELETE_CMS_VARIABLE } from './store';
import { QUERY_GLOBAL_CMS_VARIABLES } from 'store/app';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';

const XmlTemplateIndex = () => {
  const userVariablesColumns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'label'
    },
    {
      title: 'Key',
      dataIndex: 'variable_key',
      key: 'variableKey'
    },
    {
      title: 'Position',
      dataIndex: 'position',
      key: 'position'
    },
    {
      title: 'Screen',
      dataIndex: 'screen',
      key: 'screen'
    },
    {
      title: 'Character Limit',
      dataIndex: 'characterLimit',
      key: 'characterLimit'
    },
    {
      title: 'Edit',
      dataIndex: 'userVariableEdit',
      key: 'userVariableEdit'
    }
  ];

  const cmsVariablesColumns = [
    {
      title: 'Label',
      dataIndex: 'label',
      key: 'cmsLabel'
    },
    {
      title: 'Key',
      dataIndex: 'variable_key',
      key: 'cmsVariableKey'
    },
    {
      title: 'Updated at',
      dataIndex: 'updatedAt',
      key: 'updadedAt'
    },
    {
      title: 'Input Type',
      dataIndex: 'inputType',
      key: 'inputType'
    },
    {
      title: 'Edit',
      dataIndex: 'edit',
      key: 'edit'
    },
    {
      title: 'Delete',
      dataIndex: 'delete',
      key: 'delete'
    }
  ];

  const globalUserVariablesTable = <Query query={QUERY_GLOBAL_USER_VARIABLES}>
    {
      ({ data }) => {
        const globalUserVariables = data.globalUserVariables ? data.globalUserVariables : [];
        const userVariablesDataSource = globalUserVariables.map((userVariable:any) => (
          {
            key: userVariable.id,
            label: userVariable.label,
            variable_key: userVariable.key,
            position: userVariable.position,
            screen: userVariable.screen,
            characterLimit: userVariable.characterLimit,
            userVariableEdit: <Link to={`/user_variables/${userVariable.id}/edit`}>Edit</Link>
          }
        ));

        return(<Table dataSource={userVariablesDataSource} columns={userVariablesColumns} pagination={{ pageSize: 25 }} />);
      }
    }
  </Query>

  const globalCmsVariablesTable = <Query query={QUERY_GLOBAL_CMS_VARIABLES}>
    {
      ({ data }) => {
        const globalCmsVariables = data.globalCmsVariables ? data.globalCmsVariables : [];
        const cmsVariablesDataSource = globalCmsVariables.map((cmsVariable:any) => (
          {
            key: `cmsVariable${cmsVariable.id}`,
            label: cmsVariable.label,
            updatedAt: moment(cmsVariable.updatedAt).format('LLL'),
            variable_key: cmsVariable.key,
            inputType: cmsVariable.inputType,
            edit: <Link to={`/cms_variables/${cmsVariable.id}/edit`}>Edit</Link>,
            delete: (
              <Mutation mutation={MUTATION_DELETE_CMS_VARIABLE} update={(store) => {
                const cmsVariableQuery:any = store.readQuery({ query: QUERY_GLOBAL_CMS_VARIABLES });
                const cmsVariables = cmsVariableQuery ? cmsVariableQuery.globalCmsVariables : [];
                const editedCmsVariable = cmsVariables.filter((obj:any) => obj.id !== cmsVariable.id);
                store.writeQuery({ query: QUERY_GLOBAL_CMS_VARIABLES, data: { globalCmsVariables: editedCmsVariable }});
              }}>
                {
                  deleteCmsVariable => (
                    <Link to='#' onClick={() => {
                      if(confirm('Delete?')) {
                        deleteCmsVariable({ variables: { id: cmsVariable.id } });
                      }
                    }}>
                      Delete
                    </Link>
                  )
                }
              </Mutation>
            )
          }
        ));
        return(<Table dataSource={cmsVariablesDataSource} columns={cmsVariablesColumns} pagination={{ pageSize: 25 }} />);
      }
    }
  </Query>
  
  return(
    <div>
      <h1>Variables Dashboard</h1>
      <h2>User generated Variables</h2>
      <Link to='/user_variables/new'>
        <Button type='primary'>New User Generated Variable</Button>
      </Link>
      {globalUserVariablesTable}
      <h2>CMS Variables</h2>
      <Link to='/cms_variables/new'>
        <Button type='primary'>New CMS Variable</Button>
      </Link>
      {globalCmsVariablesTable}
    </div>
  );
};

export default XmlTemplateIndex;