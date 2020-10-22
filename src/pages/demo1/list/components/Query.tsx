import React, { Fragment } from 'react';
import BaseQuery from '@/components/BaseQuery';
import { Input } from 'antd';
import { queryFormDescriptions as formDescriptions } from '../config/form';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return (
      <Fragment>
        {this.renderEditItem('login', <Input size="small" placeholder="请输入账号" />)}
        {this.renderEditItem('firstName', <Input size="small" placeholder="请输入姓名" />)}
      </Fragment>
    );
  };
}
