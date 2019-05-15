import * as React from 'react';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

import { FormComponentProps } from 'antd/lib/form/Form';
interface InnerProps { fields:any, onValidSubmit: Function }
type Props = InnerProps & FormComponentProps;

class XmlTemplateForm extends React.Component<Props> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((errors, updatedFields) => {
      if (errors) return;

      this.props.onValidSubmit(updatedFields);
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      fields: { name, xml }
    } = this.props;

    return(
      <div>
        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <FormItem label='Name'>
            { getFieldDecorator('name',
              { rules: [{ required: true }], initialValue: name,
            })(
              <Input
                size='large'
                placeholder='My super duper XML'
              />
            )}
          </FormItem>
          <FormItem label='XML'>
            { getFieldDecorator('xml',
              { rules: [{ required: true }], initialValue: xml,
            })(
              <TextArea
                rows={20}
                placeholder='<xml></xml>'
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type='primary'
              onClick={this.handleSubmit}>
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  };
};

const XmlTemplateForm1 = Form.create<Props>()(XmlTemplateForm);

class XmlTemplateEdit extends React.Component {
  onValidSubmit = (updatedFields:any) => {
    console.log('handleFormChange', updatedFields);
  };
  render() {
    const fields = { name: '', xml: '' };

    return(
      <div>
        <XmlTemplateForm1 fields={fields} onValidSubmit={this.onValidSubmit} />
      </div>
    );
  };
};

export default XmlTemplateEdit;
