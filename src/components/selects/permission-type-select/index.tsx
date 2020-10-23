import React from 'react';
import { Select } from 'antd';
import { map, keyBy } from 'lodash';

export const typeMapping = [
  {
    value: 'menu',
    label: 'Menu',
  },
  {
    value: 'page',
    label: 'Page',
  },
  {
    value: 'function',
    label: 'Function',
  },
];

export const typeMappingByValue = keyBy(typeMapping, 'value');

export default (props: any) => (
  <Select style={{ width: 150 }} placeholder="please select type" allowClear {...props}>
    {map(typeMapping, (status) => (
      <Select.Option value={status.value}>{status.label}</Select.Option>
    ))}
  </Select>
);
