import React from 'react';
import BaseQuery from '@/components/base-query';
import { Input } from 'antd';
import { queryFormDescriptions as formDescriptions } from '../config/form';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return <>{this.renderEditItem('title', <Input size="small" placeholder="please entry title" />)}</>;
  };
}
