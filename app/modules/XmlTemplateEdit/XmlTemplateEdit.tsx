import * as React from 'react';
import { compose } from 'recompose';
import XmlTemplateForm from 'modules/XmlTemplateForm';
import { xmlTemplateQuery } from 'store/app';
import { updateXmlTemplateMutation } from './store';
import { MutationFn } from 'react-apollo';
import { getXmlTemplatesGql } from 'store/app';

interface State { message: String };
type Props = { XmlTemplateQuery:any, UpdateXmlTemplateMutation:MutationFn };

class XmlTemplateEdit extends React.Component<Props, State> {
  state = {
    message: ''
  };
  onValidSubmit = (updatedFields:any) => {
    const { name, xml } = updatedFields;
    const { UpdateXmlTemplateMutation } = this.props;

    UpdateXmlTemplateMutation({
      variables: { id: 10, name: name, xml: xml },
      update: (store, { data: { updateXmlTemplate }}) => {
        const message = `XML Template ${updateXmlTemplate.name} has been updated`;
        this.setState({ message: message });

        const xmlTemplatesQuery:any = store.readQuery({ query: getXmlTemplatesGql });
        const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
        const index = xmlTemplates.findIndex((xmlTemplate:any) => xmlTemplate.id == updateXmlTemplate.id);
        xmlTemplates[index] = updateXmlTemplate;
        store.writeQuery({ query: getXmlTemplatesGql, data: { xmlTemplates: xmlTemplates }});
      }
    });
  };
  render() {
    const { XmlTemplateQuery } = this.props;
    const xmlTemplate = XmlTemplateQuery.loading ? {} : XmlTemplateQuery.xmlTemplate;
    const fields = { name: xmlTemplate.name, xml: xmlTemplate.xml };

    return(
      <div>
        <p>{this.state.message}</p>
        <XmlTemplateForm fields={fields} onValidSubmit={this.onValidSubmit} />
      </div>
    );
  };
};

export default compose<Props, {}>(
  xmlTemplateQuery,
  updateXmlTemplateMutation
)(XmlTemplateEdit);
