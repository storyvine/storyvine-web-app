import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { QUERY_XML_TEMPLATE } from 'store/app';
import { Query } from 'react-apollo';

type Props = RouteComponentProps;

class XmlTemplateShow extends React.Component<Props> {
  render() {
    const { match: { params }}:any = this.props;

    return(
      <Query query={QUERY_XML_TEMPLATE} variables={{ id: params.id }}>
        {
          ({ data, error}) => {
            const xmlTemplate = data.xmlTemplate ? data.xmlTemplate : {};

            return(
              <div>
                <h1>Template: {xmlTemplate.name}</h1>
              </div>
            );
          }
        }
      </Query>
    );
  };
};

export default XmlTemplateShow;