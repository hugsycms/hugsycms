import axios, { AxiosError } from 'axios';
import { message } from 'antd';
import { get } from 'lodash';
import { APP_CONFIG, RUNTIME_CONFIG } from '../config/constants';
import store from 'store';

axios.interceptors.request.use((config: any) => {
  const { url } = config;
  config.timeout = 240000;
  let token = store.get(APP_CONFIG.TOKEN);

  // 不是登录并且没有 token ，跳转到登录页面
  if (!(['/api/authenticate', '/api/dictionaries', '/api/desklogin'].indexOf(url) > -1) && !token) {
    message.error('未登录，请先登录');
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
    if (RUNTIME_CONFIG.SUCCESS_HTTP_STATUS.indexOf(response.status) > -1) {
      return get(response, 'data');
    }
    return Promise.reject(response);
  },
  (error: AxiosError) => {
    // 单独处理单页应用登录授权
    if (error.config.url === '/api/desklogin') {
      return Promise.reject(error);
    }
    switch (get(error, 'response.status')) {
      case 401:
        if (window.location.pathname !== '/login') {
          message.error('登录已超时，请重新登录');
          store.clearAll();
          window.location.href = '/login';
        }
        return Promise.reject(error.response);
      case 400:
        return Promise.reject(error.response);
      case 503:
        message.error('服务器内部发生错误, 请联系系统管理员及时处理');
        // window.location.href = '/503';
        return Promise.reject(error.response);
      default:
        message.error('发生错误');
        // notification.error({
        //   description: get(error, 'response.data.detail'),
        //   message: '发生错误',
        // });
        return Promise.reject(error.response);
    }
  },
);

export default axios;
