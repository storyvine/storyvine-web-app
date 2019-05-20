import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { QUERY_XML_TEMPLATE_DETAIL } from 'store/app';
import { Query } from 'react-apollo';

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