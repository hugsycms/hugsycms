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
        {this.renderEditItem('name', <Input size="small" placeholder="请输入孕妇姓名" />)}
        {this.renderEditItem('idNO', <Input size="small" placeholder="请输入证件号码" />)}
      </Fragment>
    );
  };
}
