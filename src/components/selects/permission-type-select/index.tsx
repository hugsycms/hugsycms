import React from 'react';
import { Select } from 'antd';
import { map, keyBy } from 'lodash';

export const typeMapping = [
  {
    value: 'menu',
    label: 'components.permission-type-select.menu',
  },
  {
    value: 'page',
    label: 'components.permission-type-select.page',
  },
  {
    value: 'function',
    label: 'components.permission-type-select.function',
  },
];

export const typeMappingByValue = keyBy(typeMapping, 'value');

export default (props: any) => (
  <Select
    style={{ width: 150 }}
    placeholder={window.t('components.permission-type-select.placeholder')}
    allowClear
    {...props}
  >
    {map(typeMapping, (status) => (
      <Select.Option value={status.value}>{window.t(status.label)}</Select.Option>
    ))}
  </Select>
);
