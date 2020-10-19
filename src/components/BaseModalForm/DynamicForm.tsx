import React from 'react';
import { Form } from 'antd';
import { get } from 'lodash';
import { FormInstance } from 'antd/lib/form/Form';

export const horizontalFormItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

export const verticalFormItemLayout = {
  labelCol: {
    span: 12,
  },
  wrapperCol: {
    span: 12,
  },
};

export const nonLabelLayout = {
  labelCol: {
    span: 0,
  },
  wrapperCol: {
    span: 24,
  },
};

export default class DynamicForm<IProps = {}, IState = {}> extends React.Component<IProps, IState> {
  formRef = React.createRef<FormInstance>();

  form: any;

  componentDidMount() {
    setTimeout(() => {
      this.form = this.formRef.current;
    }, 100);
  }

  generateRenderEditItem = (formDescriptions: any, options: any = {}) => {
    const { formItemLayout } = options;

    return (key: string, ReactNode: React.ReactNode, others: object = {}) => {
      const config = get(formDescriptions, key) || {};
      const { label, rules } = config;
      return (
        <Form.Item
          {...formItemLayout}
          {...get(others, 'customFormItemLayout')}
          style={{ ...get(others, 'styles') }}
          key={key}
          label={label}
          name={key}
          rules={rules}
        >
          {ReactNode}
        </Form.Item>
      );
    };
  };

  generateRenderViewItem = () => () => {};

  render() {
    return <div></div>;
  }
}
