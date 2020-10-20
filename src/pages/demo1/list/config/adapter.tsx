import { get, map, reduce, isEmpty, omit } from 'lodash';
import { formatTimeToStandard } from '@/utils/format';

export const processFromApi = data => {
  return map(data, item => {
    return {
      ...item,
      createdDate: formatTimeToStandard(get(item, 'createdDate')),
      lastModifiedDate: formatTimeToStandard(get(item, 'lastModifiedDate')),
      roles: map(get(item, 'roles'), group => get(group, 'id')),
      role: reduce(
        get(item, 'roles'),
        (sum, group) => {
          return `${isEmpty(sum) ? '' : sum + '、'}${get(group, 'nickname')}`;
        },
        '',
      ),
    };
  });
};

export const fromApi = item => {
  return {
    ...item,
    createdDate: formatTimeToStandard(get(item, 'createdDate')),
    lastModifiedDate: formatTimeToStandard(get(item, 'lastModifiedDate')),
    roles: map(get(item, 'roles'), group => get(group, 'id')),
  };
};

export const toApi = item => {
  return {
    ...omit(item, ['createdDate', 'lastModifiedDate', 'roles', 'role']),
    roles: map(get(item, 'roles'), id => ({ id })),
  };
};
