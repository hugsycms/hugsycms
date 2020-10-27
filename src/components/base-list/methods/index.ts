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

export const getDataDetail = async (url: string, fromApi: any) => {
  const data = get(await request.get(url), 'data');
  return isFunction(fromApi)
    ? {
        ...fromApi(data),
      }
    : data;
};

export const createData = async (url: string, processFromApi: any) => {
  const data = get(await request.get(url), 'data');
  return isFunction(processFromApi)
    ? {
        ...data,
        data: processFromApi(get(data, 'data')),
      }
    : data;
};

export const updateData = async (url: string, processFromApi: any) => {
  const data = get(await request.get(url), 'data');
  return isFunction(processFromApi)
    ? {
        ...data,
        data: processFromApi(get(data, 'data')),
      }
    : data;
};
