import * as React from 'react';
import { Row } from 'antd';
import { Mutation } from 'react-apollo';
import { MUTATION_CREATE_XML_TEMPLATE } from './store';
import { QUERY_XML_TEMPLATES } from 'store/app';
import XmlTemplateForm from 'modules/XmlTemplateForm';

interface State { message: String };

class XmlTemplateNew extends React.Component<State> {
  state = {
    message: ''
  };
  render() {
    const fields = { name: '', xml: '', description: '' };

    return(
       <div>
        <Row type="flex">
          <h1>XML</h1>
        </Row>

        <p>{this.state.message}</p>

        <Mutation mutation={MUTATION_CREATE_XML_TEMPLATE} update={(store, { data: { createXmlTemplate } }) => {
          const message = `XML Template ${createXmlTemplate.name} has been created`;
          this.setState({ message: message });

          const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
          const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
          store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: [createXmlTemplate, ...xmlTemplates] }});
        }}>
          { createXmlTemplate => (
            <div>
              <XmlTemplateForm fields={fields} onValidSubmit={(updatedFields:any) => {
                const { name, xml, description } = updatedFields;
                createXmlTemplate({ variables: { name: name, xml: xml, description: description } });
              }} />
            </div>
          )}
        </Mutation>
      </div>
    );
  };
};

export default XmlTemplateNew;