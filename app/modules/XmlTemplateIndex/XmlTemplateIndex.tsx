import * as React from 'react';
import { QUERY_XML_TEMPLATES } from 'store/app';
import { MUTATION_DELETE_XML_TEMPLATE } from './store';
import { Link } from 'react-router-dom';
import { Query, Mutation } from 'react-apollo';
import { Table, Button } from 'antd';
import moment from 'moment';
import s from './XmlTemplateIndex.scss';

const XmlTemplateIndex = () => {

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description'
    },
    {
      title: 'State',
      dataIndex: 'state',
      key: 'state'
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedId'
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: 'Used in',
      dataIndex: 'usedIn',
      key: 'usedIn'
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

  const table:any = <Query query={QUERY_XML_TEMPLATES}>
    {
      ({ data }) => {
        const xmlTemplates = data.xmlTemplates ? data.xmlTemplates : [];
        const dataSource = xmlTemplates.map((xmlTemplate:any) => (
          {
            key: xmlTemplate.id,
            name: <Link to={`/xml_templates/${xmlTemplate.id}`}>{xmlTemplate.name}</Link>,
            description: xmlTemplate.description,
            state: xmlTemplate.state,
            updatedAt: moment(xmlTemplate.updatedAt).format('LLL'),
            createdAt: moment(xmlTemplate.createdAt).format('LLL'),
            usedIn: xmlTemplate.templatesCount,
            edit: <Link to={`/xml_templates/${xmlTemplate.id}/edit`}>Edit</Link>,
            delete: (
              <Mutation mutation={MUTATION_DELETE_XML_TEMPLATE} update={(store) => {
                const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
                const xmlTemplates = data.xmlTemplates ? data.xmlTemplates : [];
                const editedXmlTemplates = xmlTemplates.filter((obj:any) => obj.id !== xmlTemplate.id);
                store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: editedXmlTemplates }});
              }}>
                {
                  deleteXmlTemplate => (
                    <Link to='#' onClick={() => {
                      if(confirm('Delete?')) {
                        deleteXmlTemplate({ variables: { id: xmlTemplate.id }})
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
          <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 25 }} />
          </div>
        );
      }
    }
  </Query>

  return(
    <div className={s.XmlTemplateIndex}>
      <Link to='/xml_templates/new'>
        <Button type='primary'>New XML Template</Button>
      </Link>
      {table}
    </div>
  );
};

export default XmlTemplateIndex;
