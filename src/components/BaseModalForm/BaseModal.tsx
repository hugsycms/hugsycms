import React from 'react';
import { Modal, Form } from 'antd';
import FormSection from './FormSection';
import DynamicForm from '@/components/BaseModalForm/DynamicForm';

export default class Base extends DynamicForm {
  static defaultProps = {
    title: '',
    formDescriptions: {},
    formItemLayout: {
      labelCol: {
        span: 6,
      },
      wrapperCol: {
        span: 12,
      },
    },
  };

  constructor(props: any) {
    super(props);
    const { formDescriptions, formItemLayout } = props;
    this.renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });
  }

  renderEditItem = (key: any, ReactNode: any) => {};

  handleSubmit = async () => {
    const { onSubmit } = this.props;
    await this.form.validateFields();
    onSubmit(this.form.getFieldsValue());
  };

  render() {
    const { visible, onCancel, data, title, formDescriptions } = this.props;
    return (
      <Modal
        visible={visible}
        destroyOnClose
        title={title}
        onCancel={onCancel}
        onOk={this.handleSubmit}
      >
        <Form ref={this.formRef}>
          <FormSection
            data={data}
            formDescriptions={formDescriptions}
            renderEditItem={this.renderEditItem}
          />
        </Form>
      </Modal>
    );
  }
}
