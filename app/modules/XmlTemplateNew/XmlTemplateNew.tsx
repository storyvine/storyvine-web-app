import * as React from 'react';
import { compose } from 'recompose';
import { Form, Row, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/lib/form/Form';
import { MutationFn } from 'react-apollo';
import { createXmlTemplateMutation } from './store';

const FormItem = Form.Item;
const TextArea = Input.TextArea;

interface State { message: String };
interface InnerProps { CreateXmlTemplateMutation: MutationFn; }

type Props = InnerProps & FormComponentProps;

class XmlTemplateNew extends React.Component<Props, State> {
  state = {
    message: ''
  };
  handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    this.props.form.validateFields((errors, { name, xml }) => {
      if (errors) return;

      const { CreateXmlTemplateMutation } = this.props;
      CreateXmlTemplateMutation({
        variables: { name: name, xml: xml },
        update: (_store, { data: { createXmlTemplate }}) => {
          const message = `XML Template ${createXmlTemplate.name} has been created`;
          this.setState({ message: message });
          this.props.form.resetFields();
        }
      });

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

        <p>{this.state.message}</p>

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

export default compose<InnerProps, {}>(
  createXmlTemplateMutation
)(Form.create<Props>()(XmlTemplateNew));
