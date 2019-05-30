import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { QUERY_XML_TEMPLATE_DETAIL, QUERY_XML_TEMPLATES } from 'store/app';
import { MUTATION_TOGGLE_XML_TEMPLATE_STATE, MUTATION_DELETE_XML_TEMPLATE } from './store';
import { Query, Mutation } from 'react-apollo';
import { Button, Row, Col } from 'antd';
import s from './XmlTemplateShow.scss';

const prettifyXml = require('prettify-xml');

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
            const xmlCode = xmlTemplate.xml ? xmlTemplate.xml : '';

            return(
              <Row className={s.XmlTemplateShow}>
                <Col lg={{ span: 24 }}>
                  <h1>{xmlTemplate.name}</h1>
                  <h2>State: {xmlTemplate.state}</h2>
                </Col>

                <p>Templates using the XML:</p>
                <p>
                  {
                    templates.map((template:any) => {
                      return(
                        <span key={template.id}>{template.name} ({template.id}), </span>
                      );
                    })
                  }
                </p>

                <Col lg={{ span: 8 }}>
                  <Link to={`/xml_templates/${xmlTemplate.id}/edit`}>
                    <Button type='primary'>Edit XML</Button>
                  </Link>
                </Col>
                <Mutation mutation={MUTATION_TOGGLE_XML_TEMPLATE_STATE} update={(store, { data: { toggleXmlTemplateState }}) => {
                  const xmlTemplateDetailQuery:any = store.readQuery({ query: QUERY_XML_TEMPLATE_DETAIL, variables: { id: xmlTemplate.id } });
                  let xmlTemplateDetail = xmlTemplateDetailQuery.xmlTemplateDetail;
                  xmlTemplateDetail.state = toggleXmlTemplateState.state;
                  console.log('xmlTemplateDetail.state', xmlTemplateDetail.state);
                  store.writeQuery({ query: QUERY_XML_TEMPLATE_DETAIL, variables: { id: xmlTemplate.id }, data: { xmlTemplateDetail }});
                }}>
                  { toggleTemplateState => (
                    <Col lg={{ span: 8 }}>
                      <Link to='#' onClick={() => {
                        const toggleState = xmlTemplate.state == 'active' ? 'disabled' : 'active';
                        console.log('toggleState', toggleState);
                        toggleTemplateState({ variables: { id: xmlTemplate.id, state: toggleState } });
                      }}>
                        <Button type='primary'>Toggle XML state</Button>
                      </Link>
                    </Col>
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
                      <Col lg={{ span: 8 }}>
                        <Link to='#' onClick={() => {
                          if(confirm('Delete?')) {
                            deleteXmlTemplate({ variables: { id: xmlTemplate.id }})
                          }
                        }}>
                          <Button type='primary'>Delete XML Template</Button>
                        </Link>
                      </Col>
                  )}
                </Mutation>
                <div className={s.xmlCode}>
                  <h2>XML:</h2>
                  <pre>{prettifyXml(xmlCode)}</pre>
                </div>
              </Row>
            );
          }
        }
      </Query>
    );
  };
};

export default XmlTemplateShow;