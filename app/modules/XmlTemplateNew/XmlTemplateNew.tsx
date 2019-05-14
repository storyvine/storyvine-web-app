import * as React from 'react';
import { Form, Row, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

type Props = FormComponentProps;
interface State {};

class XmlTemplateNew extends React.Component<Props, State> {
  state = {
  };
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((errors, { name, xml }) => {
      if (errors) return;

      console.log('valid');
    });
  };
  render() {
    const {
      form: { getFieldDecorator },
    } = this.props;

    return(
       <div>
        <Row type="flex">
          <h1>XML</h1>
        </Row>

        <Form layout={'vertical'} onSubmit={this.handleSubmit}>
          <FormItem label='Name'>
            { getFieldDecorator('name',
              { rules: [{ required: true }],
            })(
              <Input
                size='large'
                placeholder='My super duper XML'
              />
            )}
          </FormItem>
          <FormItem label="XML">
            { getFieldDecorator('xml',
              { rules: [{ required: true }],
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

export default Form.create<Props>()(XmlTemplateNew);
