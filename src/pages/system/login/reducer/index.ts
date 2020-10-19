import request from '@/lib/request';
import store from 'store';
import { APP_CONFIG } from '@/lib/config/constants';
import { Dispatch } from 'redux';
import { get } from 'lodash';
import { initUser } from '@/lib/redux/action/user';

export const doLogin = (data: any) => async (dispatch: Dispatch) => {
  const { username } = data;
  const token = get(await request.post('/api/mock/authenticate', data), 'id_token');
  store.set(APP_CONFIG.TOKEN, token);
  store.set(APP_CONFIG.AUTH_NAME, username);
  store.set(APP_CONFIG.LOGIN_TIME, new Date().getTime());
  await initUser(username)(dispatch);
  return {
    token,
    username,
  };
};

export const loginByOauth = (data: {}) => async (dispatch: Dispatch) => {
  const result = (await request.post('/api/mock/desklogin', data)) as object;
  const { emp_id = 'admin', id_token: idToken, pat_id: patId } = result;
  store.set(APP_CONFIG.TOKEN, idToken);
  store.set(APP_CONFIG.AUTH_NAME, emp_id);
  store.set(APP_CONFIG.LOGIN_TIME, new Date().getTime());
  await initUser(emp_id)(dispatch);
  return {
    ...result,
    patId,
  };
};
