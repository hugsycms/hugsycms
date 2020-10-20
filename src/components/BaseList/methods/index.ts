import { get, isFunction } from 'lodash';
import request from '@/lib/request';

export const getDataSource = async (url: string, processFromApi: any) => {
  const data = get(await request.get(url), 'data');
  return isFunction(processFromApi)
    ? {
        ...data,
        data: processFromApi(get(data, 'data')),
      }
    : data;
};
