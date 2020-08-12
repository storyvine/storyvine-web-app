import * as React from 'react';
import { FormComponentProps } from 'antd/lib/form/Form';
import { Form, Input, Button, Select, Checkbox } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

interface InnerProps {
  fields: any;
  onValidSubmit: Function;
}
type Props = InnerProps & FormComponentProps;

interface State {
  lockableVariableFlag: boolean | undefined;
}

class CmsVariableForm extends React.Component<Props, State> {
  state = {
    lockableVariableFlag: undefined,
  };
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((errors, validFields) => {
      if (errors) return;

      this.props.onValidSubmit(validFields);
      this.props.form.resetFields();
    });
  };
  handlelockableVariableFlag = (e: any) => {
    this.setState({ lockableVariableFlag: !this.state.lockableVariableFlag });

    // this.props.form.setFieldsValue({ ['lockableVariableFlag']: e.target.checked });
  };
  render() {
    const {
      form: { getFieldDecorator },
      fields: { label, key, inputType, category, lockableVariableFlag },
    } = this.props;

    if (
      (lockableVariableFlag == false || lockableVariableFlag == true) &&
      this.state.lockableVariableFlag == undefined
    ) {
      this.setState({ lockableVariableFlag: lockableVariableFlag });
    }

    return (
      <div>
        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <FormItem label="Label">
            {getFieldDecorator('label', { rules: [{ required: true }], initialValue: label })(
              <Input size="large" placeholder="Label" />
            )}
          </FormItem>
          <FormItem label="Key">
            {getFieldDecorator('key', { rules: [{ required: true }], initialValue: key })(
              <Input size="large" placeholder="Key" />
            )}
          </FormItem>
          <FormItem label="Input Type">
            {getFieldDecorator('inputType', {
              rules: [{ required: true }],
              initialValue: inputType,
            })(
              <Select>
                <Option value="text_input">Text Input</Option>
                <Option value="file_input">File Input</Option>
                <Option value="color_input">Color Input</Option>
              </Select>
            )}
          </FormItem>
          <FormItem label="Category">
            {getFieldDecorator('category', { rules: [{ required: true }], initialValue: category })(
              <Select>
                <Option value="sub_organization">Sub Organization</Option>
                <Option value="organization">Organization</Option>
                <Option value="template">Template</Option>
              </Select>
            )}
          </FormItem>
          <FormItem
            key="lockableVariableFlag"
            label="Lockable variable (available only for Organization category)"
          >
            <Checkbox
              value={this.state.lockableVariableFlag}
              checked={this.state.lockableVariableFlag}
              onChange={this.handlelockableVariableFlag}
            ></Checkbox>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleSubmit}>
              Save
            </Button>
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create<Props>()(CmsVariableForm);
