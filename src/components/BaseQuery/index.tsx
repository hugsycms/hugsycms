import React from 'react';
import { Form, Button } from 'antd';
import { SearchOutlined, RedoOutlined } from '@/components/GeneralComponents/CustomIcon';
import DynamicForm from '@/components/BaseModalForm/DynamicForm';
import './index.less';

interface IState {}
interface IProps {
  onSearch?: (value: any) => void;
}

export default class BaseQuery extends DynamicForm<IProps, IState> {
  formDescriptions = {};

  formItemLayout = {
    labelCol: {},
    wrapperCol: {},
  };

  renderEditItem = (key: string, ReactNode: React.ReactNode, others?: object) => {};

  renderContent = () => {};

  handleReset = () => {
    this.form && this.form.resetFields();
    this.handleSearch();
  };

  handleSearch = (values = {}) => {
    const { onSearch } = this.props;
    onSearch && onSearch(values);
  };

  renderBtn = () => (
    <Form.Item colon={false} label=" ">
      <>
        <Button size="small" icon={<RedoOutlined />} onClick={this.handleReset}>
          Reset
        </Button>
        <Button size="small" type="primary" icon={<SearchOutlined />} htmlType="submit">
          Submit
        </Button>
      </>
    </Form.Item>
  );

  render() {
    const { queryRef, ...rest } = this.props;
    return (
      <div ref={queryRef} className="global-query-form">
        <Form ref={this.formRef} layout="inline" onFinish={this.handleSearch} {...rest}>
          {this.renderContent()}
          {this.renderBtn()}
        </Form>
      </div>
    );
  }
}
