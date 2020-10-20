import React from 'react';
import { Form, Modal, message } from 'antd';
import { get, isFunction } from 'lodash';
import DynamicForm from '@/components/BaseModalForm/DynamicForm';
import request from '@/lib/request';
import FormSection from './FormSection';

export default ({
  formDescriptions,
  url,
  title,
  fromApi,
  toApi,
  modalProps = {},
  fixedFormParams = {},
  formItemLayout = {
    labelCol: {
      span: 6,
    },
    wrapperCol: {
      span: 16,
    },
  },
}) => {
  return class BaseModalForm extends DynamicForm {
    state = {
      data: {},
    };

    renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });

    componentDidMount() {
      const { id, primaryKey } = this.props;
      setTimeout(async () => {
        this.form = this.formRef.current;
        if (id) {
          const values = isFunction(fromApi)
            ? fromApi(get(await request.get(`${url}/${primaryKey || id}`), 'data'))
            : get(await request.get(`${url}/${primaryKey || id}`), 'data');
          this.form.setFieldsValue(values);
          this.setState({ data: values });
        }
      }, 100);
    }

    handleSubmit = async () => {
      const { data } = this.state;
      const { id, onCancel, onSearch, onSubmit } = this.props;
      let tip = '';
      let method = '';
      await this.form.validateFields();
      const values = isFunction(toApi)
        ? toApi({ ...data, ...this.form.getFieldsValue(), id })
        : { ...data, ...this.form.getFieldsValue(), id };
      if (isFunction(onSubmit)) {
        onSubmit({
          ...values,
          ...fixedFormParams,
        });
        return;
      }
      if (id) {
        tip = `修改${title}成功`;
        method = 'put';
      } else {
        tip = `添加${title}成功`;
        method = 'post';
      }
      // TODO: change yourself
      message.error('预览模式，无法提交');
      return Promise.reject('预览模式，无法提交');
      await request[method](`${url}`, {
        ...values,
        ...fixedFormParams,
      });
      message.success(tip);
      onCancel();
      onSearch();
    };

    renderEditContent = () => {
      return <FormSection {...this.props} renderEditItem={this.renderEditItem} formDescriptions={formDescriptions} />;
    };

    render() {
      const { visible, onCancel, id } = this.props;
      return (
        <Modal
          {...modalProps}
          visible={visible}
          onCancel={onCancel}
          onOk={this.handleSubmit}
          title={id ? `修改${title}` : `添加${title}`}
        >
          <Form ref={this.formRef} {...formItemLayout}>
            {this.renderEditContent()}
          </Form>
        </Modal>
      );
    }
  };
};
