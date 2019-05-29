import * as React from 'react';
import { QUERY_XML_TEMPLATES } from 'store/app';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { Table, Button } from 'antd';
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
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions'
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
            updatedAt: xmlTemplate.updatedAt,
            createdAt: xmlTemplate.createdAt,
            usedIn: xmlTemplate.templatesCount,
            actions: <Link to={`/xml_templates/${xmlTemplate.id}/edit`}>Edit</Link>
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
