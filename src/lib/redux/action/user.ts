import { Dispatch } from 'redux';
import { REDUX_CONFIG } from '@/lib/config/constants';
import request from '@/lib/request';
import { get, reduce, concat, keyBy, pick, values, map } from 'lodash';
import { omitRoutes } from '@/lib/routes';

export const initUser = (username: any) => async (dispatch: Dispatch) => {
  const basicInfo = get(await request.get(`/api/mock/users/${username}`), 'data');
  let selfPermissions = concat(
    reduce(get(basicInfo, 'roles'), (sum, group) => concat(sum as [], get(group, 'permissions') as []), []),
    omitRoutes,
  );
  const permissionsMapping = keyBy(
    map(concat(selfPermissions, omitRoutes), (item) => {
      console.log(item.name);
      console.log(window.t(item.name));
      return {
        ...item,
        name: window.t(item.name),
      };
    }),
    'key',
  );
  selfPermissions = values(permissionsMapping);
  const user = {
    permissions: selfPermissions,
    permissionsMapping,
    basicInfo: {
      ...pick(basicInfo, ['activated', 'createdBy', 'createdAt', 'email', 'username', 'id', 'avatar', 'nickname']),
    },
  };
  await dispatch({
    type: REDUX_CONFIG.INIT_USER,
    payload: {
      data: user,
    },
  });

  return user;
};
