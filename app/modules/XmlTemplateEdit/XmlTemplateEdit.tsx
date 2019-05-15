import * as React from 'react';
import { compose } from 'recompose';
import XmlTemplateForm from 'modules/XmlTemplateForm';
import { xmlTemplateQuery } from 'store/app';

type Props = { XmlTemplateQuery:any };

class XmlTemplateEdit extends React.Component<Props> {
  onValidSubmit = (updatedFields:any) => {
    const { name, xml } = updatedFields;
  };
  render() {
    const { XmlTemplateQuery } = this.props;
    const xmlTemplate = XmlTemplateQuery.loading ? {} : XmlTemplateQuery.xmlTemplate;
    const fields = { name: xmlTemplate.name, xml: xmlTemplate.xml };

    return(
      <div>
        <XmlTemplateForm fields={fields} onValidSubmit={this.onValidSubmit} />
      </div>
    );
  };
};

export default compose<Props, {}>(
  xmlTemplateQuery
)(XmlTemplateEdit);
