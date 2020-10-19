import { map, get } from 'lodash';

export const fromApi = item => {
  return {
    ...item,
    permissions:
      get(item, 'permissions') &&
      map(get(item, 'permissions'), permission => get(permission, 'id')),
    authorities:
      get(item, 'authorities') &&
      map(get(item, 'authorities'), permission => get(permission, 'name')),
  };
};

export const toApi = item => {
  return {
    ...item,
    authorities:
      get(item, 'authorities') && map(get(item, 'authorities'), auth => ({ name: auth })),
    permissions: get(item, 'authorities') && map(get(item, 'permissions'), id => ({ id })),
  };
};

export const processFromApi = data => {
  return map(data, item => fromApi(item));
};
