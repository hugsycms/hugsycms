import { REDUX_CONFIG } from '@/lib/config/constants';

const initState = {
  collapsed: false,
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case REDUX_CONFIG.UPDATE_COLLAPSED:
      return {
        ...state,
        collapsed: action.payload.collapsed,
      };
      break;
    default:
      return {
        ...state,
      };
      break;
  }
};
