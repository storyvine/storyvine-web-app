import * as React from 'react';
import { compose } from 'recompose';
import { Row } from 'antd';
import { MutationFn } from 'react-apollo';
import { createXmlTemplateMutation } from './store';
import { QUERY_XML_TEMPLATES } from 'store/app';
import XmlTemplateForm from 'modules/XmlTemplateForm';

interface State { message: String };
type Props = { CreateXmlTemplateMutation: MutationFn; }

class XmlTemplateNew extends React.Component<Props, State> {
  state = {
    message: ''
  };
  onValidSubmit = (updatedFields:any) => {
    const { name, xml } = updatedFields;
    const { CreateXmlTemplateMutation } = this.props;
    CreateXmlTemplateMutation({
      variables: { name: name, xml: xml },
      update: (store, { data: { createXmlTemplate }}) => {
        const message = `XML Template ${createXmlTemplate.name} has been created`;
        this.setState({ message: message });

        const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
        const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
        store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: [createXmlTemplate, ...xmlTemplates] }});
      }
    });
  };
  render() {
    const fields = { name: '', xml: '' };

    return(
       <div>
        <Row type="flex">
          <h1>XML</h1>
        </Row>

        <p>{this.state.message}</p>

        <XmlTemplateForm fields={fields} onValidSubmit={this.onValidSubmit} />
      </div>
    );
  };
};

export default compose<Props, {}>(
  createXmlTemplateMutation
)(XmlTemplateNew);
