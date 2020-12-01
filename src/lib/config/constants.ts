import LOGO from '@/assets/imgs/logo.svg';

export const APP_CONFIG = {
  isDev: true,
  LOGIN_URL: '/login',
  TOKEN: 'TOKEN-KEY',
  EXPIRE_TIME: 18000,
  AUTH_NAME: 'username',
  APP_INDEX_TITLE: 'HUGSYCMS',
  COPYRIGHT: 'Copyright © 2019-2021 HUGSYCMS',
  VERSION: 'v0.0.1',
  TITLE: 'HUGSYCMS',
  APP_INDEX_DESCRIPTION: 'HUGSYCMS',
  LOGO,
  LOGIN_TIME: 'login-time',
  EXPIRED: 'expired',
  CELL_WIDTH_SMALL: 100,
  CELL_WIDTH_MIDDLE: 140,
  CELL_WIDTH_LARGE: 200,
};

export const RUNTIME_CONFIG = {
  SUCCESS_HTTP_STATUS: [200, 201, 204],
};

export const REDUX_CONFIG = {
  INIT_USER: 'init.user',
  ADD_TAB: 'add.tabs',
  DELETE_TAB: 'delete.tabs',
  DELETE_ALL_TAB: 'delete.all.tabs',
  UPDATE_COLLAPSED: 'system.collapsed.updated',
};
