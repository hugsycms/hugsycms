import React from 'react';
import { Form, Divider, Button, message } from 'antd';
import { FileTextOutlined, RedoOutlined } from '@/components/GeneralComponents/CustomIcon';
import { get, map, isFunction, debounce } from 'lodash';
import { FormInstance } from 'antd/lib/form';
import DynamicForm from '@/components/BaseModalForm/DynamicForm';
import FormSection from '@/components/BaseModalForm/FormSection';
import './less/base-edit-panel-form.less';

const formItemLayout = {
  // layout: 'horizontal',
  labelCol: {
    span: 10,
  },
  wrapperCol: {
    span: 14,
  },
};

interface IProps {
  data: any;
  formDescriptionsWithoutSection: any;
  formDescriptions: any;
  onFinish: (data: any) => void;
}

interface IState {}

export default class BaseEditPanelForm extends DynamicForm<IProps, IState> {
  form: FormInstance | null = null;

  state = {
    printModalVisible: false,
  };

  renderEditItem: ((key: string, ReactNode: React.ReactNode, others: object) => React.ReactNode) | null = null;

  componentDidMount() {
    const { data, formDescriptionsWithoutSection } = this.props;
    this.form = this.formRef.current;
    this.form && this.form.setFieldsValue(data);
    this.renderEditItem = this.generateRenderEditItem(formDescriptionsWithoutSection, {
      formItemLayout,
    });
    // 强制渲染获取 form
    this.forceUpdate();
  }

  // 可能需要从外部更新获取数据
  componentWillReceiveProps(nextProps: any) {
    this.form &&
      this.form.setFieldsValue({
        ...this.form.getFieldsValue(),
        ...get(nextProps, 'data'),
      });
  }

  handleReset = () => {
    const form = (this.form as unknown) as FormInstance;
    form.resetFields();
  };

  handleFinish = async () => {
    const form = (this.form as unknown) as FormInstance;
    const { onFinish, data } = this.props;
    form &&
      form
        .validateFields()
        .then(() => {
          const params = {
            ...form.getFieldsValue(),
            id: get(data, 'id'),
          };
          onFinish && onFinish(params);
        })
        .catch((error) => {
          message.error(get(error, 'errorFields.0.errors.0'));
          form.scrollToField(get(error, 'errorFields.0.name.0'));
        });
  };

  getEvents = () => ({});

  handleItemChange = () => ({});

  renderSection = (section: any) => {
    const { data } = this.props;
    return (
      <>
        {/* <Divider key={`${get(section, 'flag')}-divider`} orientation="left">
          {get(section, 'name')}
        </Divider> */}
        <span className="base-edit-panel-form_section_title" key={`${get(section, 'flag')}-divider`}>
          {get(section, 'name')}
        </span>
        {this.form && (
          <FormSection
            key={`${get(section, 'flag')}-section`}
            data={data}
            formDescriptions={get(section, 'fields')}
            renderEditItem={this.renderEditItem as any}
            form={this.form}
            events={isFunction(this.getEvents) && this.getEvents()}
          />
        )}
      </>
    );
  };

  renderEditContent = () => {
    const { formDescriptions } = this.props;
    return map(formDescriptions, (section, index) => {
      return (
        <div className="base-edit-panel-form_section" key={index}>
          {this.renderSection(section)}
        </div>
      );
    });
  };

  renderResetBtn = () => {
    return (
      <Button htmlType="reset" icon={<RedoOutlined />} onClick={this.handleReset}>
        重置
      </Button>
    );
  };

  renderSubmitBtn = () => {
    return (
      <Button type="primary" icon={<FileTextOutlined />} htmlType="submit" onClick={debounce(this.handleFinish)}>
        保存
      </Button>
    );
  };

  renderBtns = () => {
    return (
      <div className="base-edit-panel-form_btns">
        {this.renderResetBtn()}
        {this.renderSubmitBtn()}
      </div>
    );
  };

  render() {
    return (
      <Form style={{ minWidth: '98%' }} ref={this.formRef} onValuesChange={this.handleItemChange} {...formItemLayout}>
        {this.renderEditContent()}
        {this.renderBtns()}
      </Form>
    );
  }
}
