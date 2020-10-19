import { isFunction } from 'lodash';
import request from '@/lib/request';

export const getDataSource = async (url: string, processFromApi: any) => {
  const data = await request.get(url);
  return isFunction(processFromApi) ? processFromApi(data) : data;
};
