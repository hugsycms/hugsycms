import { get } from 'lodash';
import { strToJson } from '@/utils/helper';

export const fromApi = (data) => {
  return {
    ...data,
    labelCol: get(strToJson(get(data, 'formItemLayout')), 'labelCol.span'),
    wrapperCol: get(strToJson(get(data, 'formItemLayout')), 'wrapperCol.span'),
    isRequired: get(strToJson(get(data, 'rules')), '0.required'),
    isNewRow: get(data, 'isNewRow') ? true : false,
    isActive: get(data, 'isActive') ? true : false,
  };
};

export const toApi = (data) => {
  return {
    ...data,
    isNewRow: get(data, 'isNewRow') ? 1 : 0,
    isActive: get(data, 'isActive') ? 1 : 0,
    formItemLayout: `{"labelCol":{"span":${get(data, 'labelCol')}},"wrapperCol":{"span":${get(data, 'wrapperCol')}}}`,
    rules: `[{"required":${get(data, 'isRequired')},"message":"${get(data, 'label')}是必填项"}]`,
  };
};
