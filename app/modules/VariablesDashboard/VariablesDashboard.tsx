import * as React from 'react';
import { Query } from 'react-apollo';
import { QUERY_GLOBAL_USER_VARIABLES } from './store';
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
      key: 'variable_key'
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
  
  return(
    <div>
      <h1>Variables Dashboard</h1>

      <Query query={QUERY_GLOBAL_USER_VARIABLES}>
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

            return(
              <div>
                <h2>User generated Variables</h2>
                <Table dataSource={userVariablesDataSource} columns={userVariablesColumns} pagination={{ pageSize: 25 }} />
              </div>
            );
          }
        }
      </Query>
    </div>
  );
};

export default XmlTemplateIndex;