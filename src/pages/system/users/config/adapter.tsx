import { get, map, reduce, isEmpty, omit } from 'lodash';
import { formatTimeToStandard } from '@/utils/format';

export const processFromApi = (data) => {
  return map(data, (item) => {
    return {
      ...item,
      createdAt: formatTimeToStandard(get(item, 'createdAt')),
      roles: map(get(item, 'roles'), (group) => get(group, 'id')),
      roleString: reduce(
        get(item, 'roles'),
        (sum, group) => {
          return `${isEmpty(sum) ? '' : sum + '、'}${get(group, 'name')}`;
        },
        '',
      ),
    };
  });
};

export const fromApi = (item) => {
  return {
    ...item,
    createdAt: formatTimeToStandard(get(item, 'createdAt')),
    roles: map(get(item, 'roles'), (group) => get(group, 'id')),
  };
};

export const toApi = (item) => {
  return {
    ...omit(item, ['createdAt', 'lastModifiedDate', 'roles', 'role']),
    roles: map(get(item, 'roles'), (id) => ({ id })),
  };
};
