import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface InnerProps { fields:any, onValidSubmit:Function }
type Props = InnerProps & FormComponentProps;

class CmsVariableForm extends React.Component<Props> {
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    
    this.props.form.validateFields((errors, validFields) => {
      if (errors) return;

      this.props.onValidSubmit(validFields);
      this.props.form.resetFields();
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
      fields: { label, key, inputType }
    } = this.props;

    return(
      <div>
        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <FormItem label='Label'>
            { getFieldDecorator('label',
              { rules: [{ required: true }], initialValue: label,
            })(
              <Input
                size='large'
                placeholder='Label'
              />
            )}
          </FormItem>
          <FormItem label='Key'>
            { getFieldDecorator('key',
              { rules: [{ required: true }], initialValue: key,
            })(
              <Input
                size='large'
                placeholder='Key'
              />
            )}
          </FormItem>
          <FormItem label='Input Type'>
            { getFieldDecorator('inputType',
              { rules: [{ required: true }], initialValue: inputType,
            })(
              <Select>
                <Option value='text_input'>Text Input</Option>
                <Option value='file_input'>File Input</Option>
              </Select>
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

export default Form.create<Props>()(CmsVariableForm);;