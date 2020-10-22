import React from 'react';
import Form from './components/Form';
import { toApi, fromApi } from './config/adapter';
import BaseEditPanel from '@/components/BaseEditPanel';

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
