import React from 'react';
import { Select } from 'antd';
import { map, get } from 'lodash';

export const genderMapping = [
  {
    value: 1,
    label: '男',
  },
  {
    value: 2,
    label: '女',
  },
  {
    value: 3,
    label: '未知',
  },
];

export const hasOrNoMapping = [
  {
    value: 0,
    label: '无',
  },
  {
    value: 1,
    label: '有',
  },
];

export const yesOrNoMapping = [
  {
    value: 0,
    label: '否',
  },
  {
    value: 1,
    label: '是',
  },
];

export const permissionTypeMapping = [
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

export const statusMapping = {
  genderMapping,
  hasOrNoMapping,
  yesOrNoMapping,
  permissionTypeMapping,
};

interface IProps {
  type: 'genderMapping' | 'hasOrNoMapping' | 'yesOrNoMapping' | 'permissionTypeMapping';
  showSearch?: true | false;
  placeholder?: string;
}

export default (props: IProps) => {
  const { type, showSearch = false } = props;
  return (
    <Select
      showSearch={showSearch}
      placeholder="please select"
      allowClear
      filterOption={(input, option: any) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
      {...props}
    >
      {map(get(statusMapping, type), (status) => (
        <Select.Option value={get(status, 'value')}>{window.t(get(status, 'label'))}</Select.Option>
      ))}
    </Select>
  );
};
