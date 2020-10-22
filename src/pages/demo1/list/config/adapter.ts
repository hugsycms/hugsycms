import { formatTimeToStandard } from '@/utils/format';
import { get } from 'lodash';

export const fromApi = (data: any) => {
  return {
    ...data,
    createdAt: formatTimeToStandard(get(data, 'createdAt')),
  };
};
