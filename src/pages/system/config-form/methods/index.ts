import request from '@/lib/request';
import { toApi, fromApi } from '../config/adapter';
import { get, map, omit, set, keys, keyBy, indexOf, values } from 'lodash';

export const getFormPages = async (type: string) => {
  const data = await request.get(`/api/mock/form-pages?type.equals=${type}`);
  return {
    originSections: data,
    transferSections: transferSections(data),
  };
};

export const getSelections = async () => {
  const data = get(await request.get('/api/form-descriptions/sections'), 'data.data');
  return {
    originSections: data,
    transferSections: transferSections(data),
  };
};

export const getFormDescriptionsBySecitonId = async (sectionId) => {
  const data = get(await request.get(`/api/mock/form-sections/${sectionId}`), 'fields');
  return data;
};

export const getFormDescriptionDetail = async (descriptionId) => {
  const data = fromApi(await request.get(`/api/mock/form-descriptions/${descriptionId}`));
  return data;
};

export const transferSections = (data) =>
  map(data, (item) => {
    return {
      ...omit(item, ['formSections']),
      title: get(item, 'name'),
      children: map(get(item, 'formSections'), (formSection) => {
        return {
          ...formSection,
          key: get(formSection, 'id'),
          title: get(formSection, 'name'),
        };
      }),
    };
  });

export const saveFormItem = async (data) => {
  const result = await request.put('/api/form-descriptions', toApi(data));
  return result;
};
