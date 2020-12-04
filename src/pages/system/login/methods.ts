import request from '@/lib/request';
import store from 'store';
import { APP_CONFIG } from '@/lib/config/constants';
import { Dispatch } from 'redux';
import { initUser } from '@/lib/redux/action/user';
import { get } from 'lodash';

export const doLogin = (data: any) => async (dispatch: Dispatch) => {
  const { username } = data;
  const { loginTime, expired, token } = get(await request.post('/api/mock/authenticate', data), 'data');
  store.set(APP_CONFIG.TOKEN, token);
  store.set(APP_CONFIG.AUTH_NAME, username);
  store.set(APP_CONFIG.LOGIN_TIME, loginTime);
  store.set(APP_CONFIG.EXPIRED, expired);
  await initUser(username)(dispatch);
  return {
    loginTime,
    expired,
    token,
    username,
  };
};
