import { REDUX_CONFIG } from '@/lib/config/constants';
import { get } from 'lodash';

const initState = {
  permissions: undefined,
  permissionsMapping: undefined,
  basicInfo: {},
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case REDUX_CONFIG.INIT_USER:
      return {
        ...state,
        ...get(action, 'payload.data'),
      };
    default:
      return state;
  }
};
