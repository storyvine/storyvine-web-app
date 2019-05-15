import * as React from 'react';
import { xmlTemplatesQuery } from 'store/app';
import { Link } from 'react-router-dom';

const XmlTemplateIndex = ({ xmlTemplatesQuery }:any) => {

  const xmlTemplates = xmlTemplatesQuery.loading ? [] : xmlTemplatesQuery.xmlTemplates;
  const xmlTemplateRows = xmlTemplates.map((xmlTemplate:any) => (
    <tr key={xmlTemplate.id}>
      <td>{xmlTemplate.name}</td>
      <td>{xmlTemplate.createdAt}</td>
      <td>
        <Link to={`/xml_templates/${xmlTemplate.id}`}>Show</Link>
      </td>
    </tr>
  ));

  return(
    <div>
      <Link to='/xml_templates/new'>New XML Template</Link>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Created At</th>
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

export default xmlTemplatesQuery(XmlTemplateIndex);
