import store from 'store';

export const doLogout = () => {
  store.clearAll();
};
