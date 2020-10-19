import React from 'react';
import { resetFormDescriptions as formDescriptions } from './reset-config';
import DynamicForm from '@/components/BaseModalForm/DynamicForm';
import request from '@/lib/request';
import FormSection from '@/components/BaseModalForm/FormSection';
import { Modal, Form, message } from 'antd';
import { get } from 'lodash';

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 12,
  },
};

interface IProps {
  primaryKey?: string;
  id?: string;
  visible?: boolean;
  onCancel: () => void;
}

export default class ResetPasswordModal extends DynamicForm<IProps> {
  state = {
    data: {},
  };

  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout,
  });

  componentDidMount() {
    const { primaryKey } = this.props;
    setTimeout(async () => {
      this.form = this.formRef.current;
      const data = await request.get(`/api/mock/users/${primaryKey}`);
      this.setState({ data });
    }, 100);
  }

  handleSubmit = async () => {
    const { data } = this.state;
    const { onCancel } = this.props;
    await this.form.validateFields();
    await request.post('/api/account/reset-password', {
      login: get(data, 'login'),
      password: this.form.getFieldValue('password'),
    });
    message.success('重置密码成功');
    onCancel();
  };

  renderEditContent = () => {
    return <FormSection {...this.props} renderEditItem={this.renderEditItem} formDescriptions={formDescriptions} />;
  };

  render() {
    const { visible, onCancel } = this.props;
    return (
      <Modal width={400} visible={visible} onCancel={onCancel} onOk={this.handleSubmit} title="重置密码">
        <Form ref={this.formRef} {...formItemLayout}>
          {this.renderEditContent()}
        </Form>
      </Modal>
    );
  }
}
