import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { compose } from 'recompose';
import XmlTemplateForm from 'modules/XmlTemplateForm';
import { updateXmlTemplateMutation } from './store';
import { MutationFn, Query } from 'react-apollo';
import { QUERY_XML_TEMPLATES } from 'store/app';
import { QUERY_XML_TEMPLATE } from 'store/app';

interface State { message: String };
type Props = { UpdateXmlTemplateMutation:MutationFn } & RouteComponentProps;

class XmlTemplateEdit extends React.Component<Props, State> {
  state = {
    message: ''
  };
  onValidSubmit = (updatedFields:any) => {
    const { name, xml } = updatedFields;
    const { UpdateXmlTemplateMutation } = this.props;
    const { match: { params } }:any = this.props;

    UpdateXmlTemplateMutation({
      variables: { id: params.id, name: name, xml: xml },
      update: (store, { data: { updateXmlTemplate }}) => {
        const message = `XML Template ${updateXmlTemplate.name} has been updated`;
        this.setState({ message: message });

        const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
        const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
        const index = xmlTemplates.findIndex((xmlTemplate:any) => xmlTemplate.id == updateXmlTemplate.id);
        xmlTemplates[index] = updateXmlTemplate;
        store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: xmlTemplates }});
      }
    });
  };
  render() {
    const { match: { params } }:any = this.props;

    return(
      <Query query={QUERY_XML_TEMPLATE} variables={{ id: params.id }}>
        {
          ({ data, error }) => {
            if (error) return (<div></div>);

            const xmlTemplate = data.xmlTemplate ? data.xmlTemplate : {};
            const fields = { name: xmlTemplate.name, xml: xmlTemplate.xml }

            return(
              <div>
                <p>{this.state.message}</p>
                <XmlTemplateForm fields={fields} onValidSubmit={this.onValidSubmit} />
              </div>
            );
          }
        }
      </Query>
    );
  };
};

export default compose<Props, {}>(
  updateXmlTemplateMutation
)(XmlTemplateEdit);
