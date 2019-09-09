import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Input, Button, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface InnerProps { fields:any, onValidSubmit:Function }
type Props = InnerProps & FormComponentProps;

class UserVariableForm extends React.Component<Props> {
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
      fields: { label, key, screen, characterLimit, position }
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
          <FormItem label='Position'>
            { getFieldDecorator('position',
              { rules: [{ required: true }], initialValue: position,
            })(
              <Input
                size='large'
                placeholder='Position'
                type='number'
              />
            )}
          </FormItem>
          <FormItem label='Character Limit'>
            { getFieldDecorator('characterLimit',
              { rules: [{ required: true }], initialValue: characterLimit,
            })(
              <Input
                size='large'
                placeholder='Character Limit'
                type='number'
              />
            )}
          </FormItem>
          <FormItem label='Screen'>
            { getFieldDecorator('screen',
              { rules: [{ required: true }], initialValue: screen,
            })(
              <Select>
                <Option value='1'>1</Option>
                <Option value='2'>2</Option>
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

export default Form.create<Props>()(UserVariableForm);;