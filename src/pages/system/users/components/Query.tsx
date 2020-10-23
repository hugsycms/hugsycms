import React, { Fragment } from 'react';
import BaseQuery from '@/components/base-query';
import { Input } from 'antd';
import { queryFormDescriptions as formDescriptions } from '../config/form';

export default class Query extends BaseQuery {
  renderEditItem = this.generateRenderEditItem(formDescriptions, {
    formItemLayout: this.formItemLayout,
  });

  renderContent = () => {
    return (
      <Fragment>
        {this.renderEditItem('username', <Input size="small" placeholder="please input username" />)}
        {this.renderEditItem('nickname', <Input size="small" placeholder="please input nickname" />)}
      </Fragment>
    );
  };
}
