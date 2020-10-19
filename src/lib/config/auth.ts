import { get } from 'lodash';
import axios from 'axios';
import { isServer } from '../request';

export const getAccountInfo = async (data: any) => {
  const { username } = data;
  const result = await axios.get(`/api/mock/users/${username}`);
  return isServer ? get(result, 'data') : result;
};

export const throwNotLoggin = () => {
  const newError = new Error('未登录');
  return newError;
};
