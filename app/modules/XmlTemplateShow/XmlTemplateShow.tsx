import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_XML_TEMPLATE_DETAIL } from 'store/app';
import { MUTATION_TOGGLE_TEMPLATE_STATE } from './store';
import { Query, Mutation } from 'react-apollo';
import { Button } from 'antd';

type Props = RouteComponentProps;

class XmlTemplateShow extends React.Component<Props> {
  render() {
    const { match: { params }}:any = this.props;

    return(
      <Query query={QUERY_XML_TEMPLATE_DETAIL} variables={{ id: params.id }}>
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
                <Mutation mutation={MUTATION_TOGGLE_TEMPLATE_STATE} update={(store, { data: { toggleXmlTemplateState }}) => {
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
              </div>
            );
          }
        }
      </Query>
    );
  };
};

export default XmlTemplateShow;