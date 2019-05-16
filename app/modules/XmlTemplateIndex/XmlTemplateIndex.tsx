import * as React from 'react';
import { QUERY_XML_TEMPLATES } from 'store/app';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

const XmlTemplateIndex = () => {

  const xmlTemplateRows = <Query query={QUERY_XML_TEMPLATES}>
    {
      ({ data }) => {
        const xmlTemplates = data.xmlTemplates ? data.xmlTemplates : [];

        return(xmlTemplates.map((xmlTemplate:any) => (
          <tr key={xmlTemplate.id}>
            <td>{xmlTemplate.name}</td>
            <td>{xmlTemplate.createdAt}</td>
            <td>{xmlTemplate.templatesCount} templates</td>
            <td>
              <Link to={`/xml_templates/${xmlTemplate.id}`}>Show</Link>
            </td>
            <td>
            <Link to={`/xml_templates/${xmlTemplate.id}/edit`}>Edit</Link>
            </td>
          </tr>
        )));
      }
    }
  </Query>

  return(
    <div>
      <Link to='/xml_templates/new'>New XML Template</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
            <th>Used in</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {xmlTemplateRows}
        </tbody>
      </table>
    </div>
  );
};

export default XmlTemplateIndex;
