import { Dispatch } from 'redux';
import { REDUX_CONFIG } from '@/lib/config/constants';
import { TabIProps } from '@/components/layout/components/TabButton';

export const updateTabs = (tab: TabIProps) => (dispatch: Dispatch) => {
  dispatch({
    type: REDUX_CONFIG.ADD_TAB,
    payload: {
      data: tab,
    },
  });
};

export const deleteTab = (key: string) => (dispatch: Dispatch) => {
  dispatch({
    type: REDUX_CONFIG.DELETE_TAB,
    payload: {
      data: { key },
    },
  });
};

export const deleteAllTabs = () => (dispatch: Dispatch) => {
  dispatch({
    type: REDUX_CONFIG.DELETE_ALL_TAB,
    payload: {},
  });
};
