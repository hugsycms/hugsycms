import { Dispatch } from 'redux';
import { REDUX_CONFIG } from '@/lib/config/constants';

export const updateCollapsed = (collapsed: boolean) => (dispatch: Dispatch) => {
  dispatch({
    type: REDUX_CONFIG.UPDATE_COLLAPSED,
    payload: {
      collapsed,
    },
  });
};
