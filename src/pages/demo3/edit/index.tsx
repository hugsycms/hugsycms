import React from 'react';
import Form from './components/Form';
import { toApi, fromApi } from './config/adapter';
import BaseEditPanel from '@/components/BaseEditPanel';

export default class AdmissionPanel extends BaseEditPanel {
  static defaultProps = {
    baseUrl: '/api/admissions',
    moduleName: 'admission',
    title: '入院登记',
    toApi,
    fromApi,
    Form,
  };
}
