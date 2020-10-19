import request from '@/lib/request';
import { map, isEmpty } from 'lodash';

export const getAllMenus = async () => {
  return await request.get('/api/mock/permissions?size=1000');
};

export const getActiveMenu = async (id) => {
  return await request.get(`/api/mock/permissions/${id}`);
};

export const addMenu = async (data) => {
  return await request.post('/api/mock/permissions', data);
};

export const updateMenu = async (data) => {
  return await request.put('/api/mock/permissions', data);
};

export const deleteMenu = async (id) => {
  return await request.delete(`/api/mock/permissions/${id}`);
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
