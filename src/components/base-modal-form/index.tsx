import React from 'react';
import { Form, Modal, message } from 'antd';
import { get, isFunction } from 'lodash';
import DynamicForm from '@/components/base-modal-form/dynamic-form';
import request from '@/lib/request';
import FormSection from './form-section';
import { APP_CONFIG } from '@/lib/config/constants';

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
        tip = `Update ${title} Success`;
        method = 'put';
      } else {
        tip = `Create ${title} Success`;
        method = 'post';
      }
      if (APP_CONFIG.isDev) {
        // TODO: change yourself
        message.error('Preview mode, unable to submit');
        return Promise.reject('Preview mode, unable to submit');
      }
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
          title={id ? `Update ${title}` : `Create ${title}`}
        >
          <Form ref={this.formRef} {...formItemLayout}>
            {this.renderEditContent()}
          </Form>
        </Modal>
      );
    }
  };
};
