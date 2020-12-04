import React from 'react';
import ReactDOM from 'react-dom';
import axios, { AxiosError } from 'axios';
import { notification } from 'antd';
import { get, startsWith } from 'lodash';
import { APP_CONFIG, RUNTIME_CONFIG } from '../config/constants';
import store from 'store';
import CustomSpin from '@/components/general-components/custom-spin';

let requestCount = 0;

function showLoading() {
  if (requestCount === 0) {
    var dom = document.createElement('div');
    dom.setAttribute('id', 'loading');
    document.body.appendChild(dom);
    ReactDOM.render(
      <div className="ant-modal-mask" style={{ backgroundColor: 'rgba(0,0,0,.1)', zIndex: 99999 }}>
        <CustomSpin />
      </div>,
      dom,
    );
  }
  requestCount++;
}

function hideLoading() {
  requestCount--;
  if (requestCount === 0) {
    document.body.removeChild(document.getElementById('loading') as any);
  }
}

axios.interceptors.request.use((config: any) => {
  if (config.headers.isLoading !== false) {
    showLoading();
  }
  const { url } = config;
  config.timeout = 240000;
  let token = store.get(APP_CONFIG.TOKEN);

  if (!(['/api/authenticate'].indexOf(url) > -1) && !token && !startsWith(url, '/api/mock')) {
    notification.error({
      message: window.t('common.no-login-tip'),
      description: window.t('common.no-login-tip'),
    });
    window.location.href = '/login';
    return config;
  }
  if (!config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    if (response.config.headers.isLoading !== false) {
      hideLoading();
    }
    if (RUNTIME_CONFIG.SUCCESS_HTTP_STATUS.indexOf(response.status) > -1) {
      return get(response, 'data');
    }
    return Promise.reject(response);
  },
  (error: AxiosError) => {
    if (error.config.headers.isLoading !== false) {
      hideLoading();
    }
    if (error.message === 'Network Error') {
      notification.error({
        description: get(error, 'response.data.detail'),
        message: window.t('common.network-error'),
      });
    }
    if (error.code === 'ECONNABORTED') {
      notification.error({
        description: get(error, 'response.data.detail'),
        message: window.t('common.timeout'),
      });
    }
    switch (get(error, 'response.status')) {
      case 401:
        if (window.location.pathname !== '/login') {
          store.clearAll();
          window.location.href = '/login';
        }
        return Promise.reject(error.response);
      case 400:
        return Promise.reject(error.response);
      case 404:
        notification.error({
          description: get(error, 'response.data.detail'),
          message: window.t('common.not-found-tip'),
        });
        return Promise.reject(error.response);
      case 503:
        notification.error({
          description: get(error, 'response.data.detail'),
          message: window.t('common.no-login-tip'),
        });
        return Promise.reject(error.response);
      default:
        notification.error({
          description: get(error, 'response.data.detail'),
          message: window.t('common.no-login-tip'),
        });
        return Promise.reject(error.response);
    }
  },
);

export default axios;
