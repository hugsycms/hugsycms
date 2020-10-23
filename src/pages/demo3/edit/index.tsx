import React from 'react';
import Form from './components/form';
import { toApi, fromApi } from './config/adapter';
import BaseEditPanel from '@/components/base-edit-panel';

export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/mock/articles',
    moduleName: 'article',
    title: '文章管理',
    toApi,
    fromApi,
    Form,
  };
}
