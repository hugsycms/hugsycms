import { APP_CONFIG } from '@/lib/config/constants';
import request from '@/lib/request';
import { message } from 'antd';
import { map, isEmpty, get } from 'lodash';

export const getAllMenus = async () => {
  return get(await request.get('/api/mock/permissions/all'), 'data');
};

export const getActiveMenu = async (id) => {
  return get(await request.get(`/api/mock/permissions/${id}`), 'data');
};

export const createMenu = async (data) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error('Preview mode, unable to submit');
    return Promise.reject('Preview mode, unable to submit');
  }
};

export const updateMenu = async (data) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error('Preview mode, unable to submit');
    return Promise.reject('Preview mode, unable to submit');
  }
};

export const deleteMenu = async (id) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error('Preview mode, unable to submit');
    return Promise.reject('Preview mode, unable to submit');
  }
};

export const transferMenus = (menus, parentid = 0) => {
  const result: any = [];
  map(menus, (item) => {
    if (item.parentid === parentid) {
      item.title = item.name;
      item.key = item.id;
      item.children = transferMenus(menus, item.id);
      if (isEmpty(item.children)) {
        item.isLeaf = true;
      } else {
        item.isLeaf = false;
      }
      result.push(item);
    }
  });
  return result;
};
