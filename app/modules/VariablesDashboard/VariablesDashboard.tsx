import * as React from 'react';
import { Query } from 'react-apollo';
import { QUERY_GLOBAL_USER_VARIABLES, QUERY_GLOBAL_CMS_VARIABLES } from './store';
import { Table } from 'antd';

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
      title: 'Input Type',
      dataIndex: 'inputType',
      key: 'inputType'
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
            characterLimit: userVariable.characterLimit
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
            key: `cmsVariable${cmsVariable}`,
            label: cmsVariable.label,
            variable_key: cmsVariable.key,
            inputType: cmsVariable.inputType
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
      {globalUserVariablesTable}
      <h2>User CMS Variables</h2>
      {globalCmsVariablesTable}
    </div>
  );
};

export default XmlTemplateIndex;