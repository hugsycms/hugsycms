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
  // TODO: change yourself
      message.error('预览模式，无法提交');
  return Promise.reject('预览模式，无法提交');
};

export const updateMenu = async (data) => {
  // TODO: change yourself
      message.error('预览模式，无法提交');
  return Promise.reject('预览模式，无法提交');
};

export const deleteMenu = async (id) => {
  // TODO: change yourself
      message.error('预览模式，无法提交');
  return Promise.reject('预览模式，无法提交');
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
