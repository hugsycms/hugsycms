import { formatMenu } from '@/components/general-components/parent-permission-select';
import { APP_CONFIG } from '@/lib/config/constants';
import request from '@/lib/request';
import { message } from 'antd';
import { map, isEmpty, get } from 'lodash';

export const getAllMenus = async () => {
  return map(get(await request.get('/api/mock/permissions/all'), 'data'), formatMenu);
};

export const getActiveMenu = async (id) => {
  return formatMenu(get(await request.get(`/api/mock/permissions/${id}`), 'data'));
};

export const createMenu = async (data) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error(window.t('common.preview-mode-tip'));
    return Promise.reject(window.t('common.preview-mode-tip'));
  }
};

export const updateMenu = async (data) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error(window.t('common.preview-mode-tip'));
    return Promise.reject(window.t('common.preview-mode-tip'));
  }
};

export const deleteMenu = async (id) => {
  if (APP_CONFIG.isDev) {
    // TODO: change yourself
    message.error(window.t('common.preview-mode-tip'));
    return Promise.reject(window.t('common.preview-mode-tip'));
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
