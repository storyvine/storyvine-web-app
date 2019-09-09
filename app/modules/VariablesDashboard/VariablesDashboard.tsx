import * as React from 'react';
import { Query, Mutation, WithApolloClient, withApollo } from 'react-apollo';
import { MUTATION_DELETE_CMS_VARIABLE, MUTATION_DELETE_USER_VARIABLE, MUTATION_UPDATE_CMS_VARIABLES_POSITION } from './store';
import { QUERY_GLOBAL_CMS_VARIABLES, QUERY_GLOBAL_USER_VARIABLES } from 'store/app';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { compose } from 'recompose';
import s from './VariablesDashboard.scss';

const ReactDragListView = require('react-drag-listview').default;

interface IndexProps {};

type ApolloIndexProps = WithApolloClient<IndexProps>;

class XmlTemplateIndex extends React.Component<ApolloIndexProps> {
  render() {
    const userVariablesColumns = [
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position'
      },
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
      },
      {
        title: 'Delete',
        dataIndex: 'userVariableDelete',
        key: 'userVariableDelete'
      }
    ];

    const cmsVariablesColumns = [
      {
        title: 'Position',
        dataIndex: 'position',
        key: 'position'
      },
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
        title: 'Category',
        dataIndex: 'category',
        key: 'category'
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

    const globalUserVariablesTable = <Query query={QUERY_GLOBAL_USER_VARIABLES} fetchPolicy={'network-only'}>
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
              userVariableEdit: <Link to={`/user_variables/${userVariable.id}/edit`}>Edit</Link>,
              userVariableDelete: (
                <Mutation mutation={MUTATION_DELETE_USER_VARIABLE} update={(store) => {
                  const userVariableQuery:any = store.readQuery({ query: QUERY_GLOBAL_USER_VARIABLES });
                  const userVariables = userVariableQuery ? userVariableQuery.globalUserVariables : [];
                  const editedUserVariable = userVariables.filter((obj:any) => obj.id !== userVariable.id);
                  store.writeQuery({ query: QUERY_GLOBAL_USER_VARIABLES, data: { globalUserVariables: editedUserVariable }});
                }}>
                  {
                    deleteUserVariable => (
                      <Link to='#' onClick={() => {
                        if(confirm('Delete?')) {
                          deleteUserVariable({ variables: { id: userVariable.id }})
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

          return(<Table dataSource={userVariablesDataSource} columns={userVariablesColumns} pagination={{ pageSize: 25 }} />);
        }
      }
    </Query>

    const globalVariablesDragDropOptions = {
      onDragEnd: (fromIndex:any, toIndex:any) => {
        const { cache } = this.props.client;
        const cmsVariableQuery:any = cache.readQuery({ query: QUERY_GLOBAL_CMS_VARIABLES });
        let cmsVariables = cmsVariableQuery.globalCmsVariables;

        const firstNode = cmsVariables[fromIndex];
        const secondNode = cmsVariables[toIndex];
        const firstNodePosition = firstNode.position;
        const secondNodePosition = secondNode.position;
        firstNode.position = secondNodePosition;
        secondNode.position = firstNodePosition;
        cmsVariables[fromIndex] = secondNode;
        cmsVariables[toIndex] = firstNode;

        cache.writeQuery({ query: QUERY_GLOBAL_CMS_VARIABLES, data: { globalCmsVariables: cmsVariables }});
        this.forceUpdate();

        const variables = { firstNodeId: firstNode.id, secondNodeId: secondNode.id, firstNodePosition: secondNodePosition, secondNodePosition: firstNodePosition }
        this.props.client.mutate({ mutation: MUTATION_UPDATE_CMS_VARIABLES_POSITION, variables: variables });
      },
      handleSelector: 'tr'
    };

    const globalCmsVariablesTable = <Query query={QUERY_GLOBAL_CMS_VARIABLES} fetchPolicy={'network-only'}>
      {
        ({ data }) => {
          const globalCmsVariables = data.globalCmsVariables ? data.globalCmsVariables : [];
          const cmsVariablesDataSource = globalCmsVariables.map((cmsVariable:any) => (
            {
              key: `cmsVariable${cmsVariable.id}`,
              position: cmsVariable.position,
              label: cmsVariable.label,
              updatedAt: moment(cmsVariable.updatedAt).format('LLL'),
              variable_key: cmsVariable.key,
              inputType: cmsVariable.inputType,
              category: cmsVariable.category,
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
          return(
            <ReactDragListView {...globalVariablesDragDropOptions}>
              <Table dataSource={cmsVariablesDataSource} className={s.dragAndDrop} columns={cmsVariablesColumns} pagination={{ pageSize: 25 }} />
            </ReactDragListView>
          );
        }
      }
    </Query>

    return(
      <div className={s.VariablesDashboard}>
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
};

export default compose<ApolloIndexProps, {}>(withApollo)(XmlTemplateIndex);
