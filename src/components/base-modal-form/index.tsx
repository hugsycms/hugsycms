import React from 'react';
import { Form, Modal, message } from 'antd';
import { isFunction } from 'lodash';
import DynamicForm from '@/components/base-dynamic-form/dynamic-form';
import FormSection from '@/components/base-dynamic-form/form-section';
import request from '@/lib/request';
import { APP_CONFIG } from '@/lib/config/constants';
import { getDataDetail } from '../base-list/methods';

interface IModalFormParams {
  formDescriptions: any;
  url: string;
  title: string;
  fromApi?: (data: object) => object;
  toApi?: (data: object) => object;
  modalProps?: object;
  fixedFormParams?: object;
  formItemLayout?: {
    labelCol?: {
      span?: number;
    };
    wrapperCol?: {
      span?: number;
    };
  };
}

interface IProps {
  visible: boolean;
  id: number | string;
  primaryKey: number | string;
  onCancel: () => any;
  onSearch: () => any;
  onSubmit: (data: any) => any;
}

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
}: IModalFormParams) => {
  return class BaseModalForm extends DynamicForm<IProps, IState> {
    state = {
      data: {},
    };

    renderEditItem = this.generateRenderEditItem(formDescriptions, {
      formItemLayout,
    });

    async componentDidMount() {
      const { id, primaryKey } = this.props;
      this.form = this.formRef.current;
      if (id) {
        const values = await getDataDetail(`${url}/${primaryKey || id}`, fromApi);
        this.form.setFieldsValue(values);
        this.setState({ data: values });
      }
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
        tip = window.t('common.update-success', { title });
        method = 'put';
      } else {
        tip = window.t('common.create-success', { title });
        method = 'post';
      }
      if (APP_CONFIG.isDev) {
        // TODO: change yourself
        message.error(window.t('common.preview-mode-tip'));
        return Promise.reject(window.t('common.preview-mode-tip'));
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
        <Form ref={this.formRef} {...formItemLayout}>
          <Modal
            {...modalProps}
            visible={visible}
            onCancel={onCancel}
            onOk={this.handleSubmit}
            title={id ? `${window.t('common.update')} ${title}` : `${window.t('common.create')} ${title}`}
          >
            {this.renderEditContent()}
          </Modal>
        </Form>
      );
    }
  };
};
