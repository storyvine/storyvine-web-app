import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import XmlTemplateForm from 'modules/XmlTemplateForm';
import { Mutation, Query } from 'react-apollo';
import { MUTATION_UPDATE_XML_TEMPLATE } from './store';
import { QUERY_XML_TEMPLATES } from 'store/app';
import { QUERY_XML_TEMPLATE } from 'store/app';

interface State { message: String };
type Props = RouteComponentProps;

class XmlTemplateEdit extends React.Component<Props, State> {
  state = {
    message: ''
  };
  render() {
    const { match: { params } }:any = this.props;

    return(
      <Query query={QUERY_XML_TEMPLATE} variables={{ id: params.id }}>
        {
          ({ data, error }) => {
            if (error) return (<div></div>);

            const xmlTemplate = data.xmlTemplate ? data.xmlTemplate : {};
            const fields = { name: xmlTemplate.name, xml: xmlTemplate.xml, description: xmlTemplate.description }

            return(
              <div>
                <p>{this.state.message}</p>
                <Mutation mutation={MUTATION_UPDATE_XML_TEMPLATE} update={(store, { data: { updateXmlTemplate } }) => {
                  const message = `XML Template ${updateXmlTemplate.name} has been updated`;
                  this.setState({ message: message });

                  const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
                  const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
                  const index = xmlTemplates.findIndex((xmlTemplate:any) => xmlTemplate.id == updateXmlTemplate.id);
                  xmlTemplates[index] = updateXmlTemplate;
                  store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: xmlTemplates }});
                }}>
                  { updateXmlTemplate => (
                    <div>
                      <XmlTemplateForm fields={fields} onValidSubmit={(updatedFields:any) => {
                        const { name, xml, description } = updatedFields;
                        updateXmlTemplate({ variables: { id: params.id, name: name, xml: xml, description: description }});
                      }} />
                    </div>
                  )}
                </Mutation>
              </div>
            );
          }
        }
      </Query>
    );
  };
};

export default XmlTemplateEdit;
