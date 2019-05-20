import * as React from 'react';
import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface InnerProps { fields:any, onValidSubmit: Function }
type Props = InnerProps & FormComponentProps;

class XmlTemplateForm extends React.Component<Props> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((errors, updatedFields) => {
      if (errors) return;

      this.props.onValidSubmit(updatedFields);
      this.props.form.resetFields();
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      fields: { name, xml, description }
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
          <FormItem label='Description'>
            { getFieldDecorator('description',
              { rules: [{ required: false }], initialValue: description,
            })(
              <Input
                size='large'
                placeholder='Description'
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

export default Form.create<Props>()(XmlTemplateForm);;
