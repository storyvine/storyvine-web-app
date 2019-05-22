import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link, Redirect } from 'react-router-dom';
import { QUERY_XML_TEMPLATE_DETAIL, QUERY_XML_TEMPLATES } from 'store/app';
import { MUTATION_TOGGLE_XML_TEMPLATE_STATE, MUTATION_DELETE_XML_TEMPLATE } from './store';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'antd';

type Props = RouteComponentProps;

class XmlTemplateShow extends React.Component<Props> {
  render() {
    const { match: { params }}:any = this.props;

    return(
      <Query query={QUERY_XML_TEMPLATE_DETAIL} variables={{ id: params.id }} fetchPolicy={'network-only'}>
        {
          ({ data }) => {
            const xmlTemplate = data.xmlTemplateDetail ? data.xmlTemplateDetail : {};
            const templates = xmlTemplate.templates ? xmlTemplate.templates : [];

            return(
              <div>
                <h1>Template: {xmlTemplate.name}</h1>
                <h2>State: {xmlTemplate.disabledAt ? 'Disabled' : 'Active'}</h2>
                <Link to={`/xml_templates/${xmlTemplate.id}/edit`}>
                  <Button type='primary'>Edit XML</Button>
                </Link>
                <br />
                <Mutation mutation={MUTATION_TOGGLE_XML_TEMPLATE_STATE} update={(store, { data: { toggleXmlTemplateState }}) => {
                  const xmlTemplateDetailQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATE_DETAIL, variables: { id: xmlTemplate.id } });
                  let xmlTemplateDetail = xmlTemplateDetailQuery.xmlTemplateDetail;
                  xmlTemplateDetail.disabledAt = toggleXmlTemplateState.disabledAt;
                  store.writeQuery({ query: QUERY_XML_TEMPLATE_DETAIL, variables: { id: xmlTemplate.id }, data: { xmlTemplateDetail }});
                }}>
                  { toggleTemplateState => (
                    <div>
                      <Link to='#' onClick={() => {
                        const toggleState = xmlTemplate.disabledAt ? 'active' : 'disabled' ;
                        toggleTemplateState({ variables: { id: xmlTemplate.id, state: toggleState } });
                      }}>
                        <Button type='danger'>Toggle XML state</Button>
                      </Link>
                    </div>
                  )}
                </Mutation>
                <Mutation mutation={MUTATION_DELETE_XML_TEMPLATE} update={(store) => {
                  const xmlTemplatesQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATES });
                  const xmlTemplates = xmlTemplatesQuery ? xmlTemplatesQuery.xmlTemplates : [];
                  const editedXmlTemplates = xmlTemplates.filter((obj:any) => obj.id !== xmlTemplate.id);
                  store.writeQuery({ query: QUERY_XML_TEMPLATES, data: { xmlTemplates: editedXmlTemplates }});
                  this.props.history.push('/xml_templates');
                }}>
                  {
                    deleteXmlTemplate => (
                      <div>
                        <Link to='#' onClick={() => {
                          if(confirm('Delete?')) {
                            deleteXmlTemplate({ variables: { id: xmlTemplate.id }})
                          }
                        }}>
                          <Button type='danger'>Delete XML Template</Button>
                        </Link>
                      </div>
                  )}
                </Mutation>
                <p>Templates using the XML:</p>
                {
                  templates.map((template:any) => {
                    return(
                      <div key={template.id}>
                        ID: {template.id}, Name: {template.name}
                      </div>
                    );
                  })
                }

                <p>XML: {xmlTemplate.xml}</p>
              </div>
            );
          }
        }
      </Query>
    );
  };
};

export default XmlTemplateShow;