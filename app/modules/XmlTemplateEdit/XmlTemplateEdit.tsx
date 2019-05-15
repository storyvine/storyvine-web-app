import * as React from 'react';
import XmlTemplateForm from 'modules/XmlTemplateForm';

class XmlTemplateEdit extends React.Component {
  onValidSubmit = (updatedFields:any) => {
    console.log('handleFormChange', updatedFields);
  };
  render() {
    const fields = { name: '', xml: '' };

    return(
      <div>
        <XmlTemplateForm fields={fields} onValidSubmit={this.onValidSubmit} />
      </div>
    );
  };
};

export default XmlTemplateEdit;
