import { Dispatch } from 'redux';
import { REDUX_CONFIG } from '@/lib/config/constants';
import request from '@/lib/request';
import { get, reduce, concat, keyBy, pick, values, map } from 'lodash';
import { omitRoutes } from '@/lib/routes';

export const initUser = (username: any) => async (dispatch: Dispatch) => {
  const basicInfo = await request.get(`/api/mock/users/${username}`);

  let selfPermissions = concat(
    reduce(get(basicInfo, 'groups'), (sum, group) => concat(sum as [], get(group, 'permissions') as []), []),
    omitRoutes,
  );
  const permissionsMapping = keyBy(concat(selfPermissions, omitRoutes), 'key');
  selfPermissions = values(permissionsMapping);
  const user = {
    permissions: selfPermissions,
    permissionsMapping,
    basicInfo: {
      ...pick(basicInfo, [
        'activated',
        'authorities',
        'createdBy',
        'createdDate',
        'email',
        'firstName',
        'id',
        'imageUrl',
        'lastModifiedBy',
        'lastModifiedDate',
        'login',
      ]),
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
